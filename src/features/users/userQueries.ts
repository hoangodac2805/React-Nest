import { API_ENDPOINT, TAG_TYPES } from "@/config";
import { UserFindInputType, PageOptionType, PageType, UserType } from "@/types";
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
  getInfiniteUsers: builder.infiniteQuery<
    PageType<UserType[]>,
    PageOptionType | void,
    number
  >({
    infiniteQueryOptions: {
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) =>
        lastPage.data.length > 0 ? lastPageParam + 1 : undefined,
    },
    query: ({ queryArg, pageParam }) => ({
      url: API_ENDPOINT.GETUSERS,
      method: "GET",
      params: { ...queryArg, page: pageParam },
    }),
    providesTags: [TAG_TYPES.USER],
    transformResponse: (response: PageType<UserType[]>) => {
      console.log("✅ Users Fetched:", response);
      return response;
    },
    transformErrorResponse: (error: FetchBaseQueryError) => {
      console.error("❌ Error fetching users", error);
      return error;
    },
  }),
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

  getUser: builder.query<UserType, UserFindInputType>({
    query: (id: UserFindInputType) => ({
      url: API_ENDPOINT.GETUSER(id),
      method: "GET",
    }),
    providesTags: (result, error, id) => [{ type: TAG_TYPES.USER, id }],
    transformResponse: (response: UserType, meta) => {
      console.log("✅ User Geted:", response);
      return response;
    },
    transformErrorResponse: (error: FetchBaseQueryError) => {
      console.error("❌ Error fetching user", error);
      return error;
    },
  }),
});
