import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { BiAddToQueue, BiSave } from 'react-icons/bi';
import { CiSaveDown1, CiSaveDown2 } from 'react-icons/ci';
import { FaDeleteLeft } from 'react-icons/fa6';
import { FcCancel } from 'react-icons/fc';
import { FiDelete } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';
import { ImCancelCircle } from 'react-icons/im';
import { MdDelete } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { v4 as uid4 } from 'uuid';
export interface Role {
  id: any;
  name: string; // Name of the role (e.g., Admin, Editor)
  permissions: string[]; // List of permissions associated with the role
}


function RolseList() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isEdit, setEdit] = useState<number>()
  const [newRoles, setNewRoles] = useState<Role[]>([]);
  const [EditedData, setEditedData] = useState<Role>();
  const inputRef =useRef<HTMLInputElement[]>([])

  useEffect(() => {
    axios.get<Role[]>("http://localhost:3001/roles").then((response) => {
      setRoles(response.data);
    });
  }, []);
  const EditRole = () => {
    if (!EditedData) {
      return
      
    }
    axios.put<Role>(`http://localhost:3001/roles/${EditedData?.id}`, EditedData).then((response) => {
      console.log(response)
setRoles((prev) =>
      prev.map((role) => (role.id === response.data.id ? response.data : role))
    );
      setEdit(undefined)
      setEditedData(undefined)
    });
  }
  const handelIsEdit = (rolId: number) => {
      setEdit(rolId)
    if (inputRef.current[rolId]) {
      setTimeout(()=>inputRef.current[rolId].focus(),0);
    }
  }
  const addnewRole = (role:Role)=> {
      axios.post<Role>("http://localhost:3001/roles", role).then((response) => {
      setRoles((prev) => [...prev, response.data]);
      setNewRoles((prev) => prev.filter((r) => r.id !== role.id));
    });
  }

  const handleAddRole = () => {
    const newRole: Role = { id: uid4(), name: "", permissions: [] };
    setNewRoles((prev) => [...prev, newRole]);
  };

  return (
    <div className='p-1 w-full  mx-auto flex flex-col items-center gap-6'>
      {/* <h1 className='text-4xl font-extrabold text-gray-500'>Roles</h1> */}
      <table className=' table w-full overflow-hidden rounded-b-md shadow-sm shadow-gray-600'>
        <thead className=''>
          <tr className=' border-y border-gray-600  animate-bottom-to-top text-gray-600 text-left uppercase text-sm'>
            <th className='px-6 py-3"'>Role</th>
            <th className=' px-6 py-3 w-fit'>Permissions</th>
            
          </tr>
        </thead>
        <tbody className='table-auto'>
          {roles.map((role,idx) => (
            <tr className=' border-b text-xl  animate-bottom-to-top border-gray-600 hover:bg-gray-200 hover:bg-opacity-30' key={role.id}>
              <td  className='px-6  capitalize min-w-1/2'>{role.name}</td>
              {<td className='px-6  capitalize min-w-1/2'>{!isEdit ? role.permissions.join(", ") : <input  ref={(el)=>{ if (el) inputRef.current[role.id] = el;} } onChange={(e) => setEditedData({ id: role.id, name: role.name, permissions: e.target.value.split(',') })} className=' bg-inherit w-full  capitalize  outline-none' defaultValue={role.permissions.join(", ")} type="text" name="" id="" />}</td>}
              <td className='px-6  text-lg capitalize min-w-1/2'>{isEdit!==role.id ?<button onClick={()=>{handelIsEdit(role.id)}} className=" w-full flex justify-center items-center gap-2 rounded-lg transition">
              <TbEdit /> <span className="sm:block hidden">Edit</span>
            </button>:<div className='flex gap-4 w-full justify-center items-center'><button onClick={() => setEdit(undefined)} className='flex justify-center items-center gap-2'> <ImCancelCircle/></button><button onClick={EditRole} className='flex justify-center items-center'><CiSaveDown1 /></button></div>}</td> 
            </tr>
          ))}
          {newRoles.map((newRole)=><tr key={newRole.id} className='border-b text-xl  animate-bottom-to-top border-gray-600 hover:bg-gray-200 hover:bg-opacity-30'><td className='px-6  capitalize sm:min-w-1/2'><input onChange={(e)=>newRole.name=e.target.value} defaultValue={newRole.name} className=' border bg-inherit h-6 outline-none p-1' name='name' type="text" /></td><td className='px-6  text-lg capitalize sm:min-w-1/2'><input onChange={(e)=>newRole.permissions=e.target.value.split(",")} defaultValue={newRole.permissions.join(",")} name='permissions' className=' border h-6 bg-inherit outline-none p-1' type="text" /></td> <td className='px-6  text-lg capitalize sm:min-w-1/2 justify-center'><div className='flex justify-center items-center gap-4'><button onClick={()=>addnewRole(newRole)}><BiAddToQueue/></button> <button> <FiDelete/> </button></div></td></tr>)}
        </tbody>
       
      </table>
       <div className="   text-xl flex justify-between items-center w-full">
            <button onClick={handleAddRole} className="transition-all duration-200 hover:text-slate-500 hover:text-opacity-30 px-4 py-2 " >AddRole+ </button>
          </div>    
    </div>
  );
}

export default RolseList