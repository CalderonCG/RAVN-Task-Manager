
import { RiAlarmLine, RiChat3Line, RiLink } from "react-icons/ri";
import Badge from "../Badge/Badge";
import { MdOutlineAccountTree } from "react-icons/md";
import Dropdown from "../Dropdown/Dropdown";


function Card() {
  return (
    <div className="w-full bg-background-secondary p-4 flex flex-col gap-4 rounded-lg">
      <div className="w-full flex items-center justify-between">
        <p className="text-lg">Slack</p>
        <Dropdown/>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="font-normal text-sm">1 Pts</p>
        <span className="flex items-center bg-accent  py-1 px-4 rounded-sm gap-2">
          <RiAlarmLine className="text-lg" />
          <p className="font-normal text-sm">YESTERDAY</p>
        </span>
      </div>
      <div className="flex gap-2 w-full">
        <Badge />
      </div>
      <div className="flex items-center w-full justify-between">
        <img src="/Avatar.png" alt="user" className="w-8 h-8" />

        <div className="flex items-center gap-4">
          <RiLink />
          <span className="flex gap-1 items-center">
            <p className="">5</p>
            <MdOutlineAccountTree className="text-lg" />
          </span>
          <span className="flex gap-1 items-center">
            <p className="">5</p>
            <RiChat3Line className="text-lg" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
