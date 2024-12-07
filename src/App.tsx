import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UsersList from './pages/usersList'
import RolseList from './pages/RolseList'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Router, Routes } from 'react-router-dom'
import NaveBar from './components/NaveBar'
function App() {

  return (

    <main className="bg-[#0b0b0b] bg-[url('./assets/images/micro_carbon.png')] w-full overflow-auto text-slate-400 font-thin h-screen flex items-center flex-col ">
      <NaveBar/>
      <Routes>
        <Route path='/' element={<RolseList />} />
       
        <Route path='/user' element={<UsersList />} />
      </Routes>
      



      </main>
       
  )
}

export default App
