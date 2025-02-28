import { API_ENDPOINT } from "@/config";
import { axiosInstance } from "@/config/axios";
import { UserType } from "@/types";

export const GetUsers = () => axiosInstance.get<UserType[]>(API_ENDPOINT.GETUSERS);