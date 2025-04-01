import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {User} from "../model/type.ts";

type QueryArgUserRequest = Omit<User, 'photo' | 'id' | 'photoUrl'> & { tempPhotoId: string | null };

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    createUser: build.mutation<any, QueryArgUserRequest>({
      query: ({gender, height, firstName, lastName, weight, residence, tempPhotoId}) => ({
        url: `users/create?tempPhotoId=${tempPhotoId}`,
        method: 'POST',
        body: {
          firstName,
          lastName,
          weight,
          residence,
          height,
          gender
        }
      }),
      invalidatesTags: ['Users']
    }),
    removeUser: build.mutation<void, { id: string }>({
      query: ({id}) => ({
        method: 'DELETE',
        url: `users/delete/${id}`
      }),
      invalidatesTags: ['Users']
    }),
    getUsers: build.query<{ data: User[]; count: number }, { page: number; limit: number }>({
      query: ({page, limit}) => `users?page=${page}&limit=${limit}`,
      providesTags: ['Users']
    }),
    getUserById: build.query<User, { id: string }>({
      query: ({id}) => ({
        url: `users/${id}`
      })
    }),
    updateUserById: build.mutation<User, { id: string, updateUser: Partial<User> }>({
      query: ({id, updateUser}) => ({
        method: 'PATCH',
        url: `users/update/${id}`,
        body: {...updateUser}
      }),
      invalidatesTags: ['Users']
    })
  })
})

export const {
  useUpdateUserByIdMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useRemoveUserMutation,
  useCreateUserMutation
} = userApi