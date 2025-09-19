import SearchBar from "../../components/SearchBar/SearchBar";
import TabSwitch from "../../components/TabSwitch/TabSwitch";
import { useMutation, useQuery } from "@apollo/client";
import { GET_STATUS, GET_TASK, UPDATE_TASK } from "../../queries/TaskQuery";
import type {
  GetProfileQuery,
  GetStatusQuery,
  GetTaskQuery,
  GetTaskQueryVariables,
  PointEstimate,
  Status,
} from "../../generated/graphql";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { RiAddLine, RiFilterLine, RiZoomOutLine } from "react-icons/ri";
import AddModal from "../../features/AddTask/components/AddModal";
import FilterModal from "../../features/Dashboard/components/FilterModal";
import type { FilterType, GetTaskType } from "../../utils/TaskTypes";
import { GET_PROFILE } from "../../queries/UserQuery";
import { useMediaQuery } from "../../utils/CustomHooks";
import Column from "../../features/Dashboard/components/Column";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import Card from "../../features/Dashboard/components/Card";
import ListHeader from "../../features/TaskList/ListHeader";
import ListContainer from "../../features/TaskList/ListContainer";

function Tasks() {
  //Fetching user
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery<GetProfileQuery>(GET_PROFILE);
  //Consts---------------------------
  const [activeTask, setActiveTask] = useState<GetTaskType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterType>({
    status: undefined,
    assigneeId: userData?.profile.id,
    tags: undefined,
    dueDate: undefined,
    pointEstimate: undefined,
  });
  const [isList, setIsList] = useState(false);
  //Queries -----------------------------
  const { data, loading, error } = useQuery<
    GetTaskQuery,
    GetTaskQueryVariables
  >(GET_TASK, {
    variables: {
      input: {
        assigneeId: userData?.profile.id,
        ...(search !== "" && { name: search }),
        ...(filters.status !== "ALL" && { status: filters.status }),
        ...(filters.dueDate && { dueDate: filters.dueDate }),
        ...(filters.pointEstimate && {
          pointEstimate: filters.pointEstimate as PointEstimate,
        }),
        ...(filters.tags && { tags: filters.tags }),
      },
    },
    context: {
      debounceKey: "search-tasks",
    },
  });

  const { data: statusList, loading: statusLoading } =
    useQuery<GetStatusQuery>(GET_STATUS);
  const [updateTask] = useMutation(UPDATE_TASK);

  //Consts---------------------------
  const isFiltering = Object.entries(filters).some(([key, value]) => {
    if (value === undefined) return false;
    if (key === "status" && value === "ALL") return false;
    if (key === "tags" && Array.isArray(value) && value.length === 0)
      return false;
    return true;
  });
  const isLoading = loading || statusLoading || userLoading;
  const errorMessage = error?.message || userError?.message;

  //Media query hook
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  //Status sorting-------------------------------
  const statusOrder = ["BACKLOG", "TODO", "IN_PROGRESS", "DONE", "CANCELLED"];
  const status = (statusList?.__type?.enumValues ?? []).slice().sort((a, b) => {
    const indexA = statusOrder.indexOf(a.name);
    const indexB = statusOrder.indexOf(b.name);

    // if not found, send to end
    return (
      (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB)
    );
  });

  //Drag start function-----------
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const task = data?.tasks?.find((task) => task.id === active.id) || null;

    setActiveTask(task);
  }

  //Drag end function------------------
  //Drag end function con Apollo optimisticResponse
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

    // Limpiar el activeTask
    setActiveTask(null);
  }

  return (
    <div className="w-full h-full flex flex-col p-4 items-center gap-4 text-font overflow-hidden ">
      <SearchBar
        value={search}
        onChange={setSearch}
        avatar={userData?.profile.id}
      />
      <div className="w-full flex items-center justify-between">
        <TabSwitch value={isList} onClick={setIsList} />
        <div className="flex gap-2">
          <Button variant="neutral" onClick={() => setIsFilterOpen(true)}>
            <RiFilterLine className="text-3xl text-font" />
          </Button>
          <Button
            variant="neutral"
            visibility="desktop"
            onClick={() => setIsOpen(true)}
          >
            <RiAddLine className="text-3xl text-font" />
          </Button>
        </div>
      </div>
      {/* Container */}
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <div
          className="w-full flex-1 flex gap-4 overflow-x-auto 
        [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-background
  [&::-webkit-scrollbar-thumb]:bg-accent"
        >
          {data?.tasks.length === 0 && (isFiltering || search.trim() !== "") ? (
            <div className="w-full flex-1 flex flex-col items-center justify-center font-bold text-font-secondary text-xl">
              <RiZoomOutLine className="text-4xl" />
              <p className="font-normal text-center">
                No task matches those filters
              </p>
            </div>
          ) : !isList ? (
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
              {status.map((type) => {
                const columnTasks = data?.tasks?.filter(
                  (task) => task.status === type.name,
                );
                return (
                  <Column key={type.name} type={type} tasks={columnTasks} />
                );
              })}
              <DragOverlay>
                {activeTask ? (
                  <div style={{ opacity: 0.8, transform: "scale(1.05)" }}>
                    <Card task={activeTask} />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          ) : (
            <div className="w-full h-full flex flex-col gap-4 ">
              <ListHeader />
              {status.map((type) => {
                const columnTasks = data?.tasks?.filter(
                  (task) => task.status === type.name,
                );
                return (
                  <ListContainer
                    key={type.name}
                    type={type}
                    tasks={columnTasks}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {isDesktop && (
        <AddModal isOpen={isOpen} setIsOpen={setIsOpen} type="create" />
      )}
      {isFilterOpen && (
        <FilterModal
          isOpen={isFilterOpen}
          setIsOpen={setIsFilterOpen}
          filters={filters}
          setFilters={setFilters}
          showAssignee={false}
        />
      )}
    </div>
  );
}

export default Tasks;
