import { API_ENDPOINT, TAG_TYPES } from "@/config";
import { PageOptionType, PageType } from "@/types";
import { LessonType } from "@/types/lessons.type";
import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";

export const lessonQueries = (
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
  getInfiniteLessons: builder.infiniteQuery<
    PageType<LessonType[]>,
    PageOptionType | void,
    number
  >({
    infiniteQueryOptions: {
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) =>
        lastPage.data.length > 0 ? lastPageParam + 1 : undefined,
    },
    query: ({ queryArg, pageParam }) => ({
      url: API_ENDPOINT.GETLESSONS,
      method: "GET",
      params: { ...queryArg, page: pageParam },
    }),
    providesTags: [TAG_TYPES.LESSON],
    transformResponse: (response: PageType<LessonType[]>, meta) => {
      console.log("✅ Lessons Geted:", response);
      return response;
    },
    transformErrorResponse: (error: FetchBaseQueryError) => {
      console.error("❌ Error fetching lessons", error);
      return error;
    },
  }),
  getLessons: builder.query<PageType<LessonType[]>, PageOptionType | void>({
    query: (pageOptions?: PageOptionType) => ({
      url: API_ENDPOINT.GETLESSONS,
      method: "GET",
      params: pageOptions,
    }),
    providesTags: [TAG_TYPES.LESSON],
    transformResponse: (response: PageType<LessonType[]>, meta) => {
      console.log("✅ Lessons Geted:", response);
      return response;
    },
    transformErrorResponse: (error: FetchBaseQueryError) => {
      console.error("❌ Error fetching lessons", error);
      return error;
    },
  }),
});
