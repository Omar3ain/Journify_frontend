import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import placeService from "./placeService";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getCity() {
  const storedCity = await AsyncStorage.getItem("city");
  const city = storedCity ? JSON.parse(storedCity) : "Paris";
  return city;
}

const initialState = {
  city: await getCity(),
  popularPlaces: null,
  searchPlaces: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getPopularPlaces = createAsyncThunk("/popular-places", async (city, thunkAPI) => {
  try {
    return await placeService.getPopular(city);
  } catch (error) {
    const message = error.response.data.error;
    return thunkAPI.rejectWithValue(message);
  }
});

export const SearchPlaces = createAsyncThunk(
  "/search-places",
  async (data, thunkAPI) => { // data = {city_name, name (search_term)}
    try {
      return await placeService.SearchPlaces(data);
    } catch (error) {
      const message = error.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const placeSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.popularPlaces = null;
      state.searchPlaces = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPopularPlaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPopularPlaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.popularPlaces = action.payload;
      })
      .addCase(getPopularPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.popularPlaces = null;
      })
      .addCase(SearchPlaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SearchPlaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.searchPlaces = action.payload;
      })
      .addCase(SearchPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.searchPlaces = null;
      });
  },
});

export const { reset } = placeSlice.actions;
export default placeSlice.reducer;
