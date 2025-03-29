import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',

  }),
  endpoints: (build) => ({
    getAllUsers: build.query<any, void>({
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