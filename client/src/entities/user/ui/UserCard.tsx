import {User} from "../model/type.ts";

export function UserCard(user: User) {

  return <div>
    <img className="user-img" src={user.photo} alt=""/>
    <ul>
      <li>{user.firstName}</li>
      <li>{user.lastName}</li>
      <li>{user.gender}</li>
      <li>{user.residence}</li>
      <li>{user.height}</li>
      <li>{user.weight}</li>
    </ul>
  </div>
}