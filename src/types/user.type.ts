import { Gender, UserRole } from "@/enum";
import { ProfileType } from "./profile.type";

export type UserType = {
  id: number;
  userName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  profile: Omit<ProfileType, "user">;
};

export type UserColumnType = Omit<UserType, "profile">;

export type UserFindInputType = number;

export type UserCreateInputType = {
  email: string;
  password: string;
  userName: string;
  role: UserRole;
  isActive: boolean;
  profile: {
    firstName?: string;
    lastName?: string;
    gender?: Gender;
  };
  avatar?: File;
};

export type UserUpdateInputType = {
  userName?: string;
  isActive?: boolean;
  role?: UserRole;
  profile?: {
    firstName?: string;
    lastName?: string;
    gender?: Gender;
  };
  avatar?: File;
};
