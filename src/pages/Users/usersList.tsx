import{ useEffect, useRef, useState } from "react";
import axios from "axios"; // Ensure axios is imported

import { v4 } from "uuid";

import EditBtn from "../../components/EditBtn";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import CommonInput from "../../components/CommonInput";
import CancelBtn from "../../components/CancelBtn";
export interface User {
  id: any;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer"|any;
  status: "Active" | "Inactive";
}

function UsersList() {
  const BaseData:User={
              id: v4(),
              name: '',
              role: '',
              status: 'Active',
              email: '',
            }
  const [users, setUsers] = useState<User[]>([]); // Specify the type explicitly
  const[newUser,setnewUsers]= useState<User>(BaseData)
  const [isEdit, setEdit] = useState<number>()
  const [EditedUser, setEditedUser] = useState<User>();
  const [AddUser, setAddUser] = useState(false);
  const inputRef = useRef<HTMLInputElement[]>([])
  
  const filteruser = (userId: any) => {
      setUsers(users.filter((user) => user.id !== userId)); 

  }
  useEffect(() => {
    axios.get<User[]>(`${import.meta.env.BASE_URL}/users`).then((response) => {
      setUsers(response.data);
    });
  }, []);

   const HandelEditUser = () => {
    if (!EditedUser) {
      return
      
    }
    axios.put<User>(`${import.meta.env.BASE_URL}/users/${EditedUser?.id}`, EditedUser).then((response) => {
      console.log(response)
setUsers((prev) =>
      prev.map((role) => (role.id === response.data.id ? response.data : role))
    );
      setEdit(undefined)
      setEditedUser(undefined)
    });
  }

  const deleteUser = (id: number) => {
    axios.delete(`${import.meta.env.BASE_URL}/users/${id}`).then(() => {
      filteruser(id)
    });
  };


  const addnewUser = (newuser: User) => {
    axios.post<User>(`${import.meta.env.BASE_URL}/users`, newuser).then((response) => {
            setUsers((prev)=>[...prev,response.data]);
      setnewUsers(BaseData)
      setAddUser(false)

       
    })
   
  }
   const handelIsEdit = (userId: number) => {
      setEdit(userId)
    if (inputRef.current[userId]) {
      setTimeout(()=>inputRef.current[userId].focus(),0);
    }
  }
  return (
    <div className="w-full mx-auto mt-4 flex flex-col items-center gap-6 px-2 sm:px-6">
      <table className="table-auto w-full overflow-x-auto rounded-lg shadow-sm text-sm sm:text-lg shadow-gray-600">
        <thead>
          <tr className="border-y border-gray-300 text-gray-600 text-left uppercase">
            <th className="px-2 sm:px-6 py-2">Name</th>
            <th className="px-2 sm:px-6 py-2">Role</th>
            <th className="px-2 sm:px-6 py-2">Email</th>
            <th className="px-2 sm:px-6 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-300 hover:bg-gray-500 transition-all"
            >
              <td className="pl-2 sm:pl-4">{user.name}</td>
              <td className="px-2 sm:px-6 capitalize">
                {isEdit !== user.id ? (
                  <span>{user.role}</span>
                ) : (
                  <input
                    ref={(el) => {
                      if (el) inputRef.current[user.id] = el;
                    }}
                    onChange={(e) =>
                      setEditedUser((prev) =>
                        prev
                          ? { ...prev, role: e.target.value }
                          : {
                              id: user.id,
                              name: user.name,
                              role: e.target.value,
                              email: user.email,
                              status: 'Active',
                            }
                      )
                    }
                    className="bg-inherit w-full capitalize outline-none text-sm sm:text-base"
                    defaultValue={user.role}
                    type="text"
                    name="role"
                  />
                )}
              </td>
              <td className="text-xs sm:text-base capitalize overflow-hidden mx-1 text-ellipsis">
                {isEdit !== user.id ? (
                  <span className="overflow-hidden">{user.email}</span>
                ) : (
                  <input
                    className="bg-inherit w-full capitalize outline-none text-xs sm:text-base placeholder:text-sm placeholder:text-gray-500"
                    placeholder="Add email..."
                    onChange={(e) =>
                      setEditedUser((prev) =>
                        prev
                          ? { ...prev, email: e.target.value }
                          : {
                              id: user.id,
                              name: user.name,
                              role: user.role,
                              email: e.target.value,
                              status: 'Active',
                            }
                      )
                    }
                    defaultValue={user.email}
                    type="text"
                    name="email"
                  />
                )}
              </td>
              {isEdit !== user.id ? (
                <td className="flex gap-2 sm:gap-3 px-2 items-center">
                  <DeleteBtn
                    className="flex justify-center items-center gap-2 rounded-lg"
                    onClick={() => deleteUser(user.id)}
                  />
                  <EditBtn
                    className="flex justify-center items-center gap-2 rounded-lg"
                    onClick={() => handelIsEdit(user.id)}
                  />
                </td>
              ) : (
                <div className="flex gap-2 sm:gap-3 px-2 items-center">
                    <CancelBtn onClick={() => setEdit(undefined)} className={ "flex justify-center items-center gap-2"} />
                  <SaveBtn
                    className="flex justify-center items-center"
                    onClick={HandelEditUser}
                  />
                </div>
              )}
            </tr>
          ))}
          {AddUser &&
            <div onClick={()=>setAddUser(false)} className="flex fixed   top-0 left-0 right-0 bottom-0 h-full">
            <div onClick={(e)=>e.stopPropagation()} className=" sm:w-1/2 rounded-lg  h-fit bg-[#292828] flex flex-col gap-2 m-auto  p-3 ">
              <CommonInput
                name="name"
                onChange={(e) => (newUser.name = e.target.value)}
                placeholder="Add name"
                type="name"
                className="*:p-1 px-3  outline-none *:rounded-sm"
              />
              <CommonInput
                name="role"
                onChange={(e) => (newUser.role = e.target.value)}
                placeholder="Add role"
                type="text"
                className="*:p-1 px-3 outline-none *:rounded-sm"
              />
              <CommonInput
                name="email"
                onChange={(e) => (newUser.email = e.target.value)}
                placeholder="Add Email..."
                type="email"
                className="*:p-1 px-3 outline-none *:rounded-sm"
              />
                <div className="flex justify-center items-center gap-5 sm:gap-4">
                  <SaveBtn className="text-green-500" onClick={() => addnewUser(newUser)} />
                  <CancelBtn onClick={() => { setnewUsers(BaseData); setAddUser(false)}} className="text-red-500" />
                </div>
</div>
            </div>
         }
        </tbody>
      </table>
      <div className="w-full flex justify-center items-center text-sm sm:text-lg">
        <button
          onClick={() =>setAddUser(true)}
          className="transition-all duration-200 hover:text-slate-500 hover:text-opacity-80 px-4 py-2 shadow-md"
        >
          Add User+
        </button>
      </div>
    </div>
  );
}

export default UsersList;
