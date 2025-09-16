import type {
  GetTaskQuery,
  GetUsersQuery,
  Status,
  TaskTag,
} from "../generated/graphql";

export type User = GetUsersQuery["users"][number];

export type TagAction =
  | {
      type: "Add" | "Remove";
      value: TaskTag;
    }
  | { type: "Reset" };

export type TaskType = {
  assigneeId: string;
  dueDate: string;
  name: string;
  pointEstimate: string;
  status: StatusType;
  tags: TaskTag[];
};

export type FilterType = Partial<Omit<TaskType, "name">>;

export type GetTaskType = GetTaskQuery["tasks"][number];

export type StatusType = Status | "ALL";
