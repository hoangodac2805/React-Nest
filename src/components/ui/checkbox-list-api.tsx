import * as React from "react";
import { Search, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface CheckBoxListDataType {
  id: string | number;
  label: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: CheckBoxListDataType[];
  onSearch: (value: string) => void;
  onLoadMore?: () => void;
  onChecked: (items: CheckBoxListDataType[], clearChecked: () => void) => void;
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

function CheckBoxList({
  data,
  onSearch,
  onLoadMore = () => {},
  onChecked,
  ...props
}: Props) {
  const [checkedList, setCheckedList] = React.useState<CheckBoxListDataType[]>(
    []
  );

  const lastItemRef = React.useRef(null);

  React.useEffect(() => {
    if (!lastItemRef.current) return;
    const observer = handleObserver(onLoadMore);
    observer.observe(lastItemRef.current);
    return () => {
      if (lastItemRef.current) observer.unobserve(lastItemRef.current);
    };
  }, [data, onLoadMore]);

  React.useEffect(() => {
    onChecked(checkedList, () => {
      setCheckedList([]);
    });
  }, [checkedList]);

  return (
    <div
      {...props}
      className={cn("flex justify-between gap-5", props.className)}
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground border">
        <div className="border-b p-2 flex gap-1 flex-wrap items-center">
          <p className="text-[12px]">Đã chọn : </p>
          {checkedList.map((item) => (
            <div
              className="text-[12px] rounded-sm backdrop-brightness-200 px-2 py-1 w-fit flex gap-1 items-center"
              key={item.id}
            >
              {item.label}
              <X
                className="w-3 cursor-pointer shrink-0"
                onClick={() => {
                  setCheckedList((prev) =>
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
            placeholder="Tìm kiếm..."
            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onSearch(e.target.value);
            }}
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
          {data.length == 0 && <NoItemFound />}
          {data.length > 0 && (
            <div className="overflow-hidden p-1 text-foreground ">
              <ScrollArea className="w-full h-40">
                {data.map((item, idx) => (
                  <div
                    key={item.id}
                    ref={idx === data.length - 1 ? lastItemRef : null}
                    className="relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id.toString()}
                        checked={!!checkedList.find((_) => _.id == item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? setCheckedList((prev) => [...prev, item])
                            : setCheckedList((prev) =>
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
  return <div className="py-6 text-center text-sm">Không có dữ liệu.</div>;
}

export default CheckBoxList;
