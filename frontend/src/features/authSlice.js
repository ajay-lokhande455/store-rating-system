import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL (Change it based on your backend)
const API_URL = "https://store-rating-system.onrender.com/api/auth";

// Async thunk for user signup
export const signup = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for user login
export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for logout (just clearing the token)
export const logout = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("token");
    return null;
});

// Auth Slice
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token") || null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                
                
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
               
            })
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload.token;
                console.log(action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    }
});

export const authReducer =  authSlice.reducer;
