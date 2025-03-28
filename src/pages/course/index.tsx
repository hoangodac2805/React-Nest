import {
  DataTableRowAction,
  PageOptionType,
  PaginationMetaType,
} from "@/types";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useDataTable } from "@/hooks/use-data-table";
import { Order } from "@/enum";
import { CircleFadingPlus } from "lucide-react";
import { debounce } from "@/lib/utils";
import DataTableViewOptions from "@/components/data-table/data-table-view-options";
import CommonTable from "@/components/common-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateUserDrawer from "@/pages/user/_components/create-user-drawer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { openDrawer } from "@/features/drawer";
import { DRAWER_NAME } from "@/config/drawer-name";
import DeleteUserDialog from "./_components/delete-course-dialog";
import UpdateUserDrawer from "./_components/update-course-drawer";
import { useGetCoursesQuery } from "@/features/courses/courseQuery";
import { CourseType } from "@/types/course.type";
import { GetCouseColumns } from "@/lib/dataColumn/courseColumns";
import CreateCourseDrawer from "./_components/create-course-drawer";


const CoursePage = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleOpenCreateUserDrawer = useCallback(() => {
    dispatch(openDrawer(DRAWER_NAME.CREATE_COURSE));
  }, [dispatch]);

  const [pageOption, setPageOption] = useState<PageOptionType>({
    page: 1,
    take: 10,
    order: Order.ASC,
    keyword: "",
  });

  const [rowAction, setRowAction] =
    useState<DataTableRowAction<CourseType> | null>(null);

  const { data, isLoading } = useGetCoursesQuery(pageOption);

  const coursesData: CourseType[] = useMemo(() => data?.data || [], [data]);

  const userColumns = useMemo(() => GetCouseColumns({ setRowAction }), []);

  const paginationData: PaginationMetaType | undefined = useMemo(
    () =>
      data && {
        page: data.meta.page,
        take: data.meta.take,
        itemCount: data.meta.itemCount,
        pageCount: data.meta.pageCount,
        hasPreviousPage: data.meta.hasPreviousPage,
        hasNextPage: data.meta.hasNextPage,
      },
    [data]
  );

  const { table } = useDataTable({
    data: coursesData,
    columns: userColumns,
    paginate: paginationData,
  });

  const handleSearch = useCallback(
    (value: string) => {
      setPageOption((oldState) => ({
        ...oldState,
        page: 1,
        keyword: value,
      }));
      table.setPageIndex(0);
    },
    [table]
  );

  const debouncedOnSearch = useMemo(
    () => debounce(handleSearch, 300),
    [handleSearch]
  );

  const { pageIndex, pageSize } = table.getState().pagination;

  useEffect(() => {
    setPageOption((oldState) => ({
      ...oldState,
      page: pageIndex + 1,
      take: pageSize,
    }));
  }, [pageIndex, pageSize]);

  const Header = (
    <div className="flex items-center py-4">
      <div className="flex items-center justify-start gap-x-4 w-3/4">
        <Input
          placeholder="Search course"
          onChange={(e) => debouncedOnSearch(e.target.value)}
          className="max-w-sm w-4/5"
        />
        <Button
          className="px-5"
          size={"lg"}
          variant={"outline"}
          onClick={handleOpenCreateUserDrawer}
        >
          <CircleFadingPlus />
          Create
        </Button>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );

  return (
    <div className="container mx-auto py-10">
      <CommonTable table={table} isLoading={isLoading} header={Header} />
      <CreateCourseDrawer />
      {/* <DeleteUserDialog
        open={rowAction?.type === "delete"}
        row={rowAction?.row.original}
        onOpenChange={() => setRowAction(null)}
      />
       <UpdateUserDrawer
        open={rowAction?.type === "update"}
        row={rowAction?.row.original}
        onOpenChange={() => setRowAction(null)}
      /> */}
    </div>
  );
};

export default CoursePage;
