import TransferList, {
  TransferListDataType,
} from "@/components/ui/transfer-list";

const items: TransferListDataType[] = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
];

const items2: TransferListDataType[] = [
  {
    id: "recents2",
    label: "Recents2",
  },
  {
    id: "home2",
    label: "Home2",
  },
  {
    id: "applications3",
    label: "Applications3",
  },
  {
    id: "desktop4",
    label: "Desktop4",
  },
  {
    id: "downloads5",
    label: "Downloads5",
  },
  {
    id: "documents6",
    label: "Documents6",
  },
];

function Test() {
  return (
    <>
      <TransferList
        sourceData={items}
        targetData={items2}
        onTransferToTarget={(items, clear) => {
          clear();
        }}
        onTransferToSource={(items, clear) => {
          clear();
        }}
      />
    </>
  );
}

export default Test;
