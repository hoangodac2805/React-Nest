import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface TransferListDataType {
  id: string;
  label: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  sourceData: TransferListDataType[];
  targetData: TransferListDataType[];
  onTransferToTarget: (
    items: TransferListDataType["id"][],
    clearChecked: () => void
  ) => void;
  onTransferToSource: (
    items: TransferListDataType["id"][],
    clearChecked: () => void
  ) => void;
}
function TransferList({
  sourceData,
  targetData,
  onTransferToTarget,
  onTransferToSource,
  ...props
}: Props) {
  const [sourceCheckedList, setSourceCheckedList] = React.useState<
    TransferListDataType["id"][]
  >([]);
  const [targetCheckedList, setTargetCheckedList] = React.useState<
    TransferListDataType["id"][]
  >([]);

  const handleTransferToTarget = React.useCallback(
    (items: TransferListDataType["id"][]) => {
      onTransferToSource(items, () => {
        setSourceCheckedList([]);
      });
    },
    [onTransferToTarget]
  );
  const handleTransferToSouce = React.useCallback(
    (items: TransferListDataType["id"][]) => {
      onTransferToSource(items, () => {
        setTargetCheckedList([]);
      });
    },
    [onTransferToSource]
  );
  return (
    <div
      {...props}
      className={cn("flex justify-between gap-5", props.className)}
    >
      <Command className="border">
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="w-full h-40">
              {sourceData.map((item) => (
                <CommandItem key={item.id} value={item.id}>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={sourceCheckedList.includes(item.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? setSourceCheckedList((prev) => prev.concat(item.id))
                          : setSourceCheckedList((prev) =>
                              prev.filter((_) => _ !== item.id)
                            );
                      }}
                    />
                    <label
                      htmlFor={item.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.label}
                    </label>
                  </div>
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </CommandList>
      </Command>
      <div className="flex flex-col self-center gap-2">
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => {
            handleTransferToTarget(sourceCheckedList);
          }}
        >
          <ChevronRight />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => {
            handleTransferToSouce(targetCheckedList);
          }}
        >
          <ChevronLeft />
        </Button>
      </div>
      <Command className="border">
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="w-full h-40">
              {targetData.map((item) => (
                <CommandItem key={item.id} value={item.id}>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={targetCheckedList.includes(item.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? setTargetCheckedList((prev) => prev.concat(item.id))
                          : setTargetCheckedList((prev) =>
                              prev.filter((_) => _ !== item.id)
                            );
                      }}
                    />
                    <label
                      htmlFor={item.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.label}
                    </label>
                  </div>
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default TransferList;
