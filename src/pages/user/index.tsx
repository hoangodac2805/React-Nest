import { DataTable } from "@/components/data-table";
import { useGetUsersQuery } from "@/features/users/userQuery";
import { PaginationMetaType, UserColumnType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
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
type Props = {};
const userColumns: ColumnDef<UserColumnType>[] = [
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
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) =>
      row.getValue("isActive") ? "Đã kích hoạt" : "Chưa kích hoạt",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              Copy user email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View user</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
const UserPage = ({}: Props) => {
  const { data, error, isLoading } = useGetUsersQuery();
  const usersData: UserColumnType[] = useMemo(() => {
    return (
      data?.data?.map((item) => ({
        id: item.id,
        userName: item.userName,
        email: item.email,
        role: item.role,
        isActive: item.isActive,
      })) || []
    );
  }, [data, error, isLoading]);

  const paginationData: PaginationMetaType | undefined = useMemo(() => {
    if (!data) return undefined;
    return {
      page: data.meta.page,
      take: data.meta.take,
      itemCount: data.meta.itemCount,
      pageCount: data.meta.pageCount,
      hasPreviousPage: data.meta.hasPreviousPage,
      hasNextPage: data.meta.hasNextPage,
    };
  }, [data, error, isLoading]);
  const memoizedDataTable = useMemo(() => {
    return (
      <DataTable
        columns={userColumns}
        data={usersData}
        paginationMeta={paginationData}
      />
    );
  }, [usersData]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  return <div className="container mx-auto py-10">{memoizedDataTable}</div>;
};

export default UserPage;
