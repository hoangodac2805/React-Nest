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
      title: "User",
      url: "#",
      icon: User,
      items: [
        {
          title: "List",
          url: ROUTER.USER,
        },
        {
          title: "Create",
          url: ROUTER.USER_CREATE,
        },
      ],
    },
    {
      title: "Course",
      url: "#",
      icon: Book,
      items: [
        {
          title: "List",
          url: ROUTER.COURSE,
        },
      ],
    },
  ];
