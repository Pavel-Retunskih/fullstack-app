import {useGetAllUsersQuery} from "../api/usersApi.ts";

export function UsersList() {
  const {data, isSuccess} = useGetAllUsersQuery()

  console.log(data)
  return <div>
    <div>
      {isSuccess && data?.map((user: any) => (
          <div key={user.id} className={'flex '}>
            <ul>
              <li>{user.firstName}</li>
              <li>{user.lastName}</li>
              <li>{user.height}</li>
              <li>{user.weight}</li>
              <li>{user.residence}</li>
              <li>{user.gender}</li>
            </ul>
          </div>
      ))}
    </div>
  </div>
}