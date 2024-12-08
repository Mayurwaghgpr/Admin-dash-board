
import { BsSave } from 'react-icons/bs'
import { Btn } from './DeleteBtn'

function SaveBtn({className,onClick}:Btn) {
  return (
 <button className={className} onClick={onClick}>
                  <BsSave size={"1rem"}/>
                </button>
  )
}

export default SaveBtn