import { useState } from "react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  VisibilityState,
  useReactTable,
  SortingState,
  getSortedRowModel,
  TableOptions,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { PaginationMetaType } from "@/types";

interface UseDataTableProps<TData>
  extends Omit<
    TableOptions<TData>,
    "getCoreRowModel" | "state" | "manualPagination"
  > {
  paginate?: PaginationMetaType;
}

export function useDataTable<TData>({
  paginate,
  ...props
}: UseDataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: paginate ? paginate.page - 1 : 0,
    pageSize: paginate ? paginate.take : 10,
  });
  const tableProps: TableOptions<TData> = {
    ...props,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  };
  if (paginate) {
    tableProps.manualPagination = true;
    tableProps.pageCount = paginate.pageCount;
    tableProps.onPaginationChange = setPagination;
    tableProps.state = { ...tableProps.state, pagination };
  }

  const table = useReactTable(tableProps);
  return { table };
}
