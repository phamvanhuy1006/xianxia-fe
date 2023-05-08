import { API_URLS } from "src/shared/constants";
import { LoginModel } from "src/shared/models/auth.model";
import baseApi from "../baseApi";

export const authService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload: LoginModel) => {
        return {
          url: API_URLS.LOGIN,
          method: 'POST',
          body: payload
        };
      }
    }),
    logOut: build.query({
      query: (id) => ({
        url: `${API_URLS.LOGOUT}/${id}`,
        method: 'POST'
      })
    }),
    forgotPwd: build.mutation({
      query: (payload) => ({
        url: API_URLS.FORGOT_PWD,
        method: 'POST',
        body: payload
      })
    }),
    resetPwd: build.mutation({
      query: (payload) => ({
        url: API_URLS.RESET_PWD,
        method: 'POST',
        body: payload
      })
    }),
    changePwd: build.mutation({
      query: (payload) => ({
        url: API_URLS.CHANGE_PWD,
        method: 'POST',
        body: payload
      })
    })
  })
});

export const { useLoginMutation, useForgotPwdMutation, useLazyLogOutQuery, useChangePwdMutation, useResetPwdMutation } = authService;