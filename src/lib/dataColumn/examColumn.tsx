import { DataTableRowAction } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import React from "react";
import { ExamType } from "@/types/exam.type";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "@/config";
import { Link } from "react-router-dom";

interface Props {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<ExamType> | null>
  >;
}

export function GetExamColumns({ setRowAction }: Props): ColumnDef<ExamType>[] {

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tiêu đề" />
      ),
    },
    {
      accessorKey: "isDraft",
      header: "Published",
      cell: ({ row }) =>
        row.getValue("isDraft") ? "NO" : "YES",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const exam = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Mở menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(exam.title)}
              >
                Sao chép tiêu đề

              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <Link to={`${ROUTER.EXAM}/${exam.id}`}>
                <DropdownMenuItem
                >Xem và sửa</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => {
                  setRowAction({ row, type: "delete" });
                }}
              >
                Xóa khóa học
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
