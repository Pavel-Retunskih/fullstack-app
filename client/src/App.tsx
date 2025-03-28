import {useEffect} from 'react'

import './App.css'

function App() {

useEffect(() => {
  fetch('http://localhost:3000/app').then(res => res.json()).then(data => console.log(data))
},[])
  return (
    <>
      <div>

      </div>

    </>
  )
}

export default App
