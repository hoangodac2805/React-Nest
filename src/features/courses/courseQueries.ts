import { API_ENDPOINT, TAG_TYPES } from "@/config";
import { PageOptionType, PageType } from "@/types";
import { CourseType } from "@/types/course.type";
import {
    BaseQueryFn,
    EndpointBuilder,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";


export const courseQueries = (
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
    getCourses: builder.query<PageType<CourseType[]>, PageOptionType | void>({
        query: (pageOptions?: PageOptionType) => ({
            url: API_ENDPOINT.GETCOURSES,
            method: "GET",
            params: pageOptions
        }),
        providesTags: [TAG_TYPES.COURSE],
        transformResponse: (response: PageType<CourseType[]>, meta) => {
            console.log("✅ Courses Geted:", response);
            return response;
        },
        transformErrorResponse: (error: FetchBaseQueryError) => {
            console.error("❌ Error fetching courses", error);
            return error;
        },
    })
})