import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertDialogState {
  open: boolean;
  title: string;
  message: string;
  confirmAction?: string; // Store an action identifier instead of a function
  cancelAction?: string;
}

const initialState: AlertDialogState = {
  open: false,
  title: "",
  message: "",
  confirmAction: undefined,
  cancelAction: undefined,
};

const alertDialogSlice = createSlice({
  name: "alertDialog",
  initialState,
  reducers: {
    openAlertDialog: (
      state,
      action: PayloadAction<Omit<AlertDialogState, "open">>
    ) => {
      state.open = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.confirmAction = action.payload.confirmAction;
      state.cancelAction = action.payload.cancelAction;
    },
    closeAlertDialog: (state) => {
      state.open = false;
      state.title = "";
      state.message = "";
      state.confirmAction = undefined;
      state.cancelAction = undefined;
    },
  },
});

export const { openAlertDialog, closeAlertDialog } = alertDialogSlice.actions;
export default alertDialogSlice.reducer;
