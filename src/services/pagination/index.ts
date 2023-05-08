import { UnknownObj } from "src/shared/models/common.model";
import baseApi from "../baseApi";

export interface PaginationQueryType {
  url: string;
  params?: UnknownObj;
  body?: UnknownObj;
  method?: string;
}

export const paginationService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    pagination: build.query({
      query: ({ url, params }: PaginationQueryType) => {
        return {
          url: url,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => {
        let cloneResult = JSON.parse(JSON.stringify(result));
        
        const _result = cloneResult?.content?.items.map(
          ({ id }: UnknownObj) => ({ type: "Pagination", id } as const)
        );

        cloneResult = [..._result, { type: "Pagination", id: "LIST" }];

        return result ? cloneResult : [{ type: "Pagination", id: "LIST" }];
      },
    }),

    createItemTable: build.mutation({
      query: ({ url, body, method }: PaginationQueryType) => ({
        url: url,
        method: method || "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "Pagination", id: "LIST" }],
    }),

    updateItemTable: build.mutation({
      query: ({ url, body, method }: PaginationQueryType) => ({
        url: url,
        method: method || "PUT",
        body: body,
      }),
      invalidatesTags: (result, error, { body: { id } }) => [
        { type: "Pagination", id },
      ],
    }),

    deleteItemTable: build.mutation({
      query: ({ url, params }: PaginationQueryType) => ({
        url: url,
        method: "DELETE",
        params: params,
      }),
      invalidatesTags: (result, error, { params: { id } }) => [
        { type: "Pagination", id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  usePaginationQuery,
  useCreateItemTableMutation,
  useUpdateItemTableMutation,
  useDeleteItemTableMutation,
} = paginationService;
