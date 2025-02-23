import { API_ENDPOINT } from "@/config";
import { axiosInstance } from "@/config/axios";
import { LoginInputType, LoginResponseType, RefreshTokenType } from "@/types";

export const Login = (input: LoginInputType) =>
  axiosInstance.post<LoginResponseType>(API_ENDPOINT.LOGIN,input);

export const LoginByToken = (token: RefreshTokenType) =>
  axiosInstance.post<LoginResponseType>(API_ENDPOINT.LOGINBYTOKEN,  { refreshToken: token });
