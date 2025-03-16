import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/authSlice";
import { userReducer } from "../features/userSlice";
import { storeReducer } from "../features/storeSlice";
import { ratingReducer } from "../features/ratingSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        stores: storeReducer,
        rating : ratingReducer
    }
});

export default store;
