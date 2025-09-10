import { IoIosAddCircle } from "react-icons/io";
import { RiFunctionLine, RiLayoutTopLine } from "react-icons/ri";
import SideBarCard from "./SideBarCard/SideBarCard";

function SideBar() {
  return (
    <div
      className="flex w-full py-4 px-6 bg-background-secondary justify-between text-font-secondary
    lg:flex-col lg:justify-normal lg:items-center lg:w-1/6 lg:max-w-60 lg:rounded-3xl  lg:px-0  lg:uppercase"
    >
      <img src="/Ravn.png" alt="Logo" className="w-10 hidden lg:flex mb-5" />

      <SideBarCard label="Dashboard" route="/">
        <RiFunctionLine className="text-2xl" />
      </SideBarCard>

      <div
        className={`flex flex-col justify-center items-center cursor-pointer
    lg:flex-row lg:justify-start lg:w-full lg:p-4 lg:gap-4 hover:text-primary hover:bg-primary-hover lg:hover:border-r-4 border-primary   
    lg:hidden`}
      >
        <IoIosAddCircle className="text-2xl" />
        <p className="text-sm">Add task</p>
      </div>

      <SideBarCard label="My task" route="/MyTasks">
        <RiLayoutTopLine className="text-2xl" />
      </SideBarCard>
    </div>
  );
}

export default SideBar;
