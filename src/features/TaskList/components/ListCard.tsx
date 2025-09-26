import { RiChat3Line, RiDeleteBin7Line, RiEdit2Line } from "react-icons/ri";
import {
  colorMap,
  getDateStatus,
  mapDate,
  numberMap,
  tagMap,
} from "../../../utils/DataMapper";
import type { GetTaskType } from "../../../utils/TaskTypes";
import { MdOutlineAccountTree } from "react-icons/md";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { Link } from "react-router";
import { useState } from "react";
import DeleteModal from "../../Dashboard/components/DeleteModal";
import AddModal from "../../AddTask/components/AddModal";
import Badge from "../../../components/Badge/Badge";
import { avatarGenerator } from "../../../utils/AvatarGenerator";

//Types------------------------------
type CardProps = {
  task: GetTaskType;
};

function ListCard({ task }: CardProps) {
  //States-------------------------------------
  const [showConfirm, setShowConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const encodedTask = encodeURIComponent(btoa(JSON.stringify(task))); //Encodes the task to send it to the edit page

  return (
    <div
      className={`w-full h-14 items-center font-normal text-font bg-background-secondary  border-1 border-background-modal
    grid grid-cols-20 py-0.5 ${isOpen && ""}`}
    >
      <div className="h-full w-full relative flex items-center justify-between px-4 border-r-2 border-background-modal col-span-8 gap-6 ">
        <div
          className={` w-1 h-full absolute left-0 ${getDateStatus(task.dueDate, true)} `}
        />
        <p>
          {task.position} {task.name}
        </p>
        <div className="flex items-center gap-4 ">
          <span className="flex gap-1 items-center">
            <p className="">5</p>
            <RiChat3Line className="text-lg" />
          </span>
          <span className="flex gap-1 items-center">
            <p className="">5</p>
            <MdOutlineAccountTree className="text-lg" />
          </span>
          <p>Details</p>
        </div>
      </div>
      <div className="h-full w-full flex items-center border-r-2 border-background-modal col-span-3 gap-1 px-1">
        {task.tags.slice(0, 1).map((tag) => (
          <Badge key={tag} label={tagMap[tag]} variant={colorMap[tag]} />
        ))}
        {task.tags.length > 1 && (
          <span
            className="flex items-center justify-center gap-2 bg-modal-card-mobile/10 lg:bg-modal-card/10 py-1 px-2 rounded-sm cursor-default"
            title={task.tags.slice(1).toString()}
          >
            +{task.tags.length - 1}
          </span>
        )}
      </div>
      <div className="h-full w-full flex items-center border-r-2 border-background-modal col-span-2 px-2">
        <p>{numberMap[task.pointEstimate]} points</p>
      </div>
      <div className="h-full w-full flex items-center border-r-2 border-background-modal col-span-4 px-2 gap-1">
        <img
          src={avatarGenerator(task.assignee?.id)}
          alt="user"
          title={task.assignee?.fullName}
          className="w-8 h-8 rounded-full"
        />
        <p title={task.assignee?.fullName}>
          {task.assignee?.fullName.slice(0, 12)}
          {task.assignee && task.assignee.fullName.length > 12
            ? "..."
            : ""}{" "}
        </p>
      </div>
      <div className="h-full w-full flex items-center justify-between col-span-3 px-2">
        <p
          className={`font-normal text-sm ${getDateStatus(task.dueDate, false)}`}
        >
          {mapDate(task.dueDate, false)}
        </p>
        <Dropdown setIsOpen={setIsOpen}>
          <button
            className="data-focus:bg-accent-hover hover:bg-accent p-2 flex items-center gap-2 cursor-pointer w-full"
            onClick={() => {
              setIsOpen(false);
              setShowConfirm(true);
            }}
          >
            <RiDeleteBin7Line className="text-lg" />
            <p>Delete</p>
          </button>
          <button
            className="data-focus:bg-accent-hover z-50 p-2 hover:bg-accent items-center gap-2 cursor-pointer w-full hidden lg:flex"
            onClick={() => {
              setIsOpen(false);
              setShowEdit(true);
            }}
          >
            <RiEdit2Line className="text-lg" />
            <p>Edit</p>
          </button>
          <Link
            to={`/edit/${encodedTask}s`}
            className="data-focus:bg-accent-hover p-2  items-center gap-2 cursor-pointer w-full flex lg:hidden"
          >
            <RiEdit2Line className="text-lg" />
            <p>Edit</p>
          </Link>
        </Dropdown>
      </div>
      <DeleteModal
        isOpen={showConfirm}
        setIsOpen={setShowConfirm}
        taskId={task.id}
        taskName={task.name}
      />
      {showEdit && (
        <AddModal
          isOpen={showEdit}
          setIsOpen={setShowEdit}
          type="edit"
          task={task}
        />
      )}
    </div>
  );
}

export default ListCard;
