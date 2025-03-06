import { useGetUsersQuery } from "@/features/users/userQuery";
import { PageOptionType, PaginationMetaType, UserColumnType } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useDataTable } from "@/hooks/use-data-table";
import { userColumns } from "@/lib/dataColumn/userColumns";
import { Order } from "@/enum";
import UserTable from "./_components/user-table";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";
import DataTableColumnFilter from "@/components/data-table/data-table-column-filter";
type Props = {};

const UserPage = ({}: Props) => {
  const [pageOption, setPageOption] = useState<PageOptionType>({
    page: 1,
    take: 10,
    order: Order.ASC,
    keyword: "",
  });

  const { data, error, isLoading } = useGetUsersQuery(pageOption);

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
  }, [data, error, isLoading, pageOption]);

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
  }, [data, error, isLoading, pageOption]);

  const { table } = useDataTable({
    data: usersData,
    columns: userColumns,
    paginate: paginationData,
  });

  const handleSearch = (value: string) => {
    setPageOption((oldState) => ({
      ...oldState,
      page: 1,
      keyword: value,
    }));
    table.setPageIndex(0);
  };

  const debouncedOnSearch = debounce(handleSearch, 300);

  const Header = (
    <div className="flex items-center py-4">
      <Input
        placeholder="Search..."
        onChange={(event) => debouncedOnSearch(event.target.value)}
        className="max-w-sm"
      />
      <DataTableColumnFilter table={table} />
    </div>
  );

  useEffect(() => {
    const { pageIndex, pageSize } = table.getState().pagination;
    setPageOption((oldState) => ({
      ...oldState,
      page: pageIndex + 1,
      take: pageSize,
    }));
  }, [table.getState().pagination]);

  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <div className="container mx-auto py-10">
      <UserTable table={table} isLoading={isLoading} header={Header} />
    </div>
  );
};

export default UserPage;
