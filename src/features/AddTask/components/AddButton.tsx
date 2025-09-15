import { Dialog, DialogPanel } from "@headlessui/react";
import { useReducer, useState } from "react";
import { RiAddLine, RiCheckboxCircleLine } from "react-icons/ri";
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
  GET_TAGS,
  GET_TASK,
  GET_USERS,
} from "../../../queries/task";
import type {
  GetPointsQuery,
  GetTagsQuery,
  GetUsersQuery,
  Status,
  TaskTag,
} from "../../../generated/graphql";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";

//Types------------
export type User = GetUsersQuery["users"][number];

export type TagAction =
  | {
      type: "Add" | "Remove";
      value: TaskTag;
    }
  | { type: "Reset" };

export type TaskType = {
  assigneeId: string;
  dueDate: string;
  name: string;
  pointEstimate: string;
  status: Status;
  tags: TaskTag[];
};

//Reducer-----------------
const tagsReducer = (state: TaskTag[], action: TagAction): TaskTag[] => {
  switch (action.type) {
    case "Add":
      return [...state, action.value];
    case "Remove":
      return state.filter((tag) => tag != action.value);
    case "Reset":
      return [];
    default:
      return state;
  }
};

function AddButton() {
  const [isOpen, setIsOpen] = useState(false);
  //Queries---------------------------------------------------------------------------------
  const { data: dataTags, loading: loadingTags } =
    useQuery<GetTagsQuery>(GET_TAGS);
  const { data: dataPoints, loading: loadingPoints } =
    useQuery<GetPointsQuery>(GET_POINTS);
  const { data: dataUsers, loading: loadingUsers } =
    useQuery<GetUsersQuery>(GET_USERS);

  //Selected states
  const [taskName, setTaskName] = useState<string>("");
  const [selectedAssignee, setSelectedAssignee] = useState<User | null>(null);
  const [selectedPoints, setSelectedPoints] = useState<string | undefined>(
    undefined,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tags, dispatch] = useReducer(tagsReducer, [] as TaskTag[]);
  const [createTask] = useMutation(CREATE_TASK);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMissing, setIsMissing] = useState(false);

  //Event handlers
  const handleSuccess = () => {
    setTaskName("");
    setSelectedAssignee(null);
    setSelectedPoints(undefined);
    setSelectedDate(null);
    dispatch({ type: "Reset" });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsOpen(false);
    }, 1000);
  };

  const handleError = (error: string) => {
    setTaskName("");
    setSelectedAssignee(null);
    setSelectedPoints(undefined);
    setSelectedDate(null);
    dispatch({ type: "Reset" });
    setError(error);
    setTimeout(() => {
      setError(null);
    }, 1000);
  };

  const handleNewTask = async () => {
    if (
      !selectedAssignee ||
      !selectedPoints ||
      tags.length === 0 ||
      !selectedDate ||
      taskName.trim() === ""
    ) {
      setIsMissing(true);
      setTimeout(() => setIsMissing(false), 2000);
      return;
    }
    const addedTask: TaskType = {
      assigneeId: selectedAssignee?.id,
      dueDate: selectedDate.toISOString(),
      name: taskName,
      pointEstimate: selectedPoints,
      status: "BACKLOG",
      tags: tags,
    };

    try {
      const { data } = await createTask({
        variables: {
          input: addedTask,
        },
        refetchQueries: [{ query: GET_TASK }],
        awaitRefetchQueries: true,
      });

      if (data) {
        handleSuccess();
      }
    } catch (error) {
      if (error instanceof Error) handleError(error.message);
    }
  };

  return (
    <>
      <Button
        variant="neutral"
        visibility="desktop"
        onClick={() => setIsOpen(true)}
      >
        <RiAddLine className="text-3xl text-font" />
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 "
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50">
          {showSuccess ? (
            <DialogPanel
              className="w-2/3 max-w-[42rem] space-y-2 bg-background-modal text-font py-8 px-4 rounded-lg
            flex flex-col items-center justify-center text-center"
            >
              <RiCheckboxCircleLine className="text-6xl" />
              <p className="text-lg font-bold">Task created successfully</p>
            </DialogPanel>
          ) : error ? (
            <DialogPanel
              className="w-2/3 max-w-[42rem] space-y-2 bg-background-modal text-font py-8 px-4 rounded-lg
            flex flex-col items-center justify-center"
            >
              <ErrorMessage message={error} />
            </DialogPanel>
          ) : (
            <DialogPanel className="w-2/3 max-w-[50rem] space-y-4 bg-background-modal text-font p-4 rounded-lg">
              <input
                type="text"
                placeholder="Task Name..."
                className="w-full p-2 text-xl font-semibold"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <div className="flex gap-4">
                <PointsDropdown
                  selectedValue={selectedPoints}
                  onSelect={setSelectedPoints}
                  isLoading={loadingPoints}
                  options={dataPoints}
                />
                <AssigneeDropdown
                  selectedValue={selectedAssignee}
                  onSelect={setSelectedAssignee}
                  isLoading={loadingUsers}
                  options={dataUsers}
                />
                <TagDropdown
                  selectedValue={tags}
                  onSelect={dispatch}
                  isLoading={loadingTags}
                  options={dataTags}
                />
                <DateButton
                  selectedDate={selectedDate}
                  onChange={setSelectedDate}
                />
              </div>
              <div className="w-full flex justify-end items-center">
                {isMissing && (
                  <p className="text-primary flex-1">
                    Please complete all fields
                  </p>
                )}
                <div className="flex gap-8">
                  <Button variant="neutral" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => handleNewTask()}>
                    Update
                  </Button>
                </div>
              </div>
            </DialogPanel>
          )}
        </div>
      </Dialog>
    </>
  );
}

export default AddButton;
