import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { BASE_URL, LOCAL_KEYs } from 'src/shared/constants';

const baseUrl = BASE_URL;

const timeout = 60000;

const prepareHeaders = (headers: any) => {
  headers.set('Access-Control-Allow-Origin', '*');

  // get token for these
  const token = localStorage.getItem(LOCAL_KEYs.ACCESS_TOKEN);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
}

const baseQuery = fetchBaseQuery({ baseUrl, prepareHeaders, timeout });

const handleRequest: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  // if should refresh token here
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    // if api response throw 401 code those with

    // Throw error on a toast
    // api.dispatch(
    //   setToastMessage({ status: STATUS_TOAST.ERROR, message: translate(ERROR_TYPE?.[result.error.status] || '') })
    // );
  }

  return result;
}

const baseApi = createApi({
  reducerPath: 'PortalTimeSheet',
  baseQuery: handleRequest,
  tagTypes: ['Pagination'],
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});

export default baseApi;