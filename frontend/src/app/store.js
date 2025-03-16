import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/authSlice";
import { userReducer } from "../features/userSlice";
import { storeReducer } from "../features/storeSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        stores: storeReducer,
    }
});

export default store;
