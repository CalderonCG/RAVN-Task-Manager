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
import { avatarGenerator } from "../../../utils/AvatarGenerator";
import { useDraggable } from "@dnd-kit/core";
import { useMediaQuery } from "../../../utils/CustomHooks";

//Types------------------------------
type TaskCardProps = {
  task: GetTaskType;
  variant?: "card" | "list";
};

function Card({ task, variant = "card" }: TaskCardProps) {
  //States-------------------------------------
  const [showConfirm, setShowConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  //DnD setup for card
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id,
    data: {
      status: task.status,
      name: task.name,
      assignee: task.assignee,
      dueDate: task.dueDate,
      pointEstimate: task.pointEstimate,
      tags: task.tags,
    },
  });

  const dragDisabled =
    showConfirm || showEdit || isOpen || !isDesktop || variant === "list";

  // Dropdown
  const dropdownContent = (
    <>
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
        className="data-focus:bg-accent-hover z-50 p-2 hover:bg-accent items-center gap-2 cursor-pointer w-full flex"
        onClick={() => {
          setIsOpen(false);
          setShowEdit(true);
        }}
      >
        <RiEdit2Line className="text-lg" />
        <p>Edit</p>
      </button>
    </>
  );

  // Card
  if (variant === "card") {
    return (
      <div
        ref={dragDisabled ? null : setNodeRef}
        {...(!dragDisabled ? listeners : undefined)}
        {...(!dragDisabled ? attributes : undefined)}
        className="w-full bg-background-secondary p-4 flex flex-col gap-4 rounded-lg"
      >
        <div className="w-full flex items-center justify-between">
          <p className="text-lg">{task.name}</p>
          <Dropdown setIsOpen={setIsOpen}>{dropdownContent}</Dropdown>
        </div>

        <div className="w-full flex items-center justify-between">
          <p className="font-normal text-sm">
            {numberMap[task.pointEstimate]} Pts
          </p>
          <span
            className={`flex items-center bg-accent  py-1 px-4 rounded-sm gap-2 ${getDateStatus(task.dueDate, true)}/10`}
          >
            <RiAlarmLine className="text-lg" />
            <p className="font-normal text-sm ">
              {mapDate(task.dueDate, true)}
            </p>
          </span>
        </div>

        <div className="flex gap-2 w-full">
          {task.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant={colorMap[tag]}>
              {tagMap[tag]}
            </Badge>
          ))}
          {task.tags.length > 2 && (
            <span
              className="flex items-center justify-center gap-2 bg-modal-card-mobile/10 lg:bg-modal-card/10 py-1 px-2 rounded-sm cursor-default"
              title={task.tags.slice(2).toString()}
            >
              +{task.tags.length - 2}
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

  // List
  return (
    <div className="  w-full h-14 items-center font-normal text-font bg-background-secondary border-1 border-background-modal grid grid-cols-20 py-0.5">
      <div className="h-full w-full relative flex items-center justify-between px-4 border-r-2 border-background-modal col-span-8 gap-6">
        <div
          className={`w-1 h-full absolute left-0 ${getDateStatus(task.dueDate, true)}`}
        />
        <p>
          {task.position} {task.name}
        </p>
        <div className="flex items-center gap-4">
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
          <Badge key={tag} variant={colorMap[tag]}>
            {tagMap[tag]}
          </Badge>
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
          {task.assignee && task.assignee.fullName.length > 12 ? "..." : ""}
        </p>
      </div>

      <div className="h-full w-full flex items-center justify-between col-span-3 px-2">
        <p
          className={`font-normal text-sm ${getDateStatus(task.dueDate, false)}`}
        >
          {mapDate(task.dueDate, false)}
        </p>
        <Dropdown setIsOpen={setIsOpen}>{dropdownContent}</Dropdown>
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
