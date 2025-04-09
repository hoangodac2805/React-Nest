import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

interface Props extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  confirmAction: () => void;
}

const DeleteSectionDialog = (props: Props) => {
  const handleConfirm = async () => {
    props.confirmAction();
    toast.success("Xóa phần thi thành công.");
    props.onOpenChange?.(false);
  };
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Xóa phần thi
          </AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ xóa phần thi khỏi hệ thống.
            Bạn có muốn tiếp tục không?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Quay lại</AlertDialogCancel>
          <Button onClick={handleConfirm}>
            Xóa
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSectionDialog;
