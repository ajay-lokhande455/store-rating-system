import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://store-rating-system.onrender.com/api/stores';

export const fetchStores = createAsyncThunk('stores/fetchStores', async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await axios.get(`${BASE_URL}/all`, {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
  
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "An error occurred");
    }
  });
  

export const searchStores = createAsyncThunk('stores/searchStores', async (query, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/search?query=${query}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "An error occurred");
  }
});

export const createStore = createAsyncThunk('stores/createStore', async (storeData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, storeData);
    return response.data.store;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "An error occurred");
  }
});

const storeSlice = createSlice({
  name: 'stores',
  initialState: {
    stores: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(searchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.loading = false;
        state.stores.push(action.payload);
      })
      .addCase(createStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const storeReducer = storeSlice.reducer;
