import React, { useEffect, useRef, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { BiAddToQueue } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { v4 } from "uuid";
import { CiSaveDown1 } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
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
  const [isEdit, setEdit] = useState<number>()
  const [EditedUser, setEditedUser] = useState<User>();
  const inputRef = useRef<HTMLInputElement[]>([])
  
  const filteruser = (userId: any) => {
      setUsers(users.filter((user) => user.id !== userId)); 
           setnewUsers(pre=>pre.filter((user) => user.id !== userId)); 
  }
  useEffect(() => {
    axios.get<User[]>("http://localhost:3001/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

   const HandelEditUser = () => {
    if (!EditedUser) {
      return
      
    }
    axios.put<User>(`http://localhost:3001/users/${EditedUser?.id}`, EditedUser).then((response) => {
      console.log(response)
setUsers((prev) =>
      prev.map((role) => (role.id === response.data.id ? response.data : role))
    );
      setEdit(undefined)
      setEditedUser(undefined)
    });
  }

  const deleteUser = (id: number) => {
    axios.delete(`http://localhost:3001/users/${id}`).then(() => {
      filteruser(id)
    });
  };


  const addnewUser = (newuser: User) => {
    axios.post<User>("http://localhost:3001/users", newuser).then((response) => {
      filteruser(newuser.id)
         setUsers((prev)=>[...prev,response.data]);
       
    })
   
  }
  const handelAddUser = (newuser: User) => {
    setnewUsers((prev) => [...prev, newuser]);
  }
   const handelIsEdit = (userId: number) => {
      setEdit(userId)
    if (inputRef.current[userId]) {
      setTimeout(()=>inputRef.current[userId].focus(),0);
    }
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
          <td className="px-6  capitalize">{isEdit !== user.id ?
            <span>{user.role}</span> :
            <input ref={(el) => { if (el) inputRef.current[user.id] = el; }} onChange={(e) => setEditedUser((prev) => (prev ? {...prev,role: e.target.value}:{ id: user.id, name: user.name, role: e.target.value,email:user.email, status: 'Active' }))} className=' bg-inherit w-full  capitalize  outline-none' defaultValue={user.role} type="text" name="role" id="" />
          }</td>
          <td className="sm:text-lg text-xs  capitalize max-w-2 overflow-hidden mx-1 text-ellipsis">
            {isEdit !== user.id ? <span className=" overflow-hidden">{user.email}</span>:
              <input className=' bg-inherit w-full  capitalize  outline-none placeholder:text-sm placeholder:text-gray-500'  placeholder="add email..." onChange={(e) => setEditedUser((prev) => (prev ? {...prev,email: e.target.value}:{ id: user.id, name: user.name, role:user.role,email:e.target.value, status: 'Active' }))}  defaultValue={user.email} type="text" name="role" id="" />}</td>
          {isEdit !== user.id?<td className=" flex gap-3 px-2">
            <button
              className=" flex justify-center items-center gap-2  rounded-lg transition"
              onClick={() => deleteUser(user.id)}
                  >
             <MdDeleteOutline color="#f73d3d" className=" hover:rotate-2" />
             <span className="sm:block hidden">Delete</span> 
            </button>
            <button onClick={()=>handelIsEdit(user.id)} className=" flex justify-center items-center gap-2 rounded-lg transition">
              <TbEdit /> <span className="sm:block hidden">Edit</span>
            </button>
          </td> : <div className=' flex gap-3 px-2'>
            <button onClick={() => setEdit(undefined)} className='flex justify-center items-center gap-2'>
              <ImCancelCircle />
            </button>
            <button onClick={HandelEditUser} className='flex justify-center items-center'>
              <CiSaveDown1 />
            </button>
          </div>}
        </tr>
      ))}
          {newUsers.map((newUser) => <tr key={newUser.id} className='border-b animate-bottom-to-top border-gray-600 hover:bg-gray-200 hover:bg-opacity-30'>
            <td className='capitalize'>
              <input className=' placeholder:text-sm border bg-inherit outline-none ' name='name' onChange={(e) => newUser.name = e.target.value} placeholder="Add name" type="text" />
            </td>
            <td className=''>
              <input name='role' className=' border placeholder:text-sm bg-inherit outline-none ' onChange={(e) => newUser.role = e.target.value} placeholder="Add role" type="text" />
            </td>
            <td className='  capitalize'>
              <input className=' placeholder:text-sm border bg-inherit outline-none ' name='email' placeholder="Add Email..." onChange={(e) => newUser.email = e.target.value} type="email" />
            </td>
            <td className='flex gap-3 px-2 h-full items-center'>
              <div className='flex justify-center items-center gap-4 h-full'>
                <button className="" onClick={() => addnewUser(newUser)}>
                  <BiAddToQueue />
                </button>
                <button onClick={() => filteruser(newUser.id)}>
                  <FiDelete />
                </button>
              </div>
            </td>
          </tr>)}
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
