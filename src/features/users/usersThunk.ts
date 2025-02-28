import { UserApi } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async () =>{
        const response = await UserApi.GetUsers();
        return response.data;
    }
)