import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import EditUserForm from "./update-course-form";
import { Row } from "@tanstack/react-table";
import { UserType } from "@/types";

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
  row?: Row<UserType>["original"];
}

function UpdateUserDrawer(props: Props) {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const handleCloseDrawer = () => {
    setIsAlertOpen(true);
  };
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleCancleAlert = () => {};

  const handleConfirmAlert = () => {
    props.onOpenChange?.(false);
  };

  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile ? (
        <Dialog {...props} onOpenChange={handleCloseDrawer}>
          <DialogContent className="md:max-w-[625px] sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thông tin người dùng</DialogTitle>
              <DialogDescription>Email : {props.row?.email}</DialogDescription>
            </DialogHeader>
            <EditUserForm userId={props.row?.id as number}/>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer {...props} onOpenChange={handleCloseDrawer}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Tạo người dùng mới</DrawerTitle>
              <DrawerDescription>
                Tạo người dùng mới ở đây, bấm Create khi bạn đã hoàn thành.
              </DrawerDescription>
            </DrawerHeader>
            <EditUserForm userId={props.row?.id as number}  className="px-4" />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
      {/* Alert Block */}
      <AlertDialog open={isAlertOpen} onOpenChange={handleCloseAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn sẽ mất dữ liệu nếu bấm kết thúc?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancleAlert}>
              Tiếp tục
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAlert}>
              Kết thúc
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default UpdateUserDrawer;
