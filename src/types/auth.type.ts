import { Gender, UserRole } from "@/enum";
import { AvatarType } from "./avatar.type";

export type LoginInputType = {
  email: string;
  password: string;
};

export type LoginByTokenInputType = RefreshTokenType;

export type RegisterInputType = {
  userName: string;
  email: string;
  password: string;
};

export type RefreshAccessTokenResponseType = {
  accessToken: AccessTokenType;
  refreshToken: RefreshTokenType;
};

export type LoginResponseType = {
  userName: string;
  accessToken: AccessTokenType;
  refreshToken: RefreshTokenType;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  gender: Gender;
  avatar: AvatarType;
};

export type AccessTokenType = string;
export type RefreshTokenType = string;
