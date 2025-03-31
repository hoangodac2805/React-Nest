import { ROUTER } from "@/config";
import { Book, LucideIcon, User } from "lucide-react";

export const NavMainData: {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}[] = [
  {
    title: "Người dùng",
    url: ROUTER.USER,
    icon: User,
  },
  {
    title: "Khóa học",
    url: ROUTER.COURSE,
    icon: Book,
  },
];
