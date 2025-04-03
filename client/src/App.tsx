import './App.css'

import {BrowserRouter, Route, Routes} from "react-router";
import {UsersPage} from "./pages/usersPage/ui/UsersPage.tsx";
import {CreateUserPage} from "./pages/creacteUser/ui/CreateUserPage.tsx";
import {UserPage} from "./pages/userPage/UserPage.tsx";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UsersPage/>}/>
          <Route path={'/create-user/'} element={<CreateUserPage/>}/>
          <Route path={'users/:id'} element={<UserPage/>}/>
        </Routes>


      </BrowserRouter>


  )
}

export default App
