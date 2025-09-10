import { useState } from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { RiFunctionLine } from "react-icons/ri";

function TabSwitch() {
  const [isTask, setIsTask] = useState(false);
  return (
    <div
      className="bg-background-secondary w-4/5 text-sm text-font rounded-lg p-1 flex
    lg:flex-row-reverse lg:w-fit lg:bg-inherit  lg:gap-1
    "
    >
      <button
        onClick={() => setIsTask(false)}
        className={`py-1 px-6 w-1/2 rounded-lg flex items-center justify-center  
      lg:w-fit lg:p-2 lg:hover:text-primary ${!isTask ? "bg-accent-hover lg:text-primary lg:border-2 lg:bg-inherit" : ""}  `}
      >
        <RiFunctionLine className=" hidden lg:flex text-3xl" />
        <p className="flex lg:hidden">Dashboard</p>
      </button>
      <button
        onClick={() => setIsTask(true)}
        className={`py-1 px-6 w-1/2 rounded-lg  flex items-center justify-center 
      lg:w-fit lg:p-2 lg:hover:text-primary ${isTask ? "bg-accent-hover lg:text-primary lg:border-2 lg:bg-inherit" : ""} `}
      >
        <HiMiniBars3 className=" hidden lg:flex text-3xl" />
        <p className="flex lg:hidden">Task</p>
      </button>
    </div>
  );
}

export default TabSwitch;
