import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { BiAddToQueue } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { v4 } from "uuid";
export interface User {
  id: any;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer"|any;
  status: "Active" | "Inactive";
}

function UsersList() {
  const [users, setUsers] = useState<User[]>([]); // Specify the type explicitly
  const[newUsers,setnewUsers]= useState<User[]>([])

  useEffect(() => {
    axios.get<User[]>("http://localhost:3001/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const deleteUser = (id: number) => {
    axios.delete(`http://localhost:3001/users/${id}`).then(() => {
      setUsers(users.filter((user) => user.id !== id)); // TypeScript infers 'user' as User
    });
  };
  const addnewUser = (user:User) => {
    
  }
  const handelAddUser = (user:User) => {
  
}
  return (
   <div className="w-full mx-auto mt-1 flex flex-col items-center gap-6">
  {/* <h1 className="sm:text-4xl text-xl font-extrabold text-gray-500">Users</h1> */}
  <table className="table  w-full  overflow-hidden rounded-lg shadow-sm sm:text-xl text-sm  shadow-gray-600">
    <thead>
      <tr className=" border-y border-gray-600 animate-bottom-to-top text-gray-600 text-left uppercase ">
        <th className="px-6 ">Name</th>
            <th className="px-6 ">Role</th>
                <th className="px-6">Email</th>
            <th className=" ">Actions</th>
        
      </tr>
    </thead>
    <tbody className="  ">
      {users.map((user) => (
        <tr key={user.id} className="last:border-none border-b  animate-bottom-to-top border-gray-600 hover:bg-gray-200 hover:bg-opacity-30">
          <td className="pl-4 ">{user.name}</td>
          <td className="px-6  capitalize">{user.role}</td>
           <td className="sm:text-lg text-xs  capitalize max-w-2 overflow-hidden mx-1 text-ellipsis"><span className=" overflow-hidden">{user.email}</span></td>
          <td className=" flex gap-3 px-2">
            <button
              className=" flex justify-center items-center gap-2  rounded-lg transition"
              onClick={() => deleteUser(user.id)}
                  >
             <MdDeleteOutline color="#f73d3d" className=" hover:rotate-2" />
             <span className="sm:block hidden">Delete</span> 
            </button>
            <button className=" flex justify-center items-center gap-2 rounded-lg transition">
              <TbEdit /> <span className="sm:block hidden">Edit</span>
            </button>
              </td>   
        </tr>
      ))}
             {newUsers.map((newUser)=><tr key={newUser.id} className='border-b text-xl  animate-bottom-to-top border-gray-600 hover:bg-gray-200 hover:bg-opacity-30'><td className='px-6  capitalize sm:min-w-1/2'><input onChange={(e)=>newUser.name=e.target.value} defaultValue={newUser.name} className=' border bg-inherit h-6 outline-none p-1' name='name' type="text" /></td><td className='px-6  text-lg capitalize sm:min-w-1/2'><input onChange={(e)=>newUser.role = e.target.value} defaultValue={newUser.role} name='role' className=' border h-6 bg-inherit outline-none p-1' type="text" /></td> <td className='px-6  text-lg capitalize sm:min-w-1/2 justify-center'><div className='flex justify-center items-center gap-4'><button onClick={()=>addnewUser(newUser)}><BiAddToQueue/></button><button><FiDelete/> </button></div></td></tr>)}
    </tbody>
      </table>
    <div className=" w-full flex justify-start items-center text-xl"><button  onClick={()=>handelAddUser({
      id: v4(), name: '', role: '', status: 'Active',
      email: ""
    })}  className="transition-all duration-200 hover:text-slate-500 hover:text-opacity-30 px-4 py-2 " >AddUser+ </button></div>
</div>

  );
}

export default UsersList;
