import { RiAlarmLine, RiChat3Line, RiLink } from "react-icons/ri";
import { MdOutlineAccountTree } from "react-icons/md";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Badge from "../../../components/Badge/Badge";
import { type GetTaskQuery } from "../../../generated/graphql";
import { colorMap, mapDate, numberMap } from "../../../utils/DataMapper";

type CardProps = {
  task: GetTaskQuery["tasks"][number];
};
function Card({ task }: CardProps) {
  //Date status
  const isActive = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  return (
    <div className="w-full bg-background-secondary p-4 flex flex-col gap-4 rounded-lg">
      <div className="w-full flex items-center justify-between">
        <p className="text-lg">{task.name}</p>
        <Dropdown />
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="font-normal text-sm">
          {numberMap[task.pointEstimate]} Pts
        </p>
        <span
          className={`flex items-center bg-accent  py-1 px-4 rounded-sm gap-2 ${!isActive(task.dueDate) ? "bg-primary/10 text-primary" : ""}`}
        >
          <RiAlarmLine className="text-lg" />
          <p className="font-normal text-sm ">{mapDate(task.dueDate)}</p>
        </span>
      </div>
      <div className="flex gap-2 w-full">
        {task.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} label={tag} variant={colorMap[tag]} />
        ))}
        {task.tags.length > 3 && (
          <span
            className="flex items-center justify-center gap-2 bg-modal-card-mobile/10 lg:bg-modal-card/10 py-2 px-2 rounded-sm cursor-default"
            title={task.tags.slice(3).toString()}
          >
            +{task.tags.length - 3}
          </span>
        )}
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
