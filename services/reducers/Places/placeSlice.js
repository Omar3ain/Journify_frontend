import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import placeService from "./placeService";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getCity() {
  const storedCity = await AsyncStorage.getItem("city");
  const city = !storedCity ? "Paris" : storedCity;
  return city;
}

const initialState = {
  city: '',
  popularPlaces: null,
  searchPlaces: null,
  allPlaces: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getPopularPlaces = createAsyncThunk("places/getPopularPlaces", async (city_name, thunkAPI) => {
  try {
    return await placeService.getPopular(city_name);
  } catch (error) {
    const message = error.response.data.error;
    return thunkAPI.rejectWithValue(message);
  }
});

export const SearchPlaces = createAsyncThunk(
  "places/SearchPlaces",
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
      state.allPlaces = null;
      state.message = "";
    },
    setAllPlaces: (state) => {
      state.allPlaces = state.popularPlaces;
    }
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
        state.allPlaces = action.payload;
      })
      .addCase(getPopularPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.popularPlaces = null;
        state.allPlaces = null;
      })
      .addCase(SearchPlaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SearchPlaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.searchPlaces = action.payload;
        state.allPlaces = action.payload;
      })
      .addCase(SearchPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.searchPlaces = null;
        state.allPlaces = null;
      });
  },
});

export const { reset, setAllPlaces } = placeSlice.actions;
export default placeSlice.reducer;
