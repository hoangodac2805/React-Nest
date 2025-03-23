import { API_ENDPOINT, TAG_TYPES } from "@/config";
import { UserCreateInputType, UserType, UserUpdateInputType } from "@/types";
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
  createUser: builder.mutation<UserType, UserCreateInputType>({
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
  deleteUser: builder.mutation<void, number>({
    query: (id) => ({
      method: "DELETE",
      url: API_ENDPOINT.DELETEUSER(id),
    }),
    transformResponse: (response, meta) => {
      console.log("✅ User Deleted");
    },
    transformErrorResponse: (error: FetchBaseQueryError) => {
      console.error("❌ Error Deleting User");
      return error;
    },
    invalidatesTags: [TAG_TYPES.USER],
  }),
  updateUser: builder.mutation<UserType, UserUpdateInputType>({
    query: (input) => ({
      method: "PATCH",
      url: API_ENDPOINT.UPDATE(input.id),
      body: input.data,
    }),
    transformResponse: (response: UserType, meta) => {
      console.log("✅ User Updated:", response);
      return response;
    },
    transformErrorResponse: (error: FetchBaseQueryError) => {
      console.error("❌ Error Updating User:", error);
      return error;
    },
    invalidatesTags: [TAG_TYPES.USER],
  }),
});
