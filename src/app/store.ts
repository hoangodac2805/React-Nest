import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "@/features/loading";
import usersReducer from "@/features/users";
import drawerReducer from "@/features/drawer";
import authReducer from "@/features/auth";
import alertDialogReducer from "@/features/alertDialog";

import { userQuery } from "@/features/users/userQuery";
import { courseQuery } from "@/features/courses/courseQuery";
import { lessonQuery } from "@/features/lessons/lessonQuery";
import { examQuery } from "@/features/exam/examQuery";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
    users: usersReducer,
    drawer: drawerReducer,
    alertDialog: alertDialogReducer,
    [userQuery.reducerPath]: userQuery.reducer,
    [courseQuery.reducerPath]: courseQuery.reducer,
    [lessonQuery.reducerPath]: lessonQuery.reducer,
    [examQuery.reducerPath]: examQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignoredActions: ["auth/loginByToken/rejected", "auth/login/rejected"],
      },
    }).concat(userQuery.middleware).concat(courseQuery.middleware).concat(lessonQuery.middleware).concat(examQuery.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
