import { HiMiniBars3 } from "react-icons/hi2";
import { RiFunctionLine } from "react-icons/ri";

//Types-----------------------------------------------------
type SwitchProps = {
  value: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
};

function TabSwitch({ value, onClick }: SwitchProps) {
  return (
    <div
      className={`bg-background-secondary w-4/5 text-sm rounded-lg p-1 flex 
    lg:flex-row-reverse lg:w-fit lg:bg-inherit  lg:gap-1
    `}
    >
      <button
        onClick={() => onClick(false)}
        className={`py-1 px-6 w-1/2 rounded-lg flex items-center justify-center cursor-pointer
      lg:w-fit lg:p-2 lg:hover:text-primary ${!value ? "bg-accent-hover text-button lg:text-primary lg:border-2 lg:bg-inherit" : ""}  `}
      >
        <RiFunctionLine className=" hidden lg:flex text-3xl" />
        <p className="flex lg:hidden">Dashboard</p>
      </button>
      <button
        onClick={() => onClick(true)}
        className={`py-1 px-6 w-1/2 rounded-lg  flex items-center justify-center  cursor-pointer
      lg:w-fit lg:p-2 lg:hover:text-primary ${value ? "bg-accent-hover text-button lg:text-primary lg:border-2 lg:bg-inherit" : ""} `}
      >
        <HiMiniBars3 className=" hidden lg:flex text-3xl" />
        <p className="flex lg:hidden">Task</p>
      </button>
    </div>
  );
}

export default TabSwitch;
