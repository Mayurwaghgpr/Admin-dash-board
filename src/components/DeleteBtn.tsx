import React from 'react'
import { MdDeleteOutline } from 'react-icons/md'

export interface Btn{
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className: string,
}

function DeleteBtn({className,onClick}:Btn) {
    return (
        <button
              className={className}
              onClick={onClick}>
             <MdDeleteOutline color="#f73d3d" className=" hover:rotate-2" />
             <span className="sm:block hidden">Delete</span> 
        </button>
    )
}

export default DeleteBtn