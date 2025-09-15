import SearchBar from "../../components/SearchBar/SearchBar";
import TabSwitch from "../../components/TabSwitch/TabSwitch";
import Card from "../../features/Dashboard/components/Card";
import { useQuery } from "@apollo/client";
import { GET_STATUS, GET_TASK } from "../../queries/task";
import type { GetStatusQuery, GetTaskQuery } from "../../generated/graphql";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import AddModal from "../../features/AddTask/components/AddModal";

function Dashboard() {
  //Queries -----------------------------
  const { data, loading, error } = useQuery<GetTaskQuery>(GET_TASK);
  const { data: statusList, loading: statusLoading } =
    useQuery<GetStatusQuery>(GET_STATUS);

  //Consts ---------------------------
  const isLoading = loading || statusLoading;
  const [isOpen, setIsOpen] = useState(false);
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
      <SearchBar />
      <div className="w-full flex items-center justify-center lg:justify-between">
        <TabSwitch />
        <Button
          variant="neutral"
          visibility="desktop"
          onClick={() => setIsOpen(true)}
        >
          <RiAddLine className="text-3xl text-font" />
        </Button>
      </div>
      {/* Container */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <div
          className="w-full flex-1 flex gap-4 overflow-x-auto lg:justify-between
        [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-background
  [&::-webkit-scrollbar-thumb]:bg-accent"
        >
          {/* Columns */}
          {status.map((type) => {
            const columnTasks = data?.tasks.filter(
              (task) => task.status === type.name,
            );
            return (
              <div
                key={type.name}
                className="w-11/12 flex flex-col shrink-0 gap-4
        lg:w-[calc(33.333%-1rem)] "
              >
                <h1 className="text-lg font-semibold">
                  {type.name} ({columnTasks?.length})
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

      <AddModal isOpen={isOpen} setIsOpen={setIsOpen} type="create" />
    </div>
  );
}

export default Dashboard;
