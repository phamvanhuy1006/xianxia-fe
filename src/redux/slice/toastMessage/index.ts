import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { MessageErrorsAPI, STATUS_TOAST } from "src/shared/constants";
import REDUX_SLICE_NAMES from "src/shared/constants/reduxSliceNames";

interface InitialStateType {
    toastMessage: any;
}

const initialState: InitialStateType = {
    toastMessage: {},
};

export const toastMessageSlice = createSlice({
    name: REDUX_SLICE_NAMES.TOAST_NOTIFICATION,
    initialState,
    reducers: {
        setToastMessage: (state, { payload }) => {
            state.toastMessage = payload.infoToast;
            if (!payload.infoToast.message && payload.infoToast.status === STATUS_TOAST.ERROR) {
                state.toastMessage.message = MessageErrorsAPI.UnhandleException;
            }
        },
    },
});

export const { setToastMessage } = toastMessageSlice.actions;

export const useSetToastInformationState = () => {
    const dispatch = useDispatch();
    const setToastInformation = (infoToast: object) => {
        dispatch(setToastMessage({ infoToast }));
    };
    return { setToastInformation };
};

export default toastMessageSlice.reducer;
