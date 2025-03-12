import { AuthApi } from "@/lib/api";
import { createAppAsyncThunk } from "@/lib/createAppAsyncThunk";
import { LoginInputType, RefreshTokenType } from "@/types";
import { isAxiosError } from "axios";

export const login = createAppAsyncThunk(
  "auth/login",
  async (input: LoginInputType, { rejectWithValue }) => {
    try {
      const response = await AuthApi.Login(input);
      return response.data;
    } catch (error) {
      console.log(error)
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue("Failed to login");
    }
  }
);

export const loginByToken = createAppAsyncThunk(
  "auth/loginByToken",
  async (token: RefreshTokenType, { rejectWithValue }) => {
    try {
      const response = await AuthApi.LoginByToken(token);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue("Failed to login");
    }
  }
);
