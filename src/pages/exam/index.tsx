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
import { Link } from "react-router-dom";
import { ROUTER } from "@/config";
import { ExamType } from "@/types/exam.type";
import { useGetExamsQuery } from "@/features/exam/examQuery";
import { GetExamColumns } from "@/lib/dataColumn/examColumn";

const ExamPage = () => {

  const [pageOption, setPageOption] = useState<PageOptionType>({
    page: 1,
    take: 10,
    order: Order.ASC,
    keyword: "",
  });

  const [rowAction, setRowAction] =
    useState<DataTableRowAction<ExamType> | null>(null);

  const { data, isLoading } = useGetExamsQuery(pageOption);

  const examsData: ExamType[] = useMemo(() => data?.data || [], [data]);

  const examColumns = useMemo(() => GetExamColumns({ setRowAction }), []);

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
    data: examsData,
    columns: examColumns,
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
          placeholder="Tỉm kiếm user"
          onChange={(e) => debouncedOnSearch(e.target.value)}
          className="max-w-sm w-4/5"
        />
        <Link to={ROUTER.EXAM_CREATE}>
          <Button className="px-5" size={"lg"} variant={"outline"}>
            <CircleFadingPlus />
            Tạo mới
          </Button>
        </Link>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );

  return (
    <div className="container mx-auto py-10">
      <CommonTable table={table} isLoading={isLoading} header={Header} />
      {/* <DeleteUserDialog
        open={rowAction?.type === "delete"}
        row={rowAction?.row.original}
        onOpenChange={() => setRowAction(null)}
      /> */}

    </div>
  );
};

export default ExamPage;
