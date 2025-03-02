import { UserApi } from "@/lib/api";
import { createAppAsyncThunk } from "@/lib/createAppAsyncThunk";
import { isHandledAxiosError } from "@/lib/error/axiosError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAppAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserApi.GetUsers();
      return response.data;
    } catch (error) {
      if (isHandledAxiosError(error)) {
        return rejectWithValue(error);
      }
      return rejectWithValue("Failed to fetch users");
    }
  }
);
