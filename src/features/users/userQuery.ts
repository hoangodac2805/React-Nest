import { API_ENDPOINT } from "@/config";
import { baseQueryWithErrorHandling } from "@/config/baseQuery";
import { UserType } from "@/types";
import { createApi, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { setUsers } from "./usersSlice";
import { SliceStatus } from "@/enum";

export const userQuery = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getUsers: builder.query<UserType[], void>({
      query: () => API_ENDPOINT.GETUSERS,
      transformResponse: (response: UserType[], meta) => {
        console.log("Received users:", response);
        return response;
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        console.error("Error fetching users:", error);
        return error;
      },
      async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
        cacheDataLoaded.then((data) => {
          dispatch(
            setUsers({ users: data.data, status: SliceStatus.SUCCEEDED })
          );
        });
      },
    }),
  }),
});

export const { useGetUsersQuery } = userQuery;
