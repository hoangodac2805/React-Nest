import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrawerState {
  drawers: Record<string, boolean>;
}

const initialState: DrawerState = {
  drawers: {},
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state, action: PayloadAction<string>) => {
      state.drawers[action.payload] = true;
    },
    closeDrawer: (state, action: PayloadAction<string>) => {
      state.drawers[action.payload] = false;
    },
    toggleDrawer: (state, action: PayloadAction<string>) => {
      state.drawers[action.payload] = !state.drawers[action.payload];
    },
  },
});



export const { openDrawer, closeDrawer, toggleDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;