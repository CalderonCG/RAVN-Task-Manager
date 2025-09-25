import { useForm } from "react-hook-form";
import type {
  CreateTaskMutation,
  CreateTaskMutationVariables,
  PointEstimate,
  Status,
  TaskTag,
  UpdateTaskInput,
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
  User,
} from "../../../generated/graphql";
import type { CreateTaskInputType, StatusType } from "../../../utils/TaskTypes";
import { useState } from "react";
import { CREATE_TASK, GET_TASK, UPDATE_TASK } from "../../../queries/TaskQuery";
import { client } from "../../../apolloClient";
import { useMutation } from "@apollo/client";

interface TaskFormData {
  taskName: string;
  selectedAssignee: User | undefined;
  selectedPoints: string | undefined;
  selectedDate: Date | null;
  selectedStatus: StatusType;
  tags: TaskTag[];
}

type HookTypes =
  | {
      type: "create";
      setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | {
      type: "edit";
      id: string;
      setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    };

export const useTaskForm = (props: HookTypes) => {
  const { type, setIsOpen } = props;
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  //Event handlers
  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsOpen(false);
      reset();
      client.refetchQueries({
        include: [GET_TASK],
      });
    }, 1000);
  };

  const handleError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError(null);
    }, 1000);
  };

  //ReactHook Form--------------------------------------------------
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    defaultValues: {
      taskName: "",
      selectedAssignee: undefined,
      selectedPoints: undefined,
      selectedDate: null,
      selectedStatus: "BACKLOG",
      tags: [],
    },
  });

  //Mutations--------------------------------------------------------------------------
  const [createTask] = useMutation<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >(CREATE_TASK, {
    onCompleted: () => {
      handleSuccess();
    },
  });
  const [updateTask] = useMutation<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >(UPDATE_TASK, {
    onCompleted: () => {
      handleSuccess();
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    //Disables to avoid multiple mutations
    setIsDisabled(true);

    //Creates the task to be added
    const baseTask: CreateTaskInputType = {
      assigneeId: data.selectedAssignee!.id,
      dueDate: data.selectedDate!.toISOString(),
      name: data.taskName,
      pointEstimate: data.selectedPoints! as PointEstimate,
      status: data.selectedStatus as Status,
      tags: data.tags,
    };

    try {
      //If there isnt a decoded task, then goes for the create mutation
      if (type === "create") {
        await createTask({ variables: { input: baseTask } });
      } else {
        //If type is edit task
        const updatedTask: UpdateTaskInput = { ...baseTask, id: props.id };
        await updateTask({ variables: { input: updatedTask } });
      }
    } catch (error) {
      if (error instanceof Error) handleError(error.message);
    }
  };

  return {
    showSuccess,
    error,
    isDisabled,
    setIsDisabled,
    handleSuccess,
    control,
    handleSubmit,
    reset,
    errors,
    onSubmit,
  };
};
