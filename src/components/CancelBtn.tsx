
import { MdOutlineCancel } from "react-icons/md";
import { Btn } from "./DeleteBtn";


function CancelBtn({className,onClick}:Btn) {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      <MdOutlineCancel size={"1.5rem"} />
    </button>
  );
}

export default CancelBtn;
