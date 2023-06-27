import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllRecs = createAsyncThunk('customRec/fetchAllRecs', async ({radius,kinds,name}) => {
  try {
    const response = await axios.get(`http://localhost:8000/recommendation/data/?radius=${radius}&kinds=${kinds}&name=${name}`);
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
