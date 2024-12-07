import React from 'react'
import { Link } from 'react-router-dom'

function NaveBar() {
  return (
      <nav className='flex  w-full justify-center items-center border border-[#2e2d2d] gap-4 text-xl font-normal rounded-lg p-3 bg-[#1b1b1b]'><Link className='hover:underline hover:underline-offset-8 transition-all duration-200' to={"/user"} >UserList</Link><Link className='hover:underline hover:underline-offset-8 transition-all duration-200' to={"/"}>RoleList</Link></nav>
  )
}

export default NaveBar