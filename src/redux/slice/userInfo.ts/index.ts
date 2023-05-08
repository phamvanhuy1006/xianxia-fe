import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { userService } from "src/services/user";
import REDUX_SLICE_NAMES from "src/shared/constants/reduxSliceNames";


interface InitialStateType {
  currentUser: {
    userName: string;
  };
}

const initialState: InitialStateType = {
  currentUser: { userName: '' }
};

export const userSlice = createSlice({
  name: REDUX_SLICE_NAMES.CURRENT_USER,
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload.user;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(userService.endpoints.getCurrentUser.matchFulfilled, (state, { payload }: any) => {
      state.currentUser = payload;
    });
  }
});

export const { setCurrentUser } = userSlice.actions;

export const useSetUserInformationState = () => {
  const dispatch = useDispatch();
  const setUserInformation = (user: object) => {
    dispatch(setCurrentUser({ user }));
  };
  return { setUserInformation };
};

export default userSlice.reducer;
