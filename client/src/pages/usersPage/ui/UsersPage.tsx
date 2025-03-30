import {useNavigate} from "react-router";
import {UsersList} from "../../../widgets/usersList/ui/UsersList.tsx";

export function UsersPage() {
  let navigate = useNavigate();
  return <div>
    <button onClick={() => navigate('/create-user')}>Create User</button>
    <UsersList/>
  </div>
}