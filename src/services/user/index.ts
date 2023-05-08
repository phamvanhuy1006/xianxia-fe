import { API_URLS } from "src/shared/constants";
import { UserModel } from "src/shared/models/user.model";
import baseApi from "../baseApi";

export const userService = baseApi.injectEndpoints({
    endpoints: (build: any) => ({
        getAllUser: build.query({
            query: (filter: any) => {
                return {
                    url: API_URLS.GET_ALL_USER,
                    method: 'GET'
                }
            }
        }),
        getCurrentUser: build.query({
            query: () => ({
                url: API_URLS.GET_CURRENT_USER,
                method: 'GET',
            })
        }),
        getUserById: build.query({
            query: (userId: string) => ({
                url: `${API_URLS.GET_USER_BY_ID}/${userId}`,
                method: 'GET',
            })
        }),
        getUserAvatar: build.query({
            query: (userId: string) => ({
                url: `${API_URLS.GET_USER_AVATAR}/${userId}`,
                method: 'GET',
            })
        }),
        createUser: build.mutation({
            query: (newUser: UserModel) => ({
                url: API_URLS.CREATE_USER,
                method: 'POST',
                body: newUser,
            })
        }),
        updateUser: build.mutation({
            query: (user: UserModel) => ({
                url: API_URLS.UPDATE_USER,
                method: 'POST',
                body: user,
            })
        }),
    }),
});

export const { useCreateUserMutation, useUpdateUserMutation, useGetAllUserQuery, useLazyGetCurrentUserQuery, useGetUserByIdQuery, useGetUserAvatarQuery } = userService;