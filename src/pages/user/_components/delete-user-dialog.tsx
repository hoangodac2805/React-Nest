import { AppDispatch } from "@/app/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteUserMutation } from "@/features/users/userQuery";
import { UserType } from "@/types";
import { Row } from "@tanstack/react-table";
import { Loader } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface Props extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  row?: Row<UserType>["original"];
}

const DeleteUserDialog = (props: Props) => {
  const [deleteUser, result] = useDeleteUserMutation();
  const handleConfirm = async () => {
    const res = await deleteUser(props.row?.id!);
    if (!res.error) {
      props.onOpenChange?.(false);
      toast.success("Xóa người dùng thành công.");
    }
  };
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Xóa người dùng {props.row?.userName}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ xóa người dùng {props.row?.userName} khỏi hệ thống.
            Bạn có muốn tiếp tục không?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Quay lại</AlertDialogCancel>
          <Button disabled={result.isLoading} onClick={handleConfirm}>
            {result.isLoading ? (
              <Loader className="animate-spin" aria-hidden="true" />
            ) : (
              "Xóa"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserDialog;
