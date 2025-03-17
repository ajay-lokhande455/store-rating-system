import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://store-rating-system.onrender.com/api/users"; // Adjust API URL

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };
  
export const fetchAllUsers = createAsyncThunk("auth/fetchAllUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: getAuthHeaders() ,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch users");
  }
});

// Fetch user
export const fetchUser = createAsyncThunk("auth/fetchUser", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: getAuthHeaders() ,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch user");
  }
});

// Update user
export const updateUser = createAsyncThunk("auth/updateUser", async ({ id, userData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData, {
      headers: getAuthHeaders() ,
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
    const response = await axios.put(
      `${API_URL}/update-password`,
      { oldPassword, newPassword },
      { headers: getAuthHeaders()  }
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
    await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders() ,
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
    users: [], 
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.users = []; 
      localStorage.removeItem("token"); 
      toast.success("Logged out successfully!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (state.user?.id === action.payload) {
          state.user = null;
        }
        state.users = state.users.filter((user) => user.id !== action.payload); // Remove deleted user from list
      });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
