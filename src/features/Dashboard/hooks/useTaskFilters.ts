import { useState } from "react";
import type { FilterType } from "../../../utils/TaskTypes";
import type {
  GetProfileQuery,
  GetTaskQueryVariables,
  PointEstimate,
} from "../../../generated/graphql";

export const useTaskFilters = (userData?: GetProfileQuery) => {
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
      ...(filters.assigneeId?.id && { assigneeId: filters.assigneeId.id }),
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
