import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
import baseApi from "src/services/baseApi";
import confirmModalSlice from "./slice/confirmModal";
import toastMessageSlice from "./slice/toastMessage";
import userSlice from "./slice/userInfo.ts";
import authSliceReducer from './slice/auth';
export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authSliceReducer,
        confirmModal: confirmModalSlice,
        toastNotification: toastMessageSlice,
        currentUser: userSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useSelector = useReduxSelector;
export const useDispatch = () => useReduxDispatch();
