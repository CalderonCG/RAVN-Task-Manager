import { IoIosAddCircle } from "react-icons/io";
import { RiFunctionLine, RiLayoutTopLine } from "react-icons/ri";
import SideBarCard from "./SideBarCard/SideBarCard";
import { useTheme } from "../../utils/CustomHooks";

function SideBar() {
  const { theme } = useTheme(); //Toggle function from Theme Context

  return (
    <div
      className="flex w-full py-4 px-6 bg-background-secondary justify-between text-font-secondary
    lg:flex-col lg:justify-normal lg:items-center lg:w-1/6 lg:max-w-60 lg:rounded-3xl  lg:px-0  lg:uppercase"
    >
      {theme === "light" ? (
        <img
          src="/RavnDark.png"
          alt="Logo"
          className="w-10 hidden lg:flex mb-5"
        />
      ) : (
        <img src="/Ravn.png" alt="Logo" className="w-10 hidden lg:flex mb-5" />
      )}

      <SideBarCard label="Dashboard" route="/">
        <RiFunctionLine className="text-2xl" />
      </SideBarCard>

      <SideBarCard label="Add Project" route="/New" isDesktopHidden={true}>
        <IoIosAddCircle className="text-2xl" />
      </SideBarCard>

      <SideBarCard label="My task" route="/MyTasks">
        <RiLayoutTopLine className="text-2xl" />
      </SideBarCard>
    </div>
  );
}

export default SideBar;
