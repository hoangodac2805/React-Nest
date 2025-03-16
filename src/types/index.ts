import { Order } from "@/enum";
import type { ColumnSort, Row } from "@tanstack/react-table";
import { HttpStatusCode } from "axios";

export * from "./user.type";
export * from "./profile.type";
export * from "./avatar.type";
export * from "./auth.type";
export * from "./axios.type";

export type CommonResponseData = {
  readonly statusCode: HttpStatusCode;
  readonly message: string;
  readonly messageVn: string;
  readonly error: string;
};

export type PageMetaType = {
  readonly page: number;
  readonly take: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
};

export type PaginationMetaType = {
  readonly page: number;
  readonly take: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
};

export type PageOptionType = Partial<{
  order: Order;
  page: number;
  take: number;
  keyword: string;
}>;

export type PageType<T> = {
  data: T;
  meta: PageMetaType;
};

export type StringKeyOf<TData> = Extract<keyof TData, string>;
export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
  id: StringKeyOf<TData>;
}
export type ExtendedSortingState<TData> = ExtendedColumnSort<TData>[];

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
}

export interface DataTableFilterField<TData> {
  id: StringKeyOf<TData>;
  label: string;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableRowAction<TData> {
  row: Row<TData>;
  type: "update" | "delete";
}
