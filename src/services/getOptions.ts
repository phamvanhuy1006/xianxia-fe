import { UnknownObj } from "src/shared/models/common.model";
import baseApi from "./baseApi";

export interface getOptionType {
  url: string;
  params: UnknownObj;
}

export const getOptionService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOption: build.query({
      query: ({ url, params }: getOptionType) => {
        return {
          url: url,
          method: "GET",
          params: params,
        };
      },
    }),
  }),
});

export const { useGetOptionQuery } = getOptionService;
