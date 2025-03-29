import {configureStore} from "@reduxjs/toolkit";
import {appSlice} from "../slice/appSlice.ts";
import {usersApi} from "../../widgets/usersList/api/usersApi.ts";


export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch