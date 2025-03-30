import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {User} from "../../../entities/user/model/type.ts";

export const usersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',

  }),
  endpoints: (build) => ({

    getUsers: build.query<{ data: User[]; count: number }, { page: number; limit: number }>({
      query: ({page, limit}) => `users?page=${page}&limit=${limit}`,
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg?.page !== previousArg?.page;
      },
    }),

    getUserById: build.query({
      query: (id: string) => ({
        url: `users/${id}`
      })
    })
  })
})

export const {useGetUsersQuery, useGetUserByIdQuery} = usersApi