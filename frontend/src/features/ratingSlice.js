import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to submit rating with auth token
export const submitRating = createAsyncThunk(
  "rating/submitRating",
  async (ratingData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post("/api/rating", ratingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    ratings: [],
    totalRating: 0,
    loading: false,
    error: null,
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
        state.totalRating = action.payload.newTotalRating;
      })
      .addCase(submitRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const ratingReducer = ratingSlice.reducer;
