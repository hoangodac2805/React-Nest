import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import {
  MESSAGES,
  API_RESPONSE_MESSAGE,
  ACCESS_TOKEN_NAME,
  API_URL,
  REFRESH_TOKEN_NAME,
  API_ENDPOINT,
  ACCESS_TOKEN_TIME,
} from "@/config";
import { cookies } from "@/lib/cookie";
import { toast } from "sonner";
import { RefreshAccessTokenResponseType } from "@/types";
import { HttpStatusCode } from "axios";
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders(headers) {
    const token = cookies.get(ACCESS_TOKEN_NAME);
    if (token && !headers.get("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;
    const errMsg = (result.error.data as { message?: string })?.message;
    switch (status) {
      case HttpStatusCode.Forbidden:
        toast.error(MESSAGES.Forbidden);
        break;
      case HttpStatusCode.Unauthorized:
        if (API_RESPONSE_MESSAGE.INVALID_REFRESH_TOKEN.includes(errMsg!)) {
          toast.info(MESSAGES.RefreshToken_Expired);
          cookies.remove(REFRESH_TOKEN_NAME);
        }

        if (API_RESPONSE_MESSAGE.INVALID_CREDENTIALS.includes(errMsg!)) {
          toast.info(MESSAGES.Invalid_credentials);
        }

        if (API_RESPONSE_MESSAGE.INVALID_ACCESS_TOKEN.includes(errMsg!)) {
          const refreshToken = cookies.get(REFRESH_TOKEN_NAME);
          // toast.info(MESSAGES.Token_refreshed)
          if (refreshToken) {
            const refreshResult = await baseQuery(
              {
                url: API_ENDPOINT.REFRESH_ACCESSTOKEN,
                method: "POST",
                body: { refreshToken },
              },
              api,
              extraOptions
            );
            if (
              refreshResult.data &&
              (refreshResult.data as RefreshAccessTokenResponseType).accessToken
            ) {
              const newAccessToken = (
                refreshResult.data as RefreshAccessTokenResponseType
              ).accessToken;
              cookies.set(ACCESS_TOKEN_NAME, newAccessToken, {
                expires: new Date(Date.now() + ACCESS_TOKEN_TIME),
              });

              let modifiedArgs: FetchArgs;
              if (typeof args === "string") {
                modifiedArgs = {
                  url: args,
                  headers: { Authorization: `Bearer ${newAccessToken}` },
                };
              } else {
                modifiedArgs = {
                  ...args,
                  headers: {
                    ...(args.headers || {}),
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                };
              }
              result = await baseQuery(modifiedArgs, api, extraOptions);
            }
          }
        }
        break;
      case HttpStatusCode.Conflict:
        toast.error(errMsg)
        break;
      default:
        console.log(result.error);
        toast.error(MESSAGES.Errors_occurred);
        break;
    }
  }
  return result;
};
