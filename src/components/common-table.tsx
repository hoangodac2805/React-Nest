import React from "react";
import type { Table } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";

interface CommonTable<TData> {
  table: Table<TData>;
  isLoading?: boolean;
  header?: React.ReactElement;
}

function CommonTable<TData>({ table, isLoading, header }: CommonTable<TData>) {
  return (
    <div>
      {header}
      <DataTable table={table} isLoading={isLoading} />
    </div>
  );
}

export default CommonTable;
