import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

import { useIsMobile } from "@/hooks/use-mobile";
import CreateUserForm from "../form/create-user-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { DRAWER_NAME } from "@/config/drawer-name";
import { openAlertDialog } from "@/features/alertDialog";
import { ALERT_CONFIRM_ACTION } from "@/config";

function DialogDrawer() {
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawer.drawers[DRAWER_NAME.CREATE_USER]
  );
  const dispatch: AppDispatch = useDispatch();
  const handleCloseDrawer = () => {
    dispatch(
      openAlertDialog({
        title: "Are you sure?",
        message: "Your data will be lost. Are you sure you want to close?",
        confirmAction: ALERT_CONFIRM_ACTION.CLOSE_CREATE_USER_DRAWER,
      })
    );
  };
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={isDrawerOpen} onOpenChange={handleCloseDrawer}>
        <DialogContent className="md:max-w-[625px] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
            <DialogDescription>
              Create a new user here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <CreateUserForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleCloseDrawer}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create User</DrawerTitle>
          <DrawerDescription>
            Create a new user here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <CreateUserForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DialogDrawer;
