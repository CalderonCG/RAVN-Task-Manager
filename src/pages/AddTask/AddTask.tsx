import { RiCloseLine } from "react-icons/ri";
import PointsDropdown from "../../features/AddTask/components/PointsDropdown";
import { useReducer, useState } from "react";
import AssigneeDropdown from "../../features/AddTask/components/AssigneeDropdown";
import TagDropdown from "../../features/AddTask/components/TagDropdown";
import DateButton from "../../features/AddTask/components/DateButton";

import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_TASK,
  GET_POINTS,
  GET_TAGS,
  GET_TASK,
  GET_USERS,
} from "../../queries/task";
import type {
  GetPointsQuery,
  GetTagsQuery,
  GetUsersQuery,
  TaskTag,
} from "../../generated/graphql";
import type {
  TagAction,
  TaskType,
  User,
} from "../../features/AddTask/components/AddButton";
import MessageModal from "../../components/MessageModal/MessageModal";

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
function AddTask() {
  //Queries---------------------------------------------------------------------------------
  const { data: dataTags, loading: loadingTags } =
    useQuery<GetTagsQuery>(GET_TAGS);
  const { data: dataPoints, loading: loadingPoints } =
    useQuery<GetPointsQuery>(GET_POINTS);
  const { data: dataUsers, loading: loadingUsers } =
    useQuery<GetUsersQuery>(GET_USERS);

  //Selected states
  const navigate = useNavigate();
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
      navigate(-1);
    }, 2000);
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
    }, 2000);
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
    <div className="h-full w-full p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center text-font-secondary">
        <Button variant="neutral" onClick={() => navigate(-1)}>
          <RiCloseLine className="text-3xl text-font" />
        </Button>
        <Button variant="neutral" onClick={() => handleNewTask()}>
          <p>Create</p>
        </Button>
      </div>
      <input
        type="text"
        placeholder="Task Name..."
        className="w-full p-2 text-xl font-semibold"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <PointsDropdown
        selectedValue={selectedPoints}
        onSelect={setSelectedPoints}
        options={dataPoints}
        isLoading={loadingPoints}
      />
      <TagDropdown
        selectedValue={tags}
        onSelect={dispatch}
        options={dataTags}
        isLoading={loadingTags}
      />
      <AssigneeDropdown
        selectedValue={selectedAssignee}
        onSelect={setSelectedAssignee}
        options={dataUsers}
        isLoading={loadingUsers}
      />
      <DateButton selectedDate={selectedDate} onChange={setSelectedDate} />
      <MessageModal
        type="message"
        message="Task added successfully"
        isOpen={showSuccess}
        setIsOpen={setShowSuccess}
      />
      <MessageModal
        type="error"
        message={error !== null ? error : ""}
        isOpen={error !== null}
        setIsOpen={setError}
      />
      {isMissing && (
        <p className="text-primary flex-1">Please complete all fields</p>
      )}
    </div>
  );
}

export default AddTask;
