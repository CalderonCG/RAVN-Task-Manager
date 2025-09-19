import { useDroppable } from "@dnd-kit/core";
import { statusMap } from "../../../utils/DataMapper";
import type { GetTaskType, StatusType } from "../../../utils/TaskTypes";
import Card from "./Card";

//Types-----------------------
type ColumnProps = {
  type: { __typename: "__EnumValue"; name: string };
  tasks: GetTaskType[] | undefined;
};

function Column({ type, tasks }: ColumnProps) {
  //DnD setup
  const { setNodeRef } = useDroppable({
    id: type.name,
  });
  //Sorts the tasks with the position value
  const sortedTask = tasks?.sort((a, b) => a.position - b.position);

  return (
    <div
      key={type.name}
      className="w-11/12 flex flex-col shrink-0 gap-4
        lg:w-[calc(33.333%-1rem)] lg:max-w-100"
    >
      <h1 className="text-lg font-semibold">
        {statusMap[type.name as StatusType]} ({tasks?.length})
      </h1>
      <div
        ref={setNodeRef}
        className="w-full flex-1 overflow-y-auto shrink-0 flex flex-col gap-4 scroll-smooth 
                  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-background
  [&::-webkit-scrollbar-thumb]:bg-accent"
      >
        {tasks?.length === 0 ? (
          <div className="flex w-full justify-center font-bold text-font-secondary text-xl">
            <p>Empty</p>
          </div>
        ) : (
          sortedTask?.map((task) => <Card task={task} key={task.id} />)
        )}
      </div>
    </div>
  );
}

export default Column;
