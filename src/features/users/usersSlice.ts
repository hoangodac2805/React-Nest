import { SliceStatus } from "@/enum";
import { UserType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "@/features/users";

export interface UsersState {
  entities: UserType[];
  status: SliceStatus;
  error: any | null;
}

const initialState: UsersState = {
  entities: [],
  status: SliceStatus.IDLE,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetSlice: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = SliceStatus.LOADING;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = SliceStatus.SUCCEEDED;
      state.entities = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = SliceStatus.FAILED;
      state.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;
