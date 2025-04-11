import { API_ENDPOINT, TAG_TYPES } from "@/config";
import { PageOptionType, PageType,  } from "@/types";
import { ExamFindInputType, ExamType } from "@/types/exam.type";
import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";

export const examQueries = (
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
//   getInfiniteUsers: builder.infiniteQuery<
//     PageType<UserType[]>,
//     PageOptionType | void,
//     number
//   >({
//     infiniteQueryOptions: {
//       initialPageParam: 1,
//       getNextPageParam: (lastPage, allPages, lastPageParam) =>
//         lastPage.data.length > 0 ? lastPageParam + 1 : undefined,
//     },
//     query: ({ queryArg, pageParam }) => ({
//       url: API_ENDPOINT.GETUSERS,
//       method: "GET",
//       params: { ...queryArg, page: pageParam },
//     }),
//     providesTags: [TAG_TYPES.USER],
//     transformResponse: (response: PageType<UserType[]>) => {
//       console.log("✅ Users Fetched:", response);
//       return response;
//     },
//     transformErrorResponse: (error: FetchBaseQueryError) => {
//       console.error("❌ Error fetching users", error);
//       return error;
//     },
//   }),
  getExams: builder.query<PageType<ExamType[]>, PageOptionType | void>({
    query: (pageOption?: PageOptionType) => ({
      url: API_ENDPOINT.GETEXAMS,
      method: "GET",
      params: pageOption,
    }),
    providesTags: [TAG_TYPES.EXAM],
    transformResponse: (response: PageType<ExamType[]>, meta) => {
      console.log("✅ Exams Geted:", response);
      return response;
    },
    transformErrorResponse: (error: FetchBaseQueryError) => {
      console.error("❌ Error fetching exams", error);
      return error;
    },
    async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
      cacheDataLoaded.then((data) => {
     
      });
    },
  }),

  getExam: builder.query<ExamType, ExamFindInputType>({
    query: (id: ExamFindInputType) => ({
      url: API_ENDPOINT.GETEXAM(id),
      method: "GET",
    }),
    providesTags: (result, error, id) => [{ type: TAG_TYPES.EXAM, id }],
    transformResponse: (response: ExamType, meta) => {
      console.log("✅ Exam Geted:", response);
      return response;
    },
    transformErrorResponse: (error: FetchBaseQueryError) => {
      console.error("❌ Error fetching exam", error);
      return error;
    },
  }),
});
