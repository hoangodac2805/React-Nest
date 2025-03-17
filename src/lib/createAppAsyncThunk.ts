import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/app/store"; // Import store types
import { AxiosError } from "axios";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string | AxiosError;
}>();
