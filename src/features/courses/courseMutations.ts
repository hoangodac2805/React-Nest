import { API_ENDPOINT, TAG_TYPES } from "@/config";
import { CourseCreateInputType, CourseType } from "@/types/course.type";
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
            return response
        },
        transformErrorResponse: (error: FetchBaseQueryError) => {
            console.error("❌ Error Creating Course:", error);
            return error;
        },
        invalidatesTags: [TAG_TYPES.COURSE],
    })
});