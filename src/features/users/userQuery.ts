import {  TAG_TYPES } from "@/config";
import { baseQueryWithErrorHandling } from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { userQueries } from "./userQueries";
import { userMutations } from "./userMutations";

export const userQuery = createApi({
  reducerPath: "userApi",
  tagTypes: [TAG_TYPES.USER],
  baseQuery: baseQueryWithErrorHandling,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    ...userQueries(builder),
    ...userMutations(builder),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = userQuery;
