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
  RiCloseFill,
  RiFilterLine,
  RiZoomOutLine,
} from "react-icons/ri";
import AddModal from "../../features/AddTask/components/AddModal";
import FilterModal from "../../features/Dashboard/components/FilterModal";
import { GET_PROFILE } from "../../queries/UserQuery";
import Column from "../../features/Dashboard/components/Column";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Card from "../../features/Dashboard/components/Card";
import ListHeader from "../../features/TaskList/components/ListHeader";
import ListContainer from "../../features/TaskList/components/ListContainer";
import { useTaskFilters } from "../../features/Dashboard/hooks/useTaskFilters";
import { useTaskData } from "../../features/Dashboard/hooks/useTaskData";
import { useDragNDrop } from "../../features/Dashboard/hooks/useDragNDrop";
import Badge from "../../components/Badge/Badge";
import { mapDate, numberMap, statusMap } from "../../utils/DataMapper";
import FilterDropdown from "../../features/Dashboard/components/FilterDropdown";

type DashboardProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Tasks({ isOpen, setIsOpen }: DashboardProps) {
  //Consts---------------------------
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isList, setIsList] = useState(false);
  //Get user data query
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery<GetProfileQuery>(GET_PROFILE);

  //Filter options
  const { filters, values, actions } = useTaskFilters(true, userData);

  //Query data
  const { data, statusList, isLoading, errorMessage, UpdateTaskMutation } =
    useTaskData(values.filterInput, userLoading, userError?.message);

  //Drag and drop
  const { activeTask, handleDragEnd, handleDragStart } = useDragNDrop(
    UpdateTaskMutation,
    data,
  );

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
        value={values.search}
        onChange={actions.setSearch}
        avatar={userData?.profile.id}
      />
      <div className="w-full flex items-center justify-between">
        <TabSwitch value={isList} onClick={setIsList} />

        <div className="flex gap-2">
          <div className="hidden lg:flex items-center gap-1 ">
            {filters.pointEstimate && (
              <Badge variant="neutral">
                {`${numberMap[filters.pointEstimate as PointEstimate]} points`}
                <RiCloseFill
                  className="text-xl mt-0.5 text-font-secondary hover:text-font"
                  onClick={() => actions.resetFilter("pointEstimate")}
                />
              </Badge>
            )}
            {filters.tags && filters.tags.length > 0 && (
              <FilterDropdown
                tags={filters.tags}
                removeTag={actions.removeTag}
              />
            )}
            {filters.status && filters.status !== "ALL" && (
              <Badge variant="neutral">
                {statusMap[filters.status]}
                <RiCloseFill
                  className="text-xl mt-0.5 text-font-secondary hover:text-font"
                  onClick={() => actions.resetFilter("status")}
                />
              </Badge>
            )}
            {filters.dueDate && (
              <Badge variant="neutral">
                {mapDate(filters.dueDate, false)}
                <RiCloseFill
                  className="text-xl mt-0.5 text-font-secondary hover:text-font"
                  onClick={() => actions.resetFilter("dueDate")}
                />
              </Badge>
            )}
          </div>
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
          {data?.tasks.length === 0 &&
          (values.isFiltering || values.search.trim() !== "") ? (
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

      <AddModal isOpen={isOpen} setIsOpen={setIsOpen} type="create" />

      {isFilterOpen && (
        <FilterModal
          isOpen={isFilterOpen}
          setIsOpen={setIsFilterOpen}
          filters={filters}
          setFilters={actions.setFilters}
          showAssignee={false}
        />
      )}
    </div>
  );
}

export default Tasks;
