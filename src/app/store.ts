import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "@/features/loading";
import usersReducer from "@/features/users";
import drawerReducer from "@/features/drawer";
import authReducer from "@/features/auth";
import alertDialogReducer from "@/features/alertDialog";

import { userQuery } from "@/features/users/userQuery";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
    users: usersReducer,
    drawer: drawerReducer,
    alertDialog: alertDialogReducer,
    [userQuery.reducerPath]: userQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignoredActions: ["auth/loginByToken/rejected", "auth/login/rejected"],
      },
    }).concat(userQuery.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
