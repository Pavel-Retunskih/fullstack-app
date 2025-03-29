import './App.css'
import {UsersList} from "./widgets/usersList/ui/UsersList.tsx";
import {CreateUserForm} from "./features/createUser/ui/CreateUserForm.tsx";

function App() {

  return (
      <div>
        <CreateUserForm/>
        <UsersList/>
      </div>
  )
}

export default App
