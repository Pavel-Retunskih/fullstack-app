import {configureStore} from "@reduxjs/toolkit";
import {uploadPhotoApi} from "../../features/uploadPhoto/api/uploadPhotoApi.ts";
import {userApi} from "../../entities/user/api/userApi.ts";

export const store = configureStore({
  reducer: {
    [uploadPhotoApi.reducerPath]: uploadPhotoApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
          uploadPhotoApi.middleware,
          userApi.middleware
      ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
