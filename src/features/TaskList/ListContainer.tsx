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
      <ListCard
        task={{
          id: "b4a152d5-c946-431e-a921-1b466a5216fd",
          name: "Task disabled2",
          status: "BACKLOG",
          pointEstimate: "FOUR",
          dueDate: "2025-09-18T06:00:00.000Z",
          position: 13,
          assignee: {
            id: "a35d73eb-6829-4a92-ab82-43fe987ae02f",
            fullName: "Jhon Doeeeeee",
            avatar: "https://avatars.dicebear.com/api/initials/jd.svg",
            __typename: "User",
          },
          tags: ["NODE_JS", "IOS"],
          __typename: "Task",
        }}
      />
    </div>
  );
}

export default ListContainer;
