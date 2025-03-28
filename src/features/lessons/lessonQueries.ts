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
    getLessons: builder.query<PageType<LessonType[]>, PageOptionType | void>({
        query: (pageOptions?: PageOptionType) => ({
            url: API_ENDPOINT.GETLESSONS,
            method: "GET",
            params: pageOptions
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
    })
})