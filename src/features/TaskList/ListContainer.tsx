import { RiArrowDownSFill } from "react-icons/ri";
import ListCard from "./ListCard";

function ListContainer() {
  return (
    <div className="w-full">
      <div
        className="w-full h-14 items-center flex font-normal text-font bg-background-secondary px-4 gap-2 rounded-lg rounded-b-none border-1 border-background-modal
    "
      >
        <RiArrowDownSFill className="text-font-secondary  text-2xl" />
        <p className="font-semibold">
          To Do <a className="text-font-secondary">(05)</a>
        </p>
      </div>
      <ListCard />
    </div>
  );
}

export default ListContainer;
