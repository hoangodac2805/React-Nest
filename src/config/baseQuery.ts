import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { ACCESS_TOKEN_NAME, API_URL } from '.';
import { cookies } from '@/lib/cookie';


const baseQuery = fetchBaseQuery({
    baseUrl:API_URL,
    prepareHeaders(headers) {
          const token = cookies.get(ACCESS_TOKEN_NAME);
          if (token && !headers.get('Authorization')) {
            headers.set('Authorization', `Bearer ${token}`);
          }
          headers.set('Content-Type', 'application/json');
          return headers;
    },
})

export const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs, 
  unknown, 
  FetchBaseQueryError, 
  {}, 
  FetchBaseQueryMeta 
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    console.error("API Error:", result.error);
  }

  return result;
};