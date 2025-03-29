import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {User} from "../../../entities/user/model/type.ts";

type QueryArgUserRequest = Omit<User, 'photo'>
export const createUserApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  endpoints: (build) => ({
    createUser: build.mutation<any, QueryArgUserRequest>({
      query: ({gender, height, firstName, lastName, weight, residence}) => ({
        url: 'users/create',
        body: {
          firstName,
          lastName,
          weight,
          residence,
          height,
          gender
        }
      })
    }),
    // uploadTempPhoto: build.mutation<any, any>({
    //   query:()=>({
    //     url:'users/upload-temp-photo'
    //   })
    // })
  })
})