import { UserRole } from "@/enum";
import { ProfileType } from "./profile.type";

export type UserType = {
  id: number;
  userName: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  profile: Omit<ProfileType, "user">;
};

