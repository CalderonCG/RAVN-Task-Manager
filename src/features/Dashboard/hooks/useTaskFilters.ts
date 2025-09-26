import { useReducer, useState } from "react";
import type { FilterType, StatusType, User } from "../../../utils/TaskTypes";
import type {
  GetProfileQuery,
  GetTaskQueryVariables,
  PointEstimate,
  TaskTag,
} from "../../../generated/graphql";
import { tagsReducer } from "../../../utils/Reducer";

type FilterHandlerParameters = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFilters: React.Dispatch<React.SetStateAction<Partial<FilterType>>>;
};

export const useTaskFilters = (isUser: boolean, userData?: GetProfileQuery) => {
  const [filters, setFilters] = useState<FilterType>({
    status: undefined,
    assigneeId: undefined,
    tags: undefined,
    dueDate: undefined,
    pointEstimate: undefined,
  });
  const [search, setSearch] = useState("");

  //Checks if filters are being applied
  const isFiltering = Object.entries(filters).some(([key, value]) => {
    if (value === undefined) return false;
    if (key === "status" && value === "ALL") return false;
    if (key === "tags" && Array.isArray(value) && value.length === 0)
      return false;
    return true;
  });

  //Checks if the user tasks are being filtered
  const isMyTask = filters.assigneeId?.id === userData?.profile.id;

  //Handle my task filter-----------------
  const handleMyTask = () => {
    setFilters((prev) => ({
      ...prev,
      assigneeId: isMyTask ? undefined : userData?.profile,
    }));
  };

  const filterInput: GetTaskQueryVariables = {
    input: {
      ...(search !== "" && { name: search }),
      ...(filters.status !== "ALL" && { status: filters.status }),

      ...(filters.assigneeId?.id &&
        (!isUser
          ? { assigneeId: filters.assigneeId.id }
          : { assigneeId: userData?.profile.id })),
      ...(filters.dueDate && { dueDate: filters.dueDate }),
      ...(filters.pointEstimate && {
        pointEstimate: filters.pointEstimate as PointEstimate,
      }),
      ...(filters.tags && { tags: filters.tags }),
    },
  };
  return {
    filters,
    setFilters,
    search,
    setSearch,
    isFiltering,
    isMyTask,
    handleMyTask,
    filterInput,
  };
};

export const useFilterHandler = ({
  setIsOpen,
  setFilters,
}: FilterHandlerParameters) => {
  const [selectedAssignee, setSelectedAssignee] = useState<User | undefined>();
  const [selectedPoints, setSelectedPoints] = useState<string | undefined>(
    undefined,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<StatusType>("ALL");
  const [tags, tagsDispatcher] = useReducer(tagsReducer, [] as TaskTag[]);

  //Handlers-------------------------------------------------------------------------------
  const handleApply = () => {
    setFilters({
      assigneeId: selectedAssignee,
      pointEstimate: selectedPoints,
      status: selectedStatus,
      tags: tags,
      dueDate: selectedDate?.toISOString() || undefined,
    });
    setIsOpen(false);
  };

  const filters = {
    selectedAssignee,
    selectedPoints,
    selectedDate,
    selectedStatus,
    tags,
  };
  const actions = {
    setSelectedAssignee,
    setSelectedPoints,
    setSelectedDate,
    setSelectedStatus,
    tagsDispatcher,
    handleApply,
  };

  return {
    filters,
    actions,
  };
};
