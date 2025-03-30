import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const uploadPhotoApi = createApi({
  reducerPath: 'uploadPhoto',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  endpoints: (build) => ({
    uploadTempPhoto: build.mutation<any, any>({
      query: (formData) => ({
        method: 'POST',
        url: 'users/upload-temp-photo',
        body: formData
      })
    })
  })
})

export const {useUploadTempPhotoMutation} = uploadPhotoApi