import { API_ENDPOINT, TAG_TYPES } from "@/config";
import { UserCreateType, UserType } from "@/types";
import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";

export const userMutations = (
  builder: EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      {},
      FetchBaseQueryMeta
    >,
    string,
    string
  >
) => ({
  createUser: builder.mutation<UserType, UserCreateType>({
    query: (input) => ({
      url: API_ENDPOINT.CREATEUSER,
      method: "POST",
      body: input,
    }),
    transformResponse: (response: UserType, meta) => {
      console.log("✅ User Created:", response);
      return response;
    },
    transformErrorResponse: (error: FetchBaseQueryError) => {
      console.error("❌ Error Creating User:", error);
      return error;
    },
    invalidatesTags: [TAG_TYPES.USER],
  }),
});
