import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { CiSaveDown1 } from 'react-icons/ci';

import { ImCancelCircle } from 'react-icons/im';

import { v4 as uid4 } from 'uuid';
import CommonInput from '../../components/CommonInput';
import DeleteBtn from '../../components/DeleteBtn';
import EditBtn from '../../components/EditBtn';
import SaveBtn from '../../components/SaveBtn';
import CancelBtn from '../../components/CancelBtn';

export interface Role {
  id: any;
  name: string; // Name of the role (e.g., Admin, Editor)
  permissions: string[]; // List of permissions associated with the role
}

function RolesList() {
  const BaseRole:Role= {
      id: uid4(),
      name: "",
      permissions: [
     
      ]
    }
  const [roles, setRoles] = useState<Role[]>([]);
  const [isEdit, setEdit] = useState<number>();
  const [newRole, setNewRole] = useState<Role>(BaseRole);
  const[AddRole,setAddRole]=useState(false)
  const [EditedData, setEditedData] = useState<Role>();
  const inputRef = useRef<HTMLInputElement[]>([]);

  const filterRole = (roleId: number) => {
    setRoles((prev) => prev.filter((r) => r.id !== roleId))


  };

  useEffect(() => {
    axios.get<Role[]>('http://localhost:3001/roles').then((response) => {
      setRoles(response.data);
    });
  }, []);

  const editRole = () => {
    if (!EditedData) return;
    axios.put<Role>(`http://localhost:3001/roles/${EditedData?.id}`, EditedData).then((response) => {
      setRoles((prev) =>
        prev.map((role) => (role.id === response.data.id ? response.data : role))
      );
      setEdit(undefined);
      setEditedData(undefined);
    });
  };

  const handleEdit = (roleId: number) => {
    setEdit(roleId);
    if (inputRef.current[roleId]) {
      setTimeout(() => inputRef.current[roleId].focus(), 0);
    }
  };

  const addNewRole = (role: Role) => {
    axios.post<Role>('http://localhost:3001/roles', role).then((response) => {
      setRoles((prev) => [...prev, response.data]);
      filterRole(role.id);
    });
  };


  const deleteRole = (id:any) => {
    axios.delete(`http://localhost:3001/roles/${id}`).then(() => {
      filterRole(id);
    })
  }

  return (
<>
      <table className="table w-full min-w-full overflow-x-auto mb-5 mx-auto box-border rounded-b-md shadow-md">
        <thead>
          <tr className=" border-y border-gray-300 text-left uppercase text-sm">
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Permissions</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr
              className="border-b border-gray-300 hover:bg-gray-500 transition-all"
              key={role.id}
            >
              <td className="px-4 py-2 capitalize text-base">{role.name}</td>
              <td className="px-4 py-2 text-base">
                {isEdit !==role.id ? (
                  role.permissions.join(', ')
                ) : (
                  <input
                    ref={(el) => {
                      if (el) inputRef.current[role.id] = el;
                    }}
                    onChange={(e) =>
                      setEditedData({
                        id: role.id,
                        name: role.name,
                        permissions: e.target.value.split(','),
                      })
                    }
                    className="bg-gray-50 border rounded-md p-2 w-full outline-none"
                    defaultValue={role.permissions.join(', ')}
                    type="text"
                  />
                )}
              </td>
              <td className="px-4 py-2 flex gap-4 justify-center">
                {isEdit !== role.id ? (
                  <>
                    <DeleteBtn className='flex items-center gap-2 text-red-400' onClick={() => deleteRole(role.id)} />
                    <EditBtn className="flex items-center gap-2 text-blue-500 hover:underline" onClick={() => handleEdit(role.id)}/>
             </>
                  
                ) : (
                  <div className="flex gap-4">
                    <button
                      onClick={() => setEdit(undefined)}
                      className="text-red-500 hover:underline"
                    >
                      <ImCancelCircle />
                    </button>
                    <button
                      onClick={editRole}
                      className="text-green-500 hover:underline"
                    >
                      <CiSaveDown1 />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {
            AddRole &&
            <div onClick={() => setAddRole(false)} className="flex fixed  top-0 left-0 right-0 bottom-0 h-full">
            <div onClick={(e)=>e.stopPropagation()} className=" sm:w-1/3 w-full mx-2  h-1/4 justify-center items-center rounded-lg  sm:h-fit bg-[#292828] flex flex-col gap-5 sm:m-auto  p-3 ">
                <CommonInput
                  name="name"
                  className="  *:p-1  px-3 w-full  outline-none"
                  onChange={(e) => (newRole.name = e.target.value)}
                  type="text"
                  placeholder="Enter role name"
                />

     
                <CommonInput
                  name="permissions"
                  className=" *:p-1 w-full px-3 outline-none"
                  onChange={(e) => (newRole.permissions = e.target.value.split(','))}
                  type="text"
                  placeholder="Enter permissions"
                />

                  <div className="flex w-full justify-center  items-center gap-2 sm:gap-4">
                    <SaveBtn onClick={() => addNewRole(newRole)} className="text-green-500" />
                    <CancelBtn onClick={() => { setNewRole(BaseRole); setAddRole(false) }} className="text-red-500" />
              
              </div>
              </div>
              </div>
        }
        </tbody>
      </table>
      <button
        onClick={()=>setAddRole(true)}
        className="px-6 py-2 text-white rounded-md shadow-md "
      >
        Add Role +
      </button>
    </>
  );
}

export default RolesList;