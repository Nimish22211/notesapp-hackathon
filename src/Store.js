import { configureStore } from "@reduxjs/toolkit";
import authState from './Redux/authState';

export const store = configureStore({
    reducer: {
        authState
    }
})