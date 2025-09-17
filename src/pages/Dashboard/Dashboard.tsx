import SearchBar from "../../components/SearchBar/SearchBar";
import TabSwitch from "../../components/TabSwitch/TabSwitch";
import Card from "../../features/Dashboard/components/Card";
import { useQuery } from "@apollo/client";
import { GET_STATUS, GET_TASK } from "../../queries/TaskQuery";
import type {
  GetProfileQuery,
  GetStatusQuery,
  GetTaskQuery,
} from "../../generated/graphql";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { RiAddLine, RiFilterLine, RiUserStarLine } from "react-icons/ri";
import AddModal from "../../features/AddTask/components/AddModal";
import FilterModal from "../../features/Dashboard/components/FilterModal";
import type { FilterType, StatusType } from "../../utils/TaskTypes";
import { statusMap } from "../../utils/DataMapper";
import { GET_PROFILE } from "../../queries/UserQuery";
import { useMediaQuery } from "../../utils/CustomHooks";

function Dashboard() {
  //Queries -----------------------------
  const { data, loading, error } = useQuery<GetTaskQuery>(GET_TASK);
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery<GetProfileQuery>(GET_PROFILE);
  const { data: statusList, loading: statusLoading } =
    useQuery<GetStatusQuery>(GET_STATUS);

  //Consts and states ---------------------------
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterType>({
    status: undefined,
    assigneeId: undefined,
    tags: undefined,
    dueDate: undefined,
    pointEstimate: undefined,
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

  //Task filtering---------------------------------------------------------
  const filteredTasks = data?.tasks.filter((task) => {
    const taskDate = new Date(task.dueDate);
    const filterDate = filters.dueDate ? new Date(filters.dueDate) : undefined;

    const nameCheck = task.name
      .toLowerCase()
      .startsWith(search.trim().toLowerCase());

    const statusCheck =
      task.status === filters.status ||
      filters.status === undefined ||
      filters.status === "ALL";

    const assigneeCheck =
      task.assignee?.id === filters.assigneeId ||
      filters.assigneeId === undefined;

    const dateCheck = filterDate === undefined || taskDate <= filterDate;

    const pointsCheck =
      task.pointEstimate === filters.pointEstimate ||
      filters.pointEstimate === undefined;

    const tagsCheck =
      filters.tags === undefined ||
      filters.tags.every((tag) => task.tags.includes(tag));

    return (
      nameCheck &&
      statusCheck &&
      assigneeCheck &&
      dateCheck &&
      pointsCheck &&
      tagsCheck
    );
  });

  //Handle my task filter-----------------
  const handleMyTask = () => {
    const isSet = filters.assigneeId === userData?.profile.id;

    setFilters((prev) => ({
      ...prev,
      assigneeId: isSet ? undefined : userData?.profile.id,
    }));
  };

  return (
    <div className="w-full h-full flex flex-col p-4 items-center gap-4 text-font overflow-hidden ">
      <SearchBar
        value={search}
        onChange={setSearch}
        avatar={userData?.profile.id}
      />
      <div className="w-full flex items-center justify-between">
        <TabSwitch />
        <div className="flex gap-2">
          <Button variant="neutral" onClick={() => handleMyTask()}>
            <RiUserStarLine className="text-3xl text-font" />
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
          {/* Columns */}
          {status.map((type) => {
            const columnTasks = filteredTasks?.filter(
              (task) => task.status === type.name,
            );
            return (
              <div
                key={type.name}
                className="w-11/12 flex flex-col shrink-0 gap-4
        lg:w-[calc(33.333%-1rem)] lg:max-w-100"
              >
                <h1 className="text-lg font-semibold">
                  {statusMap[type.name as StatusType]} ({columnTasks?.length})
                </h1>
                <div
                  className="w-full flex-1 overflow-y-auto shrink-0 flex flex-col gap-4 scroll-smooth 
                  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-background
  [&::-webkit-scrollbar-thumb]:bg-accent"
                >
                  {columnTasks?.length === 0 ? (
                    <div className="flex w-full justify-center font-bold text-font-secondary text-xl">
                      <p>Empty</p>
                    </div>
                  ) : (
                    columnTasks
                      ?.filter((task) => task.status === type.name)
                      .map((task) => <Card task={task} key={task.id} />)
                  )}
                </div>
              </div>
            );
          })}
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
        />
      )}
    </div>
  );
}

export default Dashboard;
