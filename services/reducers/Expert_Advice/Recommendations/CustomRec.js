import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from "../../../../baseUrl";

const URL = `${API_BASE_URL}`;
export const fetchAllRecs = createAsyncThunk('customRec/fetchAllRecs', async ({radius,kinds,name}) => {
  try {
    const user = await AsyncStorage.getItem('user');
    const userId = JSON.parse(user);
    const response = await axios.get(`${URL}recommendation/data/?radius=${radius}&kinds=${kinds}&name=${name}`, {
        headers: {
            userId: userId.id,
          },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const CustomRec = createSlice({
  name: 'customRec',
  initialState: {
    places: [],
    count: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllRecs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.places = action.payload;
        state.count = action.payload.length;
      })
      .addCase(fetchAllRecs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default CustomRec.reducer;
