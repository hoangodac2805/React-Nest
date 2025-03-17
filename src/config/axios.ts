import Axios, {
  AxiosError,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";
import {
  API_URL,
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  API_ENDPOINT,
  ACCESS_TOKEN_TIME,
  API_RESPONSE_MESSAGE,
} from ".";
import { cookies } from "@/lib/cookie";
import {
  ApiErrorResponseDataType,
  CommonResponseData,
  RefreshAccessTokenResponseType,
} from "@/types";
import { toast } from "sonner";

export const axiosInstance = Axios.create({
  baseURL: API_URL,
});

function authRequestIntercepter(config: InternalAxiosRequestConfig) {
  const token = cookies.get(ACCESS_TOKEN_NAME);

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
}

function responseIntercepter(response: AxiosResponse) {
  return response;
}

async function errorIntercepter(error: AxiosError) {
  console.log(error)

  if (isAxiosError<ApiErrorResponseDataType>(error)) {
    const { status, response } = error;
    const { message, messageVn } = response?.data as CommonResponseData;
    switch (status) {
      case HttpStatusCode.Forbidden:
        toast.error(messageVn);
        break;
      case HttpStatusCode.Unauthorized:
        if (API_RESPONSE_MESSAGE.INVALID_REFRESH_TOKEN.includes(message)) {
          toast.info(messageVn);
          cookies.remove(REFRESH_TOKEN_NAME);
        }
        if (API_RESPONSE_MESSAGE.INVALID_CREDENTIALS.includes(message)) {
          toast.info(messageVn);
        }
        if (API_RESPONSE_MESSAGE.INVALID_ACCESS_TOKEN.includes(message)) {
          try {
            const refreshToken = cookies.get(REFRESH_TOKEN_NAME);
            if (refreshToken) {
              const res =
                await axiosInstance.post<RefreshAccessTokenResponseType>(
                  API_ENDPOINT.REFRESH_ACCESSTOKEN,
                  { refreshToken }
                );
              cookies.set(ACCESS_TOKEN_NAME, res.data.accessToken, {
                expires: new Date(Date.now() + ACCESS_TOKEN_TIME),
              });
              if (error.config) {
                error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
                return axiosInstance(error.config);
              }
            }
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        break;
      default:
        toast.error(messageVn);
        break;
    }
  }
  return Promise.reject(error);
}

axiosInstance.interceptors.request.use(authRequestIntercepter);
axiosInstance.interceptors.response.use(responseIntercepter, errorIntercepter);
