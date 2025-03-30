import './App.css'

import {BrowserRouter, Route, Routes} from "react-router";
import {UsersPage} from "./pages/usersPage/ui/UsersPage.tsx";
import {CreateUserPage} from "./pages/creacteUser/ui/CreateUserPage.tsx";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UsersPage/>}/>
          <Route path={'/create-user/'} element={<CreateUserPage/>}/>
        </Routes>


      </BrowserRouter>


  )
}

export default App
