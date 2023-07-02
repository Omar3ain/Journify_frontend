import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import hotelService from "./hotelService";
import Toast from "react-native-toast-message";

const initialState = {
    hotelReviews: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };


export const createHotelReview = createAsyncThunk(
  "hotelReviews/createHotelReview",
  async (createData, thunkAPI) => {
    console.log(thunkAPI.getState());
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await hotelService.createReviews(createData, token);
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


const hotelSlice = createSlice({
    name: "hotelReviews",
    initialState,
    reducers: {
      reset: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = "";
        state.hotelReviews = [];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createHotelReview.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createHotelReview.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.hotelReviews = action.payload;
        })
        .addCase(createHotelReview.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          Toast.show({
            type: "error",
            text1: "Delete status",
            text2: state.message,
          });
        })


    },
  });
  
  export const { reset } = hotelSlice.actions;
  export default hotelSlice.reducer;
  