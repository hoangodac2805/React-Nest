import { DataTable } from "@/components/data-table";
import { useGetUsersQuery } from "@/features/users/userQuery";
import { UserColumnType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

type Props = {};
const userColumns:ColumnDef<UserColumnType>[] = [
  {
    accessorKey:"id",
    header:"ID",
  },
  {
    accessorKey:"userName",
    header:"UserName",
  },
  {
    accessorKey:"email",
    header:"Email",
  },
  {
    accessorKey:"role",
    header:"Role",
  },
  {
    accessorKey:"isActive",
    header:"Active",
  },
]
const UserPage = (props: Props) => {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const usersData: UserColumnType[] = useMemo(() => {
    return users?.map((item) => ({
      id: item.id,
      userName: item.userName,
      email: item.email,
      role: item.role,
      isActive: item.isActive,
    })) || [];
  }, [users]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  return (
    <div className="container mx-auto py-10">
    <DataTable columns={userColumns} data={usersData} />
  </div>
  );
};

export default UserPage;
