import { HiMiniBars3 } from "react-icons/hi2";
import { RiFunctionLine } from "react-icons/ri";

function TabSwitch() {
  return (
    <div
      className="bg-background-secondary w-4/5 text-sm text-font rounded-lg p-1 flex
    lg:flex-row-reverse lg:w-fit lg:bg-inherit
    "
    >
      <button className="py-1 px-6 w-1/2 rounded-lg bg-secondary flex items-center justify-center 
      lg:w-fit lg:text-primary lg:border-2 lg:bg-inherit lg:p-2">
        <RiFunctionLine className=" hidden lg:flex text-3xl" />
        <p className="flex lg:hidden">Dashboard</p>
      </button>
      <button className="py-1 px-6 w-1/2 rounded-lg  flex items-center justify-center lg:w-fit">
        <HiMiniBars3 className=" hidden lg:flex text-3xl" />
        <p className="flex lg:hidden">Task</p>
      </button>
    </div>
  );
}

export default TabSwitch;
