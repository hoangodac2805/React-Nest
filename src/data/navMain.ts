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
    isActive: true,
    items: [
      {
        title: "List",
        url: ROUTER.HOME,
      },
      {
        title: "Add",
        url: ROUTER.DASHBOARD,
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
        url: "#",
      },
      {
        title: "Add",
        url: "#",
      },
    ],
  },
];
