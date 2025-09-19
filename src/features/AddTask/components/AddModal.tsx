import { Dialog, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import AssigneeDropdown from "./AssigneeDropdown";
import PointsDropdown from "./PointsDropdown";
import TagDropdown from "./TagDropdown";
import "react-datepicker/dist/react-datepicker.css";
import DateButton from "./DateButton";
import Button from "../../../components/Button/Button";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_TASK,
  GET_POINTS,
  GET_STATUS,
  GET_TAGS,
  GET_TASK,
  GET_USERS,
  UPDATE_TASK,
} from "../../../queries/TaskQuery";
import type {
  GetPointsQuery,
  GetStatusQuery,
  GetTagsQuery,
  GetUsersQuery,
  TaskTag,
} from "../../../generated/graphql";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import type {
  GetTaskType,
  StatusType,
  TaskType,
  User,
} from "../../../utils/TaskTypes";
import StatusDropdown from "./StatusDropdown";
import { client } from "../../../apolloClient";
import { tagsReducer } from "../../../utils/Reducer";
import { useForm, Controller } from "react-hook-form";

//Types------------
type ModalProps =
  | {
      isOpen: boolean;
      type: "create";
      setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | {
      isOpen: boolean;
      type: "edit";
      task: GetTaskType;
      setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    };

//Form interface
interface TaskFormData {
  taskName: string;
  selectedAssignee: User | undefined;
  selectedPoints: string | undefined;
  selectedDate: Date | null;
  selectedStatus: StatusType;
  tags: TaskTag[];
}

function AddModal(props: ModalProps) {
  const { isOpen, type, setIsOpen } = props;

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
  //Queries---------------------------------------------------------------------------------
  //Queries to map the dropdown options
  const { data: dataTags, loading: loadingTags } =
    useQuery<GetTagsQuery>(GET_TAGS);
  const { data: dataPoints, loading: loadingPoints } =
    useQuery<GetPointsQuery>(GET_POINTS);
  const { data: dataUsers, loading: loadingUsers } =
    useQuery<GetUsersQuery>(GET_USERS);
  const { data: dataStatus, loading: loadingStatus } =
    useQuery<GetStatusQuery>(GET_STATUS);
  //Mutations--------------------------------------------------------------------------
  const [createTask] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      handleSuccess();
    },
  });
  const [updateTask] = useMutation(UPDATE_TASK, {
    onCompleted: () => {
      handleSuccess();
    },
  });

  //Selected states
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

  const onSubmit = async (data: TaskFormData) => {
    //Checks if any field is empty
    if (!data.selectedAssignee || !data.selectedDate || !data.selectedPoints) {
      return;
    }
    //Disables to avoid multiple mutations
    setIsDisabled(true);
    //Creates the task to be added
    const baseTask: TaskType = {
      assigneeId: data.selectedAssignee!.id,
      dueDate: data.selectedDate!.toISOString(),
      name: data.taskName,
      pointEstimate: data.selectedPoints!,
      status: data.selectedStatus,
      tags: data.tags,
    };

    //If there is a decoded tasks, then sets that task id in the query parameters
    const addedTask =
      type === "edit" ? { ...baseTask, id: props.task.id } : baseTask;

    try {
      //If there isnt a decoded task, then goes for the create mutation
      if (type === "create") {
        await createTask({ variables: { input: addedTask } });
      } else {
        //If there is a decoded task, then goes for the update mutation
        await updateTask({ variables: { input: addedTask } });
      }
    } catch (error) {
      if (error instanceof Error) handleError(error.message);
    }
  };

  //UseEffect to map the inputs if in edit mode
  useEffect(() => {
    setIsDisabled(false);
    if (type === "edit" && isOpen && props.task) {
      const { task } = props;
      reset({
        taskName: task.name || "",
        selectedPoints: task.pointEstimate,
        selectedStatus: task.status,
        selectedDate: new Date(task.dueDate),
        selectedAssignee: task.assignee
          ? {
              __typename: "User",
              id: task.assignee.id,
              fullName: task.assignee.fullName,
            }
          : undefined,
        tags: task.tags || [],
      });
    } else if (type === "create" && isOpen) {
      reset({
        taskName: "",
        selectedStatus: "BACKLOG",
        selectedAssignee: undefined,
        selectedPoints: undefined,
        selectedDate: null,
        tags: [],
      });
    }
  }, [props, type, isOpen, reset]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50">
        {showSuccess ? (
          <DialogPanel className="min-w-160 w-fit space-y-2 bg-background-modal text-font py-8 px-4 rounded-lg flex flex-col items-center justify-center text-center">
            <RiCheckboxCircleLine className="text-6xl" />
            <p className="text-lg font-bold">
              Task {type === "edit" ? "updated" : "created"} successfully
            </p>
          </DialogPanel>
        ) : error ? (
          <DialogPanel className="min-w-160 w-fit space-y-2 bg-background-modal text-font py-8 px-4 rounded-lg flex flex-col items-center justify-center">
            <ErrorMessage message={error} />
          </DialogPanel>
        ) : (
          <DialogPanel className="min-w-160 w-fit space-y-4 bg-background-modal text-font p-4 rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Controller
                name="taskName"
                control={control}
                rules={{
                  required: "Task name is required",
                  validate: {
                    notEmpty: (value) =>
                      value.trim().length > 0 ||
                      "Task name cannot be empty or only spaces",
                  },
                  maxLength: {
                    value: 15,
                    message: "Task name must be 15 characters or less",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Task Name..."
                    className="w-full p-2 text-xl font-semibold"
                  />
                )}
              />

              <div className="flex gap-4">
                {/* Points Dropdown */}
                <Controller
                  name="selectedPoints"
                  control={control}
                  rules={{ required: "Points estimate is required" }}
                  render={({ field }) => (
                    <PointsDropdown
                      selectedValue={field.value}
                      onSelect={field.onChange}
                      isLoading={loadingPoints}
                      options={dataPoints}
                    />
                  )}
                />

                {/* Assignee Dropdown */}
                <Controller
                  name="selectedAssignee"
                  control={control}
                  rules={{ required: "Assignee is required" }}
                  render={({ field }) => (
                    <AssigneeDropdown
                      selectedValue={field.value}
                      onSelect={field.onChange}
                      isLoading={loadingUsers}
                      options={dataUsers}
                    />
                  )}
                />

                {/* Tag Dropdown */}
                <Controller
                  name="tags"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value.length > 0 || "At least one tag is required",
                  }}
                  render={({ field }) => (
                    <TagDropdown
                      selectedValue={field.value}
                      onSelect={(action) => {
                        const newTags = tagsReducer(field.value, action);
                        field.onChange(newTags);
                      }}
                      isLoading={loadingTags}
                      options={dataTags}
                    />
                  )}
                />

                {/* Status Dropdown */}
                {type === "edit" && (
                  <Controller
                    name="selectedStatus"
                    control={control}
                    render={({ field }) => (
                      <StatusDropdown
                        selectedValue={field.value}
                        onSelect={field.onChange}
                        isLoading={loadingStatus}
                        options={dataStatus}
                      />
                    )}
                  />
                )}

                {/* Date Button */}
                <Controller
                  name="selectedDate"
                  control={control}
                  rules={{ required: "Due date is required" }}
                  render={({ field }) => (
                    <DateButton
                      selectedDate={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="w-full flex justify-end items-center">
                {/* Validation errors */}
                {Object.keys(errors).length > 0 && (
                  <p className="text-primary flex-1">
                    {Object.values(errors)[0]?.message}
                  </p>
                )}

                <div className="flex gap-8">
                  <Button
                    variant="neutral"
                    onClick={() => setIsOpen(false)}
                    type="button"
                  >
                    Cancel
                  </Button>

                  <Button variant="primary" type="submit" disabled={isDisabled}>
                    {type === "create" ? "Create" : "Update"}
                  </Button>
                </div>
              </div>
            </form>
          </DialogPanel>
        )}
      </div>
    </Dialog>
  );
}

export default AddModal;
