import type { ColumnSort } from "@tanstack/react-table";


export * from "./user.type";
export * from "./profile.type";
export * from "./avatar.type";
export * from "./auth.type";
export * from "./axios.type";

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