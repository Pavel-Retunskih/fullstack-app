import {User} from "../model/type.ts";
import {useRemoveUserMutation} from "../api/userApi.ts";

export function UserCard({user}: { user: User }) {
  const [removeUser] = useRemoveUserMutation()
  //const [updateUser] = useUpdateUserByIdMutation()
  return <div key={user.id} className={'flex flex-row items-center justify-between flex-wrap border border-amber-50' +
      ' px-5 py-2 rounded-md'}>
    <img src={user.photoUrl} alt="asdasd" className={'h-[200px] w-[200px] rounded-full'}/>
    <div className={'flex flex-col flex-grow flex-wrap gap-10'}>
      <h3 className={'w-full text-3xl text-gray-800 py-4'}>{user.firstName} {user.lastName}</h3>
      <div className={'flex flex-row flex-grow flex-wrap justify-around '}>
        <div>
          <div>
            <span>Пол: {user.gender === 'male' ? 'Мужской' : 'Женский'}</span>
          </div>
          <div>
            <h3>Рост и вес</h3>
            <span>Вес: {user.weight}</span>
            <span>Рост: {user.height}</span>
          </div>
        </div>
        <div>
          <h3>Место жительства</h3>
          <span>{user.residence}</span>
        </div>
      </div>
    </div>
    <button onClick={() => removeUser({id: user.id})}>Delete</button>
  </div>
}