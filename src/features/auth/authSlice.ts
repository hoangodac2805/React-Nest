import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login, loginByToken } from "@/features/auth";
import { LoginResponseType } from "@/types";
import { cookies } from "@/lib/cookie";
import {
  ACCESS_TOKEN_NAME,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_NAME,
  REFRESH_TOKEN_TIME,
} from "@/config";
import { toast } from "sonner";

export interface AuthState {
  isAuthed: boolean;
  isLoading: boolean;
  user: Omit<LoginResponseType, "accessToken" | "refreshToken"> | null;
}

const initialState: AuthState = {
  isAuthed: false,
  isLoading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthed = false;
      cookies.remove(ACCESS_TOKEN_NAME);
      cookies.remove(REFRESH_TOKEN_NAME);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(login.pending, loginByToken.pending),
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(login.fulfilled, loginByToken.fulfilled),
      (state, action) => {
        const { accessToken, refreshToken, ...userInfo } = action.payload;
        cookies.set(ACCESS_TOKEN_NAME, accessToken, {
          expires: new Date(Date.now() + ACCESS_TOKEN_TIME),
        });
        cookies.set(REFRESH_TOKEN_NAME, refreshToken, {
          expires: new Date(Date.now() + REFRESH_TOKEN_TIME),
        });
        state.isAuthed = true;
        state.user = userInfo;
        state.isLoading = false;
        toast.success("Login successfully!");
      }
    );
    builder.addMatcher(
      isAnyOf(login.rejected, loginByToken.rejected),
      (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthed = false;
      }
    );
  },
});
export const { logout } = authSlice.actions
export default authSlice.reducer;
