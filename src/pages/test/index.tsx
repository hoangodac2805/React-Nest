import TransferListApi from "@/components/ui/transfer-list-api";
import { useGetInfiniteUsersInfiniteQuery } from "@/features/users/userQuery";
import { debounce } from "@/lib/utils";
import { useMemo, useState } from "react";

function Test() {
  const [sourceInput, setSourceInput] = useState<string>("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteUsersInfiniteQuery({ keyword: sourceInput });

  const sourceUsers = useMemo(() => {
    return (
      data?.pages.flatMap((page) =>
        page.data.map((user) => ({
          id: user.id,
          label: user.userName,
        }))
      ) || []
    );
  }, [data]);

  const handleSourceSearch = (value: string) => {
    setSourceInput(value);
  };
  const debounceOnSouceSearch = useMemo(
    () => debounce(handleSourceSearch, 300),
    [handleSourceSearch]
  );

  const [selectedUsers, setSelectedUsers] = useState([]);

  return (
    <div className="max-w-lg mx-auto py-5">
      <TransferListApi
        sourceData={sourceUsers}
        targetData={selectedUsers}
        onSourceSearch={(value) => {
          debounceOnSouceSearch(value);
        }}
        onTargetSearch={(value) => {
          console.log("Search Target:", value);
        }}
        onLoadMoreSource={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onTransferToTarget={(items, clear) => {
          // setSelectedUsers((prev) => [...prev, ...items]);
          clear();
        }}
        onTransferToSource={(items, clear) => {
          setSelectedUsers((prev) => prev.filter((u) => !items.includes(u)));
          clear();
        }}
      />
    </div>
  );
}

export default Test;
