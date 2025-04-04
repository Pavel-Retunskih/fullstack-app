import {useState} from "react";
import {UserCard} from "../../../entities/user/ui/UserCard.tsx";
import {User} from "../../../entities/user/model/type.ts";
import {useGetUsersQuery} from "../../../entities/user/api/userApi.ts";


export function UsersList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const {data, isSuccess, isFetching} = useGetUsersQuery({page, limit})
  return <div>
    <div className={'flex flex-col gap-4'}>
      {isSuccess && data.data.map((user: User) => (
          <UserCard key={user.id} user={user}/>
      ))}
    </div>
    {isSuccess && <div style={{marginTop: 20}}>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1 || isFetching}>
        Prev
      </button>

      {[...Array(Math.ceil(data.count / limit))].map((_, index) => (
          <button
              key={index + 1}
              onClick={() => setPage(index + 1)}
              disabled={page === index + 1}
              style={{margin: '0 5px', fontWeight: page === index + 1 ? 'bold' : 'normal'}}
          >
            {index + 1}
          </button>
      ))}

      <button onClick={() => setPage((prev) => Math.min(prev + 1, data.count))}
              disabled={page === Math.ceil(data.count / limit) || isFetching}>
        Next
      </button>
      <div>
        <select onChange={(e) => setLimit(+e.target.value)}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>

    }
  </div>
}