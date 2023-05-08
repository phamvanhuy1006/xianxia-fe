import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_KEYs } from "src/shared/constants";
import REDUX_SLICE_NAMES from "src/shared/constants/reduxSliceNames";

interface ResAuthModel {
  token: string;
  refreshToken: string;
  userId: string;
}

interface AuthModel {
  value: {
    isAuthenticated: boolean;
    isInitialized: boolean;
  };
}

const initialState: AuthModel = {
  value: {
    isAuthenticated: false,
    isInitialized: false,
  },
};

const authSlice = createSlice({
  name: REDUX_SLICE_NAMES.AUTH,
  initialState,
  reducers: {
    setToken: (state: any, { payload }: PayloadAction<ResAuthModel>) => {
      if (!payload) {
        state = initialState;
        return;
      }
      localStorage.setItem(LOCAL_KEYs.ACCESS_TOKEN, payload.token || "");
      localStorage.setItem(LOCAL_KEYs.USER_ID, payload.userId);

      state.value = {
        ...state.value,
        isAuthenticated: Boolean(payload.token),
      };
    },
    getAccessToken: (state) => {
      const accessToken = localStorage.getItem(LOCAL_KEYs.ACCESS_TOKEN);
      state.value = {
        ...state.value,
        isAuthenticated: Boolean(accessToken),
      };
    },
  },
});

export const { setToken, getAccessToken } = authSlice.actions;
export default authSlice.reducer;
