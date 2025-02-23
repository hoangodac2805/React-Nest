import { Gender } from "@/enum";
import { UserType } from "./user.type";
import { AvatarType } from "./avatar.type";

export type ProfileType = {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  user: Omit<UserType,"profile">;
  avatar: AvatarType;
};
