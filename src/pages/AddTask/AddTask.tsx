import { RiCloseLine } from "react-icons/ri";
import PointsDropdown from "../../features/AddTask/components/PointsDropdown";
import { useEffect, useState } from "react";
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
  GET_TASK,
  GET_USERS,
  UPDATE_TASK,
} from "../../queries/TaskQuery";
import type {
  GetPointsQuery,
  GetStatusQuery,
  GetTagsQuery,
  GetUsersQuery,
  TaskTag,
} from "../../generated/graphql";
import MessageModal from "../../components/MessageModal/MessageModal";
import type {
  GetTaskType,
  StatusType,
  TaskType,
  User,
} from "../../utils/TaskTypes";
import StatusDropdown from "../../features/AddTask/components/StatusDropdown";
import { tagsReducer } from "../../utils/Reducer";
import { useForm, Controller } from "react-hook-form";

//Form interface
interface TaskFormData {
  taskName: string;
  selectedAssignee: User | undefined;
  selectedPoints: string | undefined;
  selectedDate: Date | null;
  selectedStatus: StatusType;
  tags: TaskTag[];
}

function AddTask() {
  //Dynamic id, can be undefined
  //Contains the token of the edited task, this token decodes all the info of the task
  const { id } = useParams<{ id: string }>();

  // React Hook Form---------------------------------------
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

  //States
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const onSubmit = async (data: TaskFormData) => {
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
      task !== undefined ? { ...baseTask, id: task.id } : baseTask;

    try {
      //If there isnt a decoded task, then goes for the create mutation
      if (task === undefined) {
        await createTask({
          variables: {
            input: addedTask,
          },
          refetchQueries: [{ query: GET_TASK, variables: { input: {} } }], //Refetch the queries
          awaitRefetchQueries: true,
        });
      } else {
        //If there is a decoded task, then goes for the update mutation
        await updateTask({
          variables: {
            input: addedTask,
          },
          refetchQueries: [{ query: GET_TASK, variables: { input: {} } }], //Refetch the queries
          awaitRefetchQueries: true,
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
      const taskData: GetTaskType = JSON.parse(decodedString);

      setTask(taskData);
      reset({
        taskName: taskData.name || "",
        selectedPoints: taskData.pointEstimate,
        selectedStatus: taskData.status,
        selectedDate: new Date(taskData.dueDate),
        selectedAssignee: taskData.assignee
          ? {
              __typename: "User",
              id: taskData.assignee.id,
              fullName: taskData.assignee.fullName,
            }
          : undefined,
        tags: taskData.tags || [],
      });
    } else {
      // Reset inputs for create mode
      setTask(undefined);
      reset({
        taskName: "",
        selectedStatus: "BACKLOG",
        selectedAssignee: undefined,
        selectedPoints: undefined,
        selectedDate: null,
        tags: [],
      });
    }
  }, [id, reset]);

  return (
    <div className="h-full w-full p-4 flex flex-col gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col gap-4"
      >
        <div className="flex justify-between items-center text-font-secondary">
          <Button variant="neutral" onClick={() => navigate(-1)} type="button">
            <RiCloseLine className="text-3xl text-font" />
          </Button>

          <Button variant="neutral" type="submit">
            <p>{task !== undefined ? "Update" : "Create"}</p>
          </Button>
        </div>

        <Controller
          name="taskName"
          control={control}
          rules={{
            required: "Task name is required",
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

        {/* Points Dropdown */}
        <Controller
          name="selectedPoints"
          control={control}
          rules={{ required: "Points estimate is required" }}
          render={({ field }) => (
            <PointsDropdown
              selectedValue={field.value}
              onSelect={field.onChange}
              options={dataPoints}
              isLoading={loadingPoints}
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
              options={dataTags}
              isLoading={loadingTags}
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
              options={dataUsers}
              isLoading={loadingUsers}
            />
          )}
        />

        {/* Date Button */}
        <Controller
          name="selectedDate"
          control={control}
          rules={{ required: "Due date is required" }}
          render={({ field }) => (
            <DateButton selectedDate={field.value} onChange={field.onChange} />
          )}
        />

        {/* Status Dropdown */}
        {task !== undefined && (
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

        {/* Validation errors */}
        {Object.keys(errors).length > 0 && (
          <p className="text-primary flex-1">
            {Object.values(errors)[0]?.message}
          </p>
        )}
      </form>

      {/* Message modals */}
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
    </div>
  );
}

export default AddTask;
