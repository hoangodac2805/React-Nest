import { SliceStatus } from "@/enum";
import { UserType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    setUsers: (state, action: PayloadAction<{users:UserType[],status:SliceStatus}>) => {
      state.entities = action.payload.users;
      state.status = action.payload.status;
    },
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

export const {setUsers,resetSlice} = usersSlice.actions;
export default usersSlice.reducer;
