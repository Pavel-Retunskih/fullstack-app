import {configureStore} from "@reduxjs/toolkit";
import {appSlice} from "../slice/appSlice.ts";
import {usersApi} from "../../widgets/usersList/api/usersApi.ts";
import {createUserApi} from "../../features/createUser/api/createUserApi.ts";
import {uploadPhotoApi} from "../../features/uploadPhoto/api/uploadPhotoApi.ts";


export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [createUserApi.reducerPath]: createUserApi.reducer,
    [uploadPhotoApi.reducerPath]: uploadPhotoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(usersApi.middleware).concat(usersApi.middleware).concat(uploadPhotoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch