import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {User} from "../../../entities/user/model/type.ts";

export const usersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',

  }),
  endpoints: (build) => ({
    getAllUsers: build.query<{ data: User[] }, void>({
      query: () => ({url: 'users'})
    }),
    getUserById: build.query({
      query: (id: string) => ({
        url: `users/${id}`
      })
    })
  })
})

export const {useGetAllUsersQuery, useGetUserByIdQuery} = usersApi