import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import flightsService from "./flightsService";
import Toast from "react-native-toast-message";

const initialState = {
  availableFlights: [],
  availableDates: [],
  reservedFlight: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  selectedDate: "",
  filterFlights: false,
  selectedFlight: null,
};

export const getFlights = createAsyncThunk(
  "flights/getFlights",
  async ({ origin, destination }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await flightsService.getFlights(origin, destination, token);
    } catch (error) {
      let message = "";
      const data = error.response.data;
      if (Object.keys(data).length > 0) {
        for (const field in data) {
          const errorMessages = data[field];
          for (const errorMessage of errorMessages) {
            message += `${errorMessage}`;
          }
        }
      } else {
        message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.availableFlights = [];
    },
    selectDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    toggleFlights: (state, action) => {
      state.filterFlights = !state.filterFlights;
    },
    selectFlight: (state, action) => {
      state.selectedFlight = action.payload;
    },
    addReservation: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFlights.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFlights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.availableFlights = action.payload.results;
        state.selectedDate = state.availableFlights[0] ? state.availableFlights[0].traveling_date.split("T")[0] : "";
      })
      .addCase(getFlights.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        Toast.show({
          type: "error",
          text1: "Available Flights",
          text2: state.message,
        });
      });
  },
});

export const { reset, selectDate, toggleFlights, selectFlight } =
  flightsSlice.actions;
export default flightsSlice.reducer;
