import Axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { API_URL, ACCESS_TOKEN_NAME } from ".";
import { cookies } from "@/lib/cookie";
import { handleErrorIntercepter } from "@/lib/error/axiosError";

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

function errorIntercepter(error: AxiosError) {
  // console.log(error)
  const handledError = handleErrorIntercepter(error);
  return Promise.reject(error);
}

axiosInstance.interceptors.request.use(authRequestIntercepter);
axiosInstance.interceptors.response.use(responseIntercepter, errorIntercepter);
