import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import ListCard from "./ListCard";
import type { GetTaskType } from "../../utils/TaskTypes";
import { useState } from "react";

type ListProps = {
  type: { __typename: "__EnumValue"; name: string };
  tasks: GetTaskType[] | undefined;
};

function ListContainer({ type, tasks }: ListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sortedTask = tasks?.sort((a, b) => a.position - b.position);

  return (
    <div className="w-220 lg:w-full">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full h-14 items-center flex font-normal text-font bg-background-secondary px-4 gap-2 rounded-lg rounded-b-none border-1 border-background-modal
    "
      >
        {isOpen ? (
          <RiArrowUpSFill className="text-font-secondary  text-2xl" />
        ) : (
          <RiArrowDownSFill className="text-font-secondary  text-2xl" />
        )}
        <p className="font-semibold">
          {type.name} <a className="text-font-secondary">({tasks?.length})</a>
        </p>
      </div>
      <div
        className={`w-full  transition-all duration-200 overflow-auto ${isOpen ? "max-h-200" : "max-h-0"}
        [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-background
  [&::-webkit-scrollbar-thumb]:bg-accent`}
      >
        {tasks?.length === 0 ? (
          <div className="flex w-full justify-center font-bold text-font-secondary text-xl">
            <div
              className="w-full h-14 items-center flex font-normal text-font-secondary bg-background-secondary px-4 gap-2  border-1 border-background-modal
    "
            >
              <p>Empty</p>
            </div>
          </div>
        ) : (
          sortedTask?.map((task) => <ListCard task={task} key={task.id} />)
        )}
      </div>
    </div>
  );
}

export default ListContainer;
