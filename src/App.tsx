import { lazy, Suspense } from 'react';
import './App.css'
const UsersList = lazy(()=>import('./pages/Users/usersList'))
const RolseList = lazy(()=>import( './pages/Rolse/RolseList'))
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Router, Routes } from 'react-router-dom'
import NaveBar from './components/NaveBar'
import Home from './pages/Home'


function App() {

  return (

    <main className="bg-[#0b0b0b] bg-[url('./assets/images/micro_carbon.png')] w-full overflow-auto text-slate-400 font-thin h-screen flex items-center flex-col ">
      <NaveBar/>
      <Routes>
        <Suspense fallback={}>
        <Route path='/' element={<Home />} />

        <Route path='/role' element={<RolseList />} />
       
          <Route path='/user' element={<UsersList />} />
          </Suspense>
      </Routes>
      



      </main>
       
  )
}

export default App
