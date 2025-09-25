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

export type FilterType = {
  assigneeId?: { __typename: "User"; id: string; fullName: string };
  dueDate?: string | undefined;
  pointEstimate?: string | undefined;
  status?: StatusType | undefined;
  tags?: TaskTag[] | undefined;
};

export type GetTaskType = GetTaskQuery["tasks"][number];

export type StatusType = Status | "ALL";
