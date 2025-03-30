import {useGetUsersQuery} from "../api/usersApi.ts";
import {useState} from "react";

export function UsersList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const {data, isSuccess, isFetching} = useGetUsersQuery({page, limit})

  console.log(data)
  return <div>
    <div>
      {isSuccess && data.data.map((user: any) => (
          <div key={user.id} className={'flex flex-row items-center justify-between flex-wrap'}>
            <img src={user.photoUrl} alt="asdasd" className={'h-[200px] w-[200px]'}/>
            <div className={'flex flex-grow flex-wrap'}>
              <div>
                <h3>Имя и фамилия</h3>
                <span>{user.firstName}</span>
                <span>{user.lastName}</span>
              </div>
              <div>
                <h3>Пол</h3>
                <span>{user.gender}</span>
              </div>
              <div>
                <h3>Рост и вес</h3>
                <span>Вес: {user.weight}</span>
                <span>Рост: {user.height}</span>
              </div>
              <div>
                <h3>Место жительства</h3>
                <span>{user.residence}</span>
              </div>
            </div>

          </div>
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
              disabled={page === data.count / limit || isFetching}
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