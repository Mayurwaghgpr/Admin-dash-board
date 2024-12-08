
import { NavLink } from 'react-router-dom'

function NaveBar() {

  return (
    <nav className='flex  w-full justify-center items-center border border-[#2e2d2d] gap-4 text-xl font-normal rounded-lg p-3 bg-[#1b1b1b]'>
      <NavLink className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold underline"
              : "text-gray-600 hover:text-blue-500"
          }  to={"/"} >Home</NavLink>
      <NavLink className={({ isActive }) =>
            `${isActive
              ? "text-blue-600 font-bold underline"
              : "text-gray-600 hover:text-blue-500"
          } transition-all duration-200`} to={"/user"} >UserList</NavLink>
      <NavLink className={({ isActive }) => 
        `${isActive
          ? "text-blue-600 font-bold underline"
          : "text-gray-600 hover:text-blue-500"
        } set-8 transition-all duration-200`
      }to={"/role"}>RoleList</NavLink>
    </nav>
  )
}

export default NaveBar