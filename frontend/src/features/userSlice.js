import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://store-rating-system.onrender.com/api/auth"; // Adjust API URL


const getToken = () => localStorage.getItem("token");

// Fetch user
export const fetchUser = createAsyncThunk("auth/fetchUser", async (id, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch user");
  }
});

// Update user
export const updateUser = createAsyncThunk("auth/updateUser", async ({ id, userData }, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await axios.put(`${API_URL}/${id}`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Profile updated successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to update profile!");
    return rejectWithValue(error.response?.data || "Error updating profile");
  }
});

// Update password
export const updatePassword = createAsyncThunk("auth/updatePassword", async ({ oldPassword, newPassword }, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await axios.put(
      `${API_URL}/update-password`,
      { oldPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Password updated successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Failed to update password!");
    return rejectWithValue(error.response?.data || "Error updating password");
  }
});

// Delete user
export const deleteUser = createAsyncThunk("auth/deleteUser", async (id, { rejectWithValue }) => {
  try {
    const token = getToken();
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("User deleted successfully!");
    return id;
  } catch (error) {
    toast.error("Failed to delete user!");
    return rejectWithValue(error.response?.data || "Error deleting user");
  }
});

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token"); // Clear token on logout
      toast.success("Logged out successfully!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updatePassword.fulfilled, () => {
        toast.success("Password updated successfully!");
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (state.user?.id === action.payload) {
          state.user = null;
        }
      });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
