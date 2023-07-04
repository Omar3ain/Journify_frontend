import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import flightsService from "./flightsService";
import Toast from "react-native-toast-message";

const initialState = {
  flightReservations: [],
  flightsIDS: {},
  reservedFlight: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getReservedFlights = createAsyncThunk(
  "flightReservations/getReservedFlights",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await flightsService.getReservations(token);
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

export const cancelReservedFlights = createAsyncThunk(
  "flightReservations/cancelReservedFlights",
  async (reservation, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await flightsService.cancelReservation(reservation, token);
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

export const reserveFlight = createAsyncThunk(
  "flightReservations/reserveFlight",
  async ({ seatsNumber, action, flightClass }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const flight = thunkAPI.getState().flights.selectedFlight;
      return await flightsService.reserveFlight(
        flight,
        seatsNumber,
        action,
        flightClass,
        token
      );
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

const reservationsSlice = createSlice({
  name: "flightReservations",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.flightReservations = [];
    },
    reserveFlightAction: (state, action) => {
      state.reservedFlight = action.payload.flight;
      if (action.payload && (action.payload.status === "confirmed")) {
        state.flightReservations.push(action.payload);
      }
      console.log(state.reservedFlight);
      console.log(state.flightReservations);
    },
    setReservedFlgiht: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReservedFlights.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReservedFlights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.flightReservations = action.payload;
        const newFlightIDS = {};
        state.flightReservations.forEach(
          (reservation) =>
            (newFlightIDS[reservation.flight.id] = reservation.status)
        );
        state.flightsIDS = { ...newFlightIDS };
      })
      .addCase(getReservedFlights.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        Toast.show({
          type: "error",
          text1: "Delete status",
          text2: state.message,
        });
      })

      .addCase(reserveFlight.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reserveFlight.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.reservedFlight = action.payload;
        state.flightReservations.push(action.payload);
        console.log(state.reservedFlight);
        Toast.show({
          type: "success",
          text1: "Flight Reservation",
          text2: "Reserved successfully",
        });
      })
      .addCase(reserveFlight.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        Toast.show({
          type: "error",
          text1: "Flight Reservation",
          text2: state.message,
        });
      })
      .addCase(cancelReservedFlights.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelReservedFlights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.flightReservations = state.flightReservations.filter(
          (reservedFlight) => reservedFlight.id !== action.meta.arg.id
        );
      })
      .addCase(cancelReservedFlights.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        Toast.show({
          type: "error",
          text1: "Update Status",
          text2: state.message,
        });
      });
  },
});

export const { reset, reserveFlightAction } = reservationsSlice.actions;
export default reservationsSlice.reducer;
