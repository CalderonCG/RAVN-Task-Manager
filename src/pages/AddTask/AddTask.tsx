import { RiCloseLine } from "react-icons/ri";
import PointsDropdown from "../../features/AddTask/components/PointsDropdown";
import { useEffect, useReducer, useState } from "react";
import AssigneeDropdown from "../../features/AddTask/components/AssigneeDropdown";
import TagDropdown from "../../features/AddTask/components/TagDropdown";
import DateButton from "../../features/AddTask/components/DateButton";

import Button from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_TASK,
  GET_POINTS,
  GET_STATUS,
  GET_TAGS,
  GET_USERS,
  UPDATE_TASK,
} from "../../queries/task";
import type {
  GetPointsQuery,
  GetStatusQuery,
  GetTagsQuery,
  GetUsersQuery,
  Status,
  TaskTag,
} from "../../generated/graphql";
import MessageModal from "../../components/MessageModal/MessageModal";
import type {
  GetTaskType,
  TagAction,
  TaskType,
  User,
} from "../../utils/TaskTypes";
import StatusDropdown from "../../features/AddTask/components/StatusDropdown";

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
  //Dynamic id, can be undefined
  const { id } = useParams<{ id: string }>();
  //Queries---------------------------------------------------------------------------------
  const { data: dataTags, loading: loadingTags } =
    useQuery<GetTagsQuery>(GET_TAGS);
  const { data: dataPoints, loading: loadingPoints } =
    useQuery<GetPointsQuery>(GET_POINTS);
  const { data: dataUsers, loading: loadingUsers } =
    useQuery<GetUsersQuery>(GET_USERS);
  const { data: dataStatus, loading: loadingStatus } =
    useQuery<GetStatusQuery>(GET_STATUS);
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
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState<string>("");
  const [selectedAssignee, setSelectedAssignee] = useState<User | undefined>(
    undefined,
  );
  const [selectedPoints, setSelectedPoints] = useState<string | undefined>(
    undefined,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Status>("BACKLOG");
  const [tags, dispatch] = useReducer(tagsReducer, [] as TaskTag[]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMissing, setIsMissing] = useState(false);
  const [task, setTask] = useState<GetTaskType | undefined>(undefined);

  //Event handlers
  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  const handleError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  const handleTask = async () => {
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
    const baseTask: TaskType = {
      assigneeId: selectedAssignee?.id,
      dueDate: selectedDate.toISOString(),
      name: taskName,
      pointEstimate: selectedPoints,
      status: selectedStatus,
      tags: tags,
    };

    const addedTask =
      task !== undefined ? { ...baseTask, id: task.id } : baseTask;

    try {
      if (task === undefined) {
        await createTask({
          variables: {
            input: addedTask,
          },
        });
      } else {
        await updateTask({
          variables: {
            input: addedTask,
          },
        });
      }
    } catch (error) {
      if (error instanceof Error) handleError(error.message);
    }
  };

  //UseEffect to map the inputs if in edit mode
  useEffect(() => {
    if (id !== undefined) {
      const decodedString = atob(id);
      const task: GetTaskType = JSON.parse(decodedString);

      setTask(task);
      setTaskName(task.name || "");
      setSelectedPoints(task.pointEstimate);
      setSelectedStatus(task.status);
      setSelectedDate(new Date(task.dueDate));
      if (task.assignee) {
        setSelectedAssignee({
          __typename: "User",
          id: task.assignee.id,
          fullName: task.assignee.fullName,
        });
      }

      if (task.tags.length > 0) {
        dispatch({ type: "Reset" });
        task.tags.forEach((tag) => {
          dispatch({ type: "Add", value: tag });
        });
      }
    } else if (id) {
      //Reset inputs before each render
      setTaskName("");
      setSelectedStatus("BACKLOG");
      setSelectedAssignee(undefined);
      setSelectedPoints(undefined);
      setSelectedDate(null);
      dispatch({ type: "Reset" });
    }
  }, [id]);

  return (
    <div className="h-full w-full p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center text-font-secondary">
        <Button variant="neutral" onClick={() => navigate(-1)}>
          <RiCloseLine className="text-3xl text-font" />
        </Button>
        {task !== undefined ? (
          <Button variant="neutral" onClick={() => handleTask()}>
            <p>Update</p>
          </Button>
        ) : (
          <Button variant="neutral" onClick={() => handleTask()}>
            <p>Create</p>
          </Button>
        )}
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

      {task !== undefined && (
        <StatusDropdown
          selectedValue={selectedStatus}
          onSelect={setSelectedStatus}
          isLoading={loadingStatus}
          options={dataStatus}
        />
      )}

      <MessageModal
        type="message"
        message={`Task ${task !== undefined ? "updated" : "created"} successfully`}
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
