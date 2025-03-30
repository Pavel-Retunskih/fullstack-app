import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {User} from "../../../entities/user/model/type.ts";

type QueryArgUserRequest = Omit<User, 'photo'> & { tempPhotoId: string | null };
export const createUserApi = createApi({
  reducerPath: 'createUserApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  endpoints: (build) => ({
    createUser: build.mutation<any, QueryArgUserRequest>({
      query: ({gender, height, firstName, lastName, weight, residence, tempPhotoId}) => ({
        url: 'users/create',
        method: 'POST',
        body: {
          firstName,
          lastName,
          weight,
          residence,
          height,
          gender,
          tempPhotoId
        }
      })
    }),
  })
})

export const {useCreateUserMutation} = createUserApi