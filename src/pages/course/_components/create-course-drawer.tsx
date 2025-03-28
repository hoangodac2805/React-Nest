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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { DRAWER_NAME } from "@/config/drawer-name";
import { useState } from "react";
import { closeDrawer } from "@/features/drawer";
import CreateCouseForm from "./create-couse-form";

function CreateCourseDrawer() {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawer.drawers[DRAWER_NAME.CREATE_COURSE]
  );
  const dispatch: AppDispatch = useDispatch();
  const handleCloseDrawer = () => {
    setIsAlertOpen(true);
  };
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleCancleAlert = () => { };

  const handleConfirmAlert = () => {
    dispatch(closeDrawer(DRAWER_NAME.CREATE_COURSE));
  };

  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile ? (
        <Dialog open={isDrawerOpen} onOpenChange={handleCloseDrawer}>
          <DialogContent className="md:max-w-[625px] sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tạo khóa học mới</DialogTitle>
              <DialogDescription>
                Tạo khóa học mới ở đây, bấm Create khi bạn đã hoàn thành.
              </DialogDescription>
            </DialogHeader>
            <CreateCouseForm />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isDrawerOpen} onOpenChange={handleCloseDrawer}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Tạo khóa học mới</DrawerTitle>
              <DrawerDescription>
                Tạo khóa học mới ở đây, bấm Create khi bạn đã hoàn thành.
              </DrawerDescription>
            </DrawerHeader>
            <CreateCouseForm className="px-4" />
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

export default CreateCourseDrawer;
