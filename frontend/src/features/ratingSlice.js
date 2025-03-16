import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://store-rating-system.onrender.com/api/ratings';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};


export const submitRating = createAsyncThunk(
  'ratings/submitRating',
  async (ratingData, { rejectWithValue }) => {
    try {
        console.log(ratingData);
        
      const response = await axios.post(`${BASE_URL}/submit`, ratingData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);

export const getRatingsByStore = createAsyncThunk(
  'ratings/getRatingsByStore',
  async (storeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${storeId}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState: {
    ratings: [],
    loading: false,
    error: null,
    newTotalRating: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRating.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings.push(action.payload.newRating);
        state.newTotalRating = action.payload.newTotalRating;
      })
      .addCase(submitRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(getRatingsByStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRatingsByStore.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings = action.payload.ratings;
      })
      .addCase(getRatingsByStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const ratingsReducer = ratingsSlice.reducer;
