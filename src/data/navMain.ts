import { ROUTER } from "@/config";
import { Book, ClipboardPenLine, LucideIcon, User } from "lucide-react";

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
  {
    title: "Bài thi",
    url: "#",
    icon: ClipboardPenLine,
    items: [
      {
        title: "Danh sách",
        url: ROUTER.EXAM,
      },
      {
        title: "Categories",
        url: ROUTER.EXAM_CATE,
      },
      {
        title: "Tags",
        url: ROUTER.EXAM_TAG,
      },
    ],
  },
];
