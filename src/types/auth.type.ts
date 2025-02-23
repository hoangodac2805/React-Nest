import { Gender } from "@/enum";
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

export type LoginResponseType = {
  accessToken: AccessTokenType;
  refreshToken: RefreshTokenType;
  email: string;
  firstName?: string;
  lastName?: string;
  gender: Gender;
  avatar: AvatarType;
};

export type AccessTokenType = string;
export type RefreshTokenType = string;
