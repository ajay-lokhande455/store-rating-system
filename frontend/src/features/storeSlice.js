import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/stores'; // Update with your backend URL

// Async thunk for fetching all stores
export const fetchStores = createAsyncThunk('stores/fetchStores', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk for searching stores
export const searchStores = createAsyncThunk('stores/searchStores', async (query, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/search?query=${query}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk for creating a store
export const createStore = createAsyncThunk('stores/createStore', async (storeData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, storeData);
    return response.data.store;
  } catch (error) {
    return rejectWithValue(error.response.data);
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
      // Fetch Stores
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

      // Search Stores
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

      // Create Store
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
