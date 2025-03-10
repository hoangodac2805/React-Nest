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



export type UserCreateType = {
  email: string;
  password: string;
  userName: string;
  role: UserRole;
  isActive: boolean,
  profile: {
    firstName?: string;
    lastName?: string;
    gender?: Gender;
  }
  avatar?: File
}