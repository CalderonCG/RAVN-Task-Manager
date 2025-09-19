import { RiChat3Line } from "react-icons/ri";
import Badge from "../../components/Badge/Badge";
import { avatarGenerator } from "../../utils/AvatarGenerator";
import {
  colorMap,
  getDateStatus,
  mapDate,
  numberMap,
  tagMap,
} from "../../utils/DataMapper";
import type { GetTaskType } from "../../utils/TaskTypes";
import { MdOutlineAccountTree } from "react-icons/md";

//Types------------------------------
type CardProps = {
  task: GetTaskType;
};

function ListCard({ task }: CardProps) {
  return (
    <div
      className="w-full h-14 items-center font-normal text-font bg-background-secondary  border-1 border-background-modal
    grid grid-cols-20 py-0.5 "
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
      <div className="h-full w-full flex items-center col-span-3 px-2">
        <p
          className={`font-normal text-sm ${getDateStatus(task.dueDate, false)}`}
        >
          {mapDate(task.dueDate, false)}
        </p>
      </div>
    </div>
  );
}

export default ListCard;
