import { TAG_TYPES } from "@/config";
import { baseQueryWithErrorHandling } from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { courseQueries } from "./courseQueries";
import { courseMutations } from "./courseMutations";


export const courseQuery = createApi({
    reducerPath: "courseApi",
    tagTypes: [TAG_TYPES.COURSE],
    baseQuery: baseQueryWithErrorHandling,
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        ...courseQueries(builder),
        ...courseMutations(builder),
    }),

});

export const { useGetCoursesQuery, useCreateCourseMutation } = courseQuery;
