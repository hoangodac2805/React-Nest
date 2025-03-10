import { AppDispatch, RootState } from "@/app/store";
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
import { ALERT_CONFIRM_ACTION } from "@/config";
import { DRAWER_NAME } from "@/config/drawer-name";
import { closeAlertDialog } from "@/features/alertDialog";
import { closeDrawer } from "@/features/drawer";
import { useDispatch, useSelector } from "react-redux";

function CommonAlertDialog() {
  const { open, title, message, confirmAction, cancelAction } = useSelector(
    (state: RootState) => state.alertDialog
  );
  const dispatch: AppDispatch = useDispatch();

  const handleConfirm = () => {
    if (confirmAction === ALERT_CONFIRM_ACTION.CLOSE_CREATE_USER_DRAWER) {
      dispatch(closeDrawer(DRAWER_NAME.CREATE_USER));
    }
  };

  const handleClose = () => {
    dispatch(closeAlertDialog());
  };

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CommonAlertDialog;
