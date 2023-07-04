import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import hotelService from "./hotelService";
import Toast from "react-native-toast-message";

const initialState = {
  hotelReserv: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  reservedHotel: null,
};

export const createHotelReserv = createAsyncThunk(
  "hotelReservation/createHotelReserv",
  async (createData, thunkAPI) => {
    console.log(thunkAPI.getState());
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await hotelService.createHotelReservation(createData, token);
    } catch (error) {
      console.log("sdddddddddddddd");
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

export const getUserReservations = createAsyncThunk(
  "hotelReservation/getUserReservations",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await hotelService.getReservations(token);
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

export const editUserReservations = createAsyncThunk(
  "hotelReservation/editUserReservations",
  async (editedData,hotelId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await hotelService.editHotelReservation(editedData, hotelId, token);
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

const hotelReservationSlice = createSlice({
  name: "hotelReservation",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.hotelReserv = [];
    },
    reserveStayAction: (state, action) => {
      state.reservedHotel = action.payload;
      if (action.payload && (action.payload.status === "confirmed")) {
        state.hotelReserv.push(state.reservedHotel);
      }
      console.log(state.reservedHotel);
      console.log(state.hotelReserv);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHotelReserv.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHotelReserv.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.hotelReserv = action.payload;
      })
      .addCase(createHotelReserv.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        Toast.show({
          type: "error",
          text1: "Create status",
          text2: state.message,
        });
      })
      .addCase(getUserReservations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserReservations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.hotelReserv = action.payload;
      })
      .addCase(getUserReservations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        Toast.show({
          type: "error",
          text1: "Get reservations status",
          text2: state.message,
        });  
      });
  },
});

export const { reset, reserveStayAction } = hotelReservationSlice.actions;
export default hotelReservationSlice.reducer;
