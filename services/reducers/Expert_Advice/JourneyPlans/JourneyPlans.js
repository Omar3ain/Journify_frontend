import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from "../../../../baseUrl";

const URL = `${API_BASE_URL}`;
export const fetchPlans = createAsyncThunk('allPlans/fetchPlans', async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const userId = JSON.parse(user);
    const response = await axios.get(`${URL}jplans/`, {
      headers: {
        userId: userId.user.id,
      },
    });
    console.log(response.data);
    await AsyncStorage.removeItem('plans');
    await AsyncStorage.setItem('plans', JSON.stringify(response.data));
    
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const JourneyPlans = createSlice({
  name: 'allPlans',
  initialState: {
    plans: [],
    count: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plans = action.payload;
        state.count = action.payload.length;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default JourneyPlans.reducer;
