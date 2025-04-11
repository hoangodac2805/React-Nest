import { API_ENDPOINT, TAG_TYPES } from "@/config";
import { CreateExamType, ExamType } from "@/types/exam.type";
import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";

export const examMutations = (
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
  createExam: builder.mutation<ExamType, CreateExamType>({
    query: (input) => ({
      url: API_ENDPOINT.CREATEEXAM,
      method: "POST",
      body: input,
    }),
    transformResponse: (response: ExamType, meta) => {
      console.log("✅ Exam Created:", response);
      return response;
    },
    transformErrorResponse: (error: FetchBaseQueryError) => {
      console.error("❌ Error Creating Exam:", error);
      return error;
    },
    invalidatesTags: [TAG_TYPES.EXAM],
  }),

});
