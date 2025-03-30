import { API_ENDPOINT, TAG_TYPES } from "@/config";
import {
  CourseCreateInputType,
  CourseType,
  CourseUpdateInputType,
} from "@/types/course.type";
import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
export const courseMutations = (
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
  createCourse: builder.mutation<CourseType, CourseCreateInputType>({
    query: (input) => ({
      url: API_ENDPOINT.CREATECOURSE,
      method: "POST",
      body: input,
    }),
    transformResponse: (response: CourseType, meta) => {
      console.log("✅Course Created:", response);
      return response;
    },
    transformErrorResponse: (error: FetchBaseQueryError) => {
      console.error("❌ Error Creating Course:", error);
      return error;
    },
    invalidatesTags: [TAG_TYPES.COURSE],
  }),
  deleteCourse: builder.mutation<void, number>({
    query: (id) => ({
      method: "DELETE",
      url: API_ENDPOINT.DELETECOURSE(id),
    }),
    transformResponse: (response, meta) => {
      console.log("✅ Course Deleted");
    },
    transformErrorResponse: (error: FetchBaseQueryError) => {
      console.error("❌ Error Deleting Course");
      return error;
    },
    invalidatesTags: [TAG_TYPES.COURSE],
  }),
  updateCourse: builder.mutation<CourseType, CourseUpdateInputType>({
    query: (input) => ({
      method: "PATCH",
      url: API_ENDPOINT.UPDATECOURSE(input.id),
      body: input.data,
    }),
    transformResponse: (response: CourseType, meta) => {
      console.log("✅ Course Updated:", response);
      return response;
    },
    transformErrorResponse: (error: FetchBaseQueryError) => {
      console.error("❌ Error Updating Course:", error);
      return error;
    },
    invalidatesTags: [TAG_TYPES.COURSE],
  }),
});
