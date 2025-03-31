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
import { CourseType } from "@/types/course.type";

interface Props {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<CourseType> | null>
  >;
}

export function GetCouseColumns({ setRowAction }: Props): ColumnDef<CourseType>[] {
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
      accessorKey: "nameVn",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên VN" />
      ),
    },
    {
      accessorKey: "nameJp",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên JP" />
      ),
    },
    {
      accessorKey: "nameEn",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên EN" />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const course = row.original;
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
                onClick={() => navigator.clipboard.writeText(course.nameVn)}
              >
                Sao chép tên VN

              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  setRowAction({ row, type: "update" });
                }}>Xem và sửa</DropdownMenuItem>

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
