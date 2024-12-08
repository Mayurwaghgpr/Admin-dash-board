import React from 'react'

interface Input{
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string,
    type: string,
    name: string,
    className?:string,
}

function CommonInput({onChange,placeholder,name,type="text" ,className ="capitalize",}:Input) {
  return (
    <td className={className}>
        <input className={' placeholder:text-xs w-full border bg-inherit outline-none'} name={name} onChange={onChange} placeholder={placeholder} type={type} />
    </td>
  )
}

export default CommonInput