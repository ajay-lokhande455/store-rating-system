import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "https://store-rating-system.onrender.com/api/auth";


export const signup = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("storeId", response.data.storeId);

        
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("storeId");
    return null;
});


const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");
const storedStoreId = localStorage.getItem("storeId")


const authSlice = createSlice({
    name: "auth",   
    initialState: {
        user: storedUser ? JSON.parse(storedUser) : null,
        storeId : storedStoreId || null,
        token: storedToken || null,
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
                state.status = action.payload.error;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.storeId = action.payload.storeId;

            
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

export const authReducer = authSlice.reducer;
