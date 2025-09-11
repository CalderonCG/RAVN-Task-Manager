import { RiAlarmLine, RiChat3Line, RiLink } from "react-icons/ri";
import { MdOutlineAccountTree } from "react-icons/md";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Badge from "../../../components/Badge/Badge";
import type { GetTaskQuery } from "../../../generated/graphql";

type CardProps = {
  task: GetTaskQuery["tasks"][number];
};
function Card({ task }: CardProps) {
  //Data mappers-----------------------------------------
  //Estimate points
  const numberMap = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    FOUR: 4,
    EIGHT: 8,
  };
  //Tag color
  const colorMap = {
    ANDROID: "yellow",
    IOS: "green",
    NODE_JS: "blue",
    RAILS: "red",
    REACT: "purple",
  } as const;

  //Date value
  const mapDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (date1: Date, date2: Date) =>
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();

    if (isSameDay(date, today)) return "TODAY";
    if (isSameDay(date, yesterday)) return "YESTERDAY";

    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

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
        {task.tags.map((tag) => (
          <Badge key={tag} label={tag} variant={colorMap[tag]} />
        ))}
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
