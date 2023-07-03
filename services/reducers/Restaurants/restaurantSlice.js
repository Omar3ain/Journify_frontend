import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import restaurantService from "./restaurantService";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getCity() {
  const storedCity = await AsyncStorage.getItem("city");
  const city = storedCity ? storedCity : "Paris";
  return city;
}

const initialState = {
  city: await getCity(),
  popularRestaurants: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getPopularRestaurant = createAsyncThunk("/popular-restaurant", async (city, thunkAPI) => {
  try {
    return await restaurantService.getPopular(city);
  } catch (error) {
    const message = error.response.data.error;
    return thunkAPI.rejectWithValue(message);
  }
});


const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.popularRestaurants = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPopularRestaurant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPopularRestaurant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.popularRestaurants = action.payload;
      })
      .addCase(getPopularRestaurant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.popularRestaurants = null;
      })
  },
});

export const { reset } = restaurantSlice.actions;
export default restaurantSlice.reducer;
