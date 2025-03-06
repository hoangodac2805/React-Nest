import React from "react";
import type { Table } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";

interface UserTable<TData> {
  table: Table<TData>;
  isLoading?: boolean;
  header?: React.ReactElement;
}

function UserTable<TData>({ table, isLoading, header }: UserTable<TData>) {
  return (
    <div>
      {header}
      <DataTable table={table} isLoading={isLoading} />
    </div>
  );
}

export default UserTable;
