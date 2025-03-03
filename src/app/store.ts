import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "@/features/loading";
import usersReducer from "@/features/users";
import { userQuery } from "@/features/users/userQuery";
export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    users: usersReducer,
    [userQuery.reducerPath]:userQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userQuery.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
