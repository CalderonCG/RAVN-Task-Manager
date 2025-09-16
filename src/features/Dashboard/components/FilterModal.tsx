import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import StatusDropdown from "../../AddTask/components/StatusDropdown";
import DateButton from "../../AddTask/components/DateButton";
import PointsDropdown from "../../AddTask/components/PointsDropdown";
import AssigneeDropdown from "../../AddTask/components/AssigneeDropdown";
import TagDropdown from "../../AddTask/components/TagDropdown";
import { useReducer, useState } from "react";
import type {
  GetPointsQuery,
  GetStatusQuery,
  GetTagsQuery,
  GetUsersQuery,
  TaskTag,
} from "../../../generated/graphql";
import { tagsReducer } from "../../../utils/Reducer";
import { useQuery } from "@apollo/client";
import {
  GET_POINTS,
  GET_STATUS,
  GET_TAGS,
  GET_USERS,
} from "../../../queries/TaskQuery";
import type { FilterType, StatusType, User } from "../../../utils/TaskTypes";
import Button from "../../../components/Button/Button";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: FilterType;
  setFilters: React.Dispatch<React.SetStateAction<Partial<FilterType>>>;
};

function FilterModal({ isOpen, setIsOpen, setFilters }: ModalProps) {
  //Selected states
  const [selectedAssignee, setSelectedAssignee] = useState<User | undefined>();
  const [selectedPoints, setSelectedPoints] = useState<string | undefined>(
    undefined,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<StatusType>("ALL");
  const [tags, dispatch] = useReducer(tagsReducer, [] as TaskTag[]);

  //Queries---------------------------------------------------------------------------------
  const { data: dataTags, loading: loadingTags } =
    useQuery<GetTagsQuery>(GET_TAGS);
  const { data: dataPoints, loading: loadingPoints } =
    useQuery<GetPointsQuery>(GET_POINTS);
  const { data: dataUsers, loading: loadingUsers } =
    useQuery<GetUsersQuery>(GET_USERS);
  const { data: dataStatus, loading: loadingStatus } =
    useQuery<GetStatusQuery>(GET_STATUS);

  //Handlers-------------------------------------------------------------------------------
  const handleApply = () => {
    setFilters({
      assigneeId: selectedAssignee?.id,
      pointEstimate: selectedPoints,
      status: selectedStatus,
      tags: tags,
      dueDate: selectedDate?.toISOString() || undefined,
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedAssignee(undefined);
    setSelectedPoints(undefined);
    setSelectedDate(null);
    setSelectedStatus("ALL");
    dispatch({ type: "Reset" });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed items-end inset-0 flex w-screen lg:items-center justify-center lg:p-4 bg-black/50">
        <DialogPanel
          className="w-full lg:w-2/3 lg:max-w-[50rem] space-y-2 bg-background-modal text-font py-8 px-4 rounded-t-lg lg:rounded-lg
            flex flex-col items-center justify-center gap-4 text-center"
        >
          <DialogTitle className="font-bold">Filter tasks</DialogTitle>
          <div className="flex w-full flex-col lg:flex-row lg:items-center gap-2 ">
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
            <StatusDropdown
              isFilter={true}
              selectedValue={selectedStatus}
              onSelect={setSelectedStatus}
              isLoading={loadingStatus}
              options={dataStatus}
            />
          </div>
          <div className="flex gap-4 w-full justify-between lg:justify-end">
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={() => handleReset()}>Reset</Button>
            <Button variant="primary" onClick={() => handleApply()}>
              Apply
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default FilterModal;
