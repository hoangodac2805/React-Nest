import * as React from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface TransferListDataType {
  id: string | number;
  label: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  sourceData: TransferListDataType[];
  targetData: TransferListDataType[];
  onSourceSearch: (value: string) => void;
  onTargetSearch: (value: string) => void;
  onLoadMoreSource?: () => void;
  onLoadMoreTarget?: () => void;
  onTransferToTarget: (
    items: TransferListDataType[],
    clearChecked: () => void
  ) => void;
  onTransferToSource: (
    items: TransferListDataType[],
    clearChecked: () => void
  ) => void;
}

const handleObserver = (cb: () => void) => {
  return new IntersectionObserver(
    (entries) => {
      const lastItem = entries[0];
      if (lastItem.isIntersecting) {
        cb();
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }
  );
};

function TransferListApi({
  sourceData,
  targetData,
  onSourceSearch,
  onTargetSearch,
  onLoadMoreSource = () => {},
  onLoadMoreTarget = () => {},
  onTransferToTarget,
  onTransferToSource,
  ...props
}: Props) {
  const [sourceCheckedList, setSourceCheckedList] = React.useState<
    TransferListDataType[]
  >([]);
  const [targetCheckedList, setTargetCheckedList] = React.useState<
    TransferListDataType[]
  >([]);

  const sourceLastItemRef = React.useRef(null);
  const targetLastItemRef = React.useRef(null);

  const handleTransferToTarget = React.useCallback(
    (items: TransferListDataType[]) => {
      onTransferToTarget(items, () => {
        setSourceCheckedList([]);
      });
    },
    [onTransferToTarget]
  );
  const handleTransferToSouce = React.useCallback(
    (items: TransferListDataType[]) => {
      onTransferToSource(items, () => {
        setTargetCheckedList([]);
      });
    },
    [onTransferToSource]
  );

  React.useEffect(() => {
    if (!sourceLastItemRef.current) return;
    const observer = handleObserver(onLoadMoreSource);
    observer.observe(sourceLastItemRef.current);
    return () => {
      if (sourceLastItemRef.current)
        observer.unobserve(sourceLastItemRef.current);
    };
  }, [sourceData, onLoadMoreSource]);

  React.useEffect(() => {
    if (!targetLastItemRef.current) return;
    const observer = handleObserver(onLoadMoreTarget);
    observer.observe(targetLastItemRef.current);
    return () => {
      if (targetLastItemRef.current)
        observer.unobserve(targetLastItemRef.current);
    };
  }, [targetData, onLoadMoreTarget]);

  return (
    <div
      {...props}
      className={cn("flex justify-between gap-5", props.className)}
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground border">
        <div className="border-b p-2 flex gap-1 flex-wrap items-center">
          <p className="text-[12px]">Đã chọn : </p>
          {sourceCheckedList.map((item) => (
            <div
              className="text-[12px] rounded-sm backdrop-brightness-200 px-2 py-1 w-fit flex gap-1 items-center"
              key={item.id}
            >
              {item.label}
              <X
                className="w-3 cursor-pointer shrink-0"
                onClick={() => {
                  setSourceCheckedList((prev) =>
                    prev.filter((_) => _.id !== item.id)
                  );
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            placeholder="Tìm kiếm ..."
            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onSourceSearch(e.target.value);
            }}
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
          {sourceData.length == 0 && <NoItemFound />}
          {sourceData.length > 0 && (
            <div className="overflow-hidden p-1 text-foreground ">
              <ScrollArea className="w-full h-40">
                {sourceData.map((item, idx) => (
                  <div
                    key={item.id}
                    ref={
                      idx === sourceData.length - 1 ? sourceLastItemRef : null
                    }
                    className="relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id.toString()}
                        checked={
                          !!sourceCheckedList.find((_) => _.id == item.id)
                        }
                        onCheckedChange={(checked) => {
                          return checked
                            ? setSourceCheckedList((prev) => [...prev, item])
                            : setSourceCheckedList((prev) =>
                                prev.filter((_) => _.id !== item.id)
                              );
                        }}
                      />
                      <label
                        htmlFor={item.id.toString()}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.label}
                      </label>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col self-center gap-2">
        <Button
          type="button"
          variant={"outline"}
          size={"icon"}
          onClick={() => {
            handleTransferToTarget(sourceCheckedList);
          }}
        >
          <ChevronRight />
        </Button>
        <Button
          type="button"
          variant={"outline"}
          size={"icon"}
          onClick={() => {
            handleTransferToSouce(targetCheckedList);
          }}
        >
          <ChevronLeft />
        </Button>
      </div>
      <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground border">
        <div className="border-b p-2 flex gap-1 flex-wrap items-center">
          <p className="text-[12px]">Đã chọn : </p>
          {targetCheckedList.map((item) => (
            <div
              key={item.id}
              className="text-[12px] rounded-sm backdrop-brightness-200 px-2 py-1 w-fit flex gap-1 items-center"
            >
              {item.label}
              <X
                className="w-3 cursor-pointer shrink-0"
                onClick={() => {
                  setTargetCheckedList((prev) =>
                    prev.filter((_) => _.id !== item.id)
                  );
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            placeholder="Tìm kiếm ..."
            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onTargetSearch(e.target.value);
            }}
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
          {targetData.length == 0 && <NoItemFound />}
          {targetData.length > 0 && (
            <div className="overflow-hidden p-1 text-foreground ">
              <ScrollArea className="w-full h-40">
                {targetData.map((item, idx) => (
                  <div
                    key={item.id}
                    ref={
                      idx === targetData.length - 1 ? targetLastItemRef : null
                    }
                    className="relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id.toString()}
                        checked={
                          !!targetCheckedList.find((_) => _.id == item.id)
                        }
                        onCheckedChange={(checked) => {
                          return checked
                            ? setTargetCheckedList((prev) => [...prev, item])
                            : setTargetCheckedList((prev) =>
                                prev.filter((_) => _.id !== item.id)
                              );
                        }}
                      />
                      <label
                        htmlFor={item.id.toString()}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.label}
                      </label>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NoItemFound() {
  return <div className="py-6 text-center text-sm">No item found.</div>;
}

export default TransferListApi;
