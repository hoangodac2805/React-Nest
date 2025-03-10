import { API_ENDPOINT, TAG_TYPES } from "@/config";
import { PageOptionType, PageType, UserType } from "@/types";
import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";

export const userQueries = (
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
  getUsers: builder.query<PageType<UserType[]>, PageOptionType | void>({
    query: (pageOption?: PageOptionType) => ({
      url: API_ENDPOINT.GETUSERS,
      method: "GET",
      params: pageOption,
    }),
    providesTags: [TAG_TYPES.USER],
    transformResponse: (response: PageType<UserType[]>, meta) => {
      console.log("✅ Users Geted:", response);
      return response;
    },
    transformErrorResponse: (error: FetchBaseQueryError) => {
      console.error("❌ Error fetching users", error);
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
});
