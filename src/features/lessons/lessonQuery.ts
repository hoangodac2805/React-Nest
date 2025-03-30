import { TAG_TYPES } from "@/config";
import { baseQueryWithErrorHandling } from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { lessonQueries } from "./lessonQueries";


export const lessonQuery = createApi({
    reducerPath: "lessonApi",
    tagTypes: [TAG_TYPES.LESSON],
    baseQuery: baseQueryWithErrorHandling,
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        ...lessonQueries(builder),
    }),

});

export const { useGetLessonsQuery,useGetInfiniteLessonsInfiniteQuery } = lessonQuery;
