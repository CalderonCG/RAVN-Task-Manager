import {
  RiAlarmLine,
  RiChat3Line,
  RiDeleteBin7Line,
  RiEdit2Line,
  RiLink,
} from "react-icons/ri";
import { MdOutlineAccountTree } from "react-icons/md";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Badge from "../../../components/Badge/Badge";
import {
  colorMap,
  getDateStatus,
  mapDate,
  numberMap,
  tagMap,
} from "../../../utils/DataMapper";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import AddModal from "../../AddTask/components/AddModal";
import type { GetTaskType } from "../../../utils/TaskTypes";
import { Link } from "react-router";
import { avatarGenerator } from "../../../utils/AvatarGenerator";
import { useDraggable } from "@dnd-kit/core";

type CardProps = {
  task: GetTaskType;
};
function Card({ task }: CardProps) {
  //States-----
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const encodedTask = encodeURIComponent(btoa(JSON.stringify(task)));

  //DnD setup---------------
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="w-full bg-background-secondary p-4 flex flex-col gap-4 rounded-lg"
    >
      <div className="w-full flex items-center justify-between">
        <p className="text-lg">{task.name}</p>
        <Dropdown>
          <button
            className="data-focus:bg-accent-hover hover:bg-accent p-2 flex items-center gap-2 cursor-pointer w-full"
            onClick={() => setShowConfirm(true)}
          >
            <RiDeleteBin7Line className="text-lg" />
            <p>Delete</p>
          </button>
          <button
            className="data-focus:bg-accent-hover p-2 hover:bg-accent items-center gap-2 cursor-pointer w-full hidden lg:flex"
            onClick={() => setShowEdit(true)}
          >
            <RiEdit2Line className="text-lg" />
            <p>Edit</p>
          </button>
          <Link
            to={`/edit/${encodedTask}`}
            className="data-focus:bg-accent-hover p-2  items-center gap-2 cursor-pointer w-full flex lg:hidden"
          >
            <RiEdit2Line className="text-lg" />
            <p>Edit</p>
          </Link>
        </Dropdown>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="font-normal text-sm">
          {numberMap[task.pointEstimate]} Pts
        </p>
        <span
          className={`flex items-center bg-accent  py-1 px-4 rounded-sm gap-2 ${getDateStatus(task.dueDate)}`}
        >
          <RiAlarmLine className="text-lg" />
          <p className="font-normal text-sm ">{mapDate(task.dueDate)}</p>
        </span>
      </div>
      <div className="flex gap-2 w-full">
        {task.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} label={tagMap[tag]} variant={colorMap[tag]} />
        ))}
        {task.tags.length > 2 && (
          <span
            className="flex items-center justify-center gap-2 bg-modal-card-mobile/10 lg:bg-modal-card/10 py-1 px-2 rounded-sm cursor-default"
            title={task.tags.slice(3).toString()}
          >
            +{task.tags.length - 3}
          </span>
        )}
      </div>
      <div className="flex items-center w-full justify-between">
        <img
          src={avatarGenerator(task.assignee?.id)}
          alt="user"
          title={task.assignee?.fullName}
          className="w-8 h-8 rounded-full"
        />

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

export default Card;
