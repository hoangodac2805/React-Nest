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
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type PageType<T> = {
  data: T;
  meta: PageMetaType;
};
