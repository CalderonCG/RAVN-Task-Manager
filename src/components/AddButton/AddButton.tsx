import { RiAddLine } from "react-icons/ri";

function AddButton() {
  return (
    <button
      className="py-1 px-6 w-1/2 rounded-lg items-center justify-center hidden  lg:bg-primary lg:hover:scale-105
          lg:flex lg:w-fit lg:p-2 "
    >
      <RiAddLine className="text-3xl text-font" />
    </button>
  );
}

export default AddButton;
