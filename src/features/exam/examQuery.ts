import { TAG_TYPES } from "@/config";
import { baseQueryWithErrorHandling } from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { examMutations } from "./examMutations";
import { examQueries } from "./examQueries";


export const examQuery = createApi({
  reducerPath: "examApi",
  tagTypes: [TAG_TYPES.EXAM],
  baseQuery: baseQueryWithErrorHandling,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    ...examQueries(builder),
    ...examMutations(builder)
  }),
});

export const {
  useCreateExamMutation,
  useGetExamsQuery,
  useGetExamQuery
} = examQuery;
