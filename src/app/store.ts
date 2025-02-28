import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "@/features/loading";
import usersReducer from "@/features/users";
export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    users: usersReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
