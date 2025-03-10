import { API_ENDPOINT } from "@/config";
import { baseQueryWithErrorHandling } from "@/config/baseQuery";
import { UserCreateType, UserType } from "@/types";
import { createApi, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";


export const userMutation = createApi({
    reducerPath: "userMutation",
    tagTypes: ["User"],
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        createUser: builder.mutation<UserType, UserCreateType>({
            query: (input => ({
                url: API_ENDPOINT.CREATEUSER,
                method: "POST",
                body: input
            })),
            transformResponse: (response: UserType, meta) => {
                console.log("✅ User Created:", response);
                return response;
            },
            transformErrorResponse: (error: FetchBaseQueryError) => {
                console.error("❌ Error Creating User:", error);
                return error;
            },
            invalidatesTags:["User"]
        }),
    })
})


export const {useCreateUserMutation} = userMutation;