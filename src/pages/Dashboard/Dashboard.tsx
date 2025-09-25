import SearchBar from "../../components/SearchBar/SearchBar";
import TabSwitch from "../../components/TabSwitch/TabSwitch";
import { useQuery } from "@apollo/client";
import type { GetProfileQuery, PointEstimate } from "../../generated/graphql";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import { useState } from "react";
import {
  RiAddLine,
  RiFilterLine,
  RiUserStarFill,
  RiUserStarLine,
  RiZoomOutLine,
} from "react-icons/ri";
import AddModal from "../../features/AddTask/components/AddModal";
import FilterModal from "../../features/Dashboard/components/FilterModal";
import { GET_PROFILE } from "../../queries/UserQuery";
import { useMediaQuery } from "../../utils/CustomHooks";
import Column from "../../features/Dashboard/components/Column";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Card from "../../features/Dashboard/components/Card";
import ListHeader from "../../features/TaskList/ListHeader";
import ListContainer from "../../features/TaskList/ListContainer";
import Badge from "../../components/Badge/Badge";
import { mapDate, numberMap, statusMap } from "../../utils/DataMapper";
import { useTaskFilters } from "../../features/Dashboard/hooks/useTaskFilters";
import { useTaskData } from "../../features/Dashboard/hooks/useTaskData";
import { useDragNDrop } from "../../features/Dashboard/hooks/useDragNDrop";

function Dashboard() {
  //Consts---------------------------
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isList, setIsList] = useState(false);
  //Get user data query
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery<GetProfileQuery>(GET_PROFILE);

  //Filter options
  const {
    filters,
    setFilters,
    search,
    setSearch,
    isFiltering,
    isMyTask,
    handleMyTask,
    filterInput,
  } = useTaskFilters(userData);

  //Query data
  const { data, statusList, isLoading, errorMessage, UpdateTaskMutation } =
    useTaskData(filterInput, userLoading, userError?.message);

  //Drag and drop
  const { activeTask, handleDragEnd, handleDragStart } = useDragNDrop(
    UpdateTaskMutation,
    data,
  );

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
          <div className="hidden lg:flex items-center gap-1 ">
            {filters.pointEstimate && (
              <Badge
                variant="neutral"
                label={`${numberMap[filters.pointEstimate as PointEstimate]} points`}
              />
            )}
            {filters.assigneeId && (
              <Badge variant="neutral" label={filters.assigneeId.fullName} />
            )}
            {filters.tags && filters.tags.length > 0 && (
              <Badge
                variant="neutral"
                label={`${filters.tags.length} tags`}
                tagTitle={filters.tags.toString()}
              />
            )}
            {filters.status && filters.status !== "ALL" && (
              <Badge variant="neutral" label={statusMap[filters.status]} />
            )}
            {filters.dueDate && (
              <Badge
                variant="neutral"
                label={mapDate(filters.dueDate, false)}
              />
            )}
          </div>
          <Button variant="neutral" onClick={() => handleMyTask()}>
            {isMyTask ? (
              <RiUserStarFill className="text-3xl text-font" />
            ) : (
              <RiUserStarLine className="text-3xl text-font" />
            )}
          </Button>
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
          showAssignee={true}
        />
      )}
    </div>
  );
}

export default Dashboard;
