import { API_ENDPOINT } from "@/config";
import { baseQueryWithErrorHandling } from "@/config/baseQuery";
import { PageOptionType, PageType, UserType } from "@/types";
import { createApi, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { setUsers } from "./usersSlice";
import { SliceStatus } from "@/enum";

export const userQuery = createApi({
  reducerPath: "userApi",
  tagTypes : ['User'],
  baseQuery: baseQueryWithErrorHandling,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getUsers: builder.query<PageType<UserType[]>, PageOptionType | void>({
      query: (pageOption?: PageOptionType) => ({
        url: API_ENDPOINT.GETUSERS,
        method: "GET",
        params: pageOption,
      }),
      transformResponse: (response: PageType<UserType[]>, meta) => {
        // console.log("Received users:", response);
        return response;
      },
      transformErrorResponse: (error: FetchBaseQueryError) => {
        console.error("Error fetching users:", error);
        return error;
      },
      async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
        cacheDataLoaded.then((data) => {
          // dispatch(
          //   setUsers({ users: data.data, status: SliceStatus.SUCCEEDED })
          // );
        });
      },
    }),
  }),
});

export const { useGetUsersQuery } = userQuery;
