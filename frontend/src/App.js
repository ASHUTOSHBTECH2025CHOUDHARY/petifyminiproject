import React from 'react'
import {Route,Routes} from "react-router-dom"
import Login from './Components/Login'
import Signup from './Components/Signup'
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard'
import Myposts from './Components/Myposts'
import Singlepost from './Components/Singlepost'
import { Mysinglepost } from './Components/Mysinglepost'
const App = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='signup'element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/mypost' element={<Myposts/>}/>
          <Route path='/singlepost/:id' element={<Singlepost/>}/>
          <Route path='mysinglepost/:id' element={<Mysinglepost/>}/>
        </Routes>
    </div>
  )
}

export default App