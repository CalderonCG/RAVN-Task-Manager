import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import type { GetTaskType } from "../../../utils/TaskTypes";
import type {
  GetTaskQuery,
  Status,
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from "../../../generated/graphql";
import type { MutationFunction } from "@apollo/client";

type UpdateTaskFunction = MutationFunction<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>;

export const useDragNDrop = (
  updateTask: UpdateTaskFunction,
  data?: GetTaskQuery,
) => {
  const [activeTask, setActiveTask] = useState<GetTaskType | null>(null); //Stores the dragged task
  //Drag start function-----------
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const task = data?.tasks?.find((task) => task.id === active.id) || null;

    setActiveTask(task);
  }

  //Drag end function------------------
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id as string;
    const newStatus = over.id as Status;
    const currentStatus = active.data.current?.status as Status;

    if (newStatus !== currentStatus) {
      //Calls the mutation from the query
      updateTask({
        variables: {
          input: {
            id: taskId,
            status: newStatus,
          },
        },
        //Optimistically mutates the cache with the same update
        optimisticResponse: {
          __typename: "Mutation",
          updateTask: {
            __typename: "Task",
            id: taskId,
            status: newStatus,
            name: active.data.current?.name || "",
            assignee: active.data.current?.assignee || null,
            dueDate: active.data.current?.dueDate || "",
            pointEstimate: active.data.current?.pointEstimate || "ZERO",
            tags: active.data.current?.tags || [],
          },
        },
      });
    }

    // Cleans the active task
    setActiveTask(null);
  }

  return {
    activeTask,
    handleDragEnd,
    handleDragStart,
  };
};
