import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import REDUX_SLICE_NAMES from 'src/shared/constants/reduxSliceNames';

interface InitialStateType {
    isChange: boolean;
}

const initialState: InitialStateType = {
    isChange: false
};

export const checkingChangesSlice = createSlice({
    name: REDUX_SLICE_NAMES.CHECKING_CHANGES,
    initialState,
    reducers: {
        setChanges: (state, { payload }) => {
            state.isChange = payload.isChange;
        }
    }
});

export const { setChanges } = checkingChangesSlice.actions;

export const useSetCheckingChangesState = () => {
    const dispatch = useDispatch();
    const setCheckingChanges = (data: { isChange: boolean }) => {
        dispatch(setChanges(data));
    };

    return { setCheckingChanges };
};

export default checkingChangesSlice.reducer;
