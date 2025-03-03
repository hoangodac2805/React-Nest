import { UserApi } from "@/lib/api";
import { createAppAsyncThunk } from "@/lib/createAppAsyncThunk";
import { isAxiosError } from "axios";

export const fetchUsers = createAppAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserApi.GetUsers();
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error);
      }
      return rejectWithValue("Failed to fetch users");
    }
  }
);
