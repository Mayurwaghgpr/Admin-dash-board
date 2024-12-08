import { TbEdit } from "react-icons/tb";
import { Btn } from './DeleteBtn'

function EditBtn({className,onClick}:Btn) {
  return (
            <button onClick={onClick} className={className}>
              <TbEdit/> <span className="sm:block hidden">Edit</span>
          </button>
  )
}

export default EditBtn