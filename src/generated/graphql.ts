import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: string; output: string };
};

export type CreateTaskInput = {
  assigneeId?: InputMaybe<Scalars["String"]["input"]>;
  dueDate: Scalars["DateTime"]["input"];
  name: Scalars["String"]["input"];
  pointEstimate: PointEstimate;
  status: Status;
  tags: Array<TaskTag>;
};

export type DeleteTaskInput = {
  id: Scalars["String"]["input"];
};

export type FilterTaskInput = {
  assigneeId?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  ownerId?: InputMaybe<Scalars["String"]["input"]>;
  pointEstimate?: InputMaybe<PointEstimate>;
  status?: InputMaybe<Status>;
  tags?: InputMaybe<Array<TaskTag>>;
};

export type Mutation = {
  __typename: "Mutation";
  createTask: Task;
  deleteTask: Task;
  updateTask: Task;
};

export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};

export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};

export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};

/** Estimate point for a task */
export const PointEstimate = {
  Eight: "EIGHT",
  Four: "FOUR",
  One: "ONE",
  Two: "TWO",
  Zero: "ZERO",
} as const;

export type PointEstimate = (typeof PointEstimate)[keyof typeof PointEstimate];
export type Query = {
  __typename: "Query";
  profile: User;
  tasks: Array<Task>;
  users: Array<User>;
};

export type QueryTasksArgs = {
  input: FilterTaskInput;
};

/** Status for Task */
export const Status = {
  Backlog: "BACKLOG",
  Cancelled: "CANCELLED",
  Done: "DONE",
  InProgress: "IN_PROGRESS",
  Todo: "TODO",
} as const;

export type Status = (typeof Status)[keyof typeof Status];
export type Task = {
  __typename: "Task";
  assignee: Maybe<User>;
  createdAt: Scalars["DateTime"]["output"];
  creator: User;
  dueDate: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  pointEstimate: PointEstimate;
  position: Scalars["Float"]["output"];
  status: Status;
  tags: Array<TaskTag>;
};

/** Enum for tags for tasks */
export const TaskTag = {
  Android: "ANDROID",
  Ios: "IOS",
  NodeJs: "NODE_JS",
  Rails: "RAILS",
  React: "REACT",
} as const;

export type TaskTag = (typeof TaskTag)[keyof typeof TaskTag];
export type UpdateTaskInput = {
  assigneeId?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  id: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  pointEstimate?: InputMaybe<PointEstimate>;
  position?: InputMaybe<Scalars["Float"]["input"]>;
  status?: InputMaybe<Status>;
  tags?: InputMaybe<Array<TaskTag>>;
};

export type User = {
  __typename: "User";
  avatar: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  fullName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  type: UserType;
  updatedAt: Scalars["DateTime"]["output"];
};

/** Type of the User */
export const UserType = {
  Admin: "ADMIN",
  Candidate: "CANDIDATE",
} as const;

export type UserType = (typeof UserType)[keyof typeof UserType];
export type GetTaskQueryVariables = Exact<{ [key: string]: never }>;

export type GetTaskQuery = {
  __typename: "Query";
  tasks: Array<{
    __typename: "Task";
    id: string;
    name: string;
    status: Status;
    pointEstimate: PointEstimate;
    dueDate: string;
    tags: Array<TaskTag>;
    assignee: {
      __typename: "User";
      id: string;
      fullName: string;
      avatar: string | null;
    } | null;
  }>;
};

export const GetTaskDocument = gql`
  query GetTask {
    tasks(input: {}) {
      id
      name
      status
      pointEstimate
      dueDate
      assignee {
        id
        fullName
        avatar
      }
      tags
    }
  }
`;

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTaskQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTaskQuery, GetTaskQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTaskQuery, GetTaskQueryVariables>(
    GetTaskDocument,
    options,
  );
}
export function useGetTaskLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTaskQuery,
    GetTaskQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTaskQuery, GetTaskQueryVariables>(
    GetTaskDocument,
    options,
  );
}
export function useGetTaskSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetTaskQuery, GetTaskQueryVariables>(
    GetTaskDocument,
    options,
  );
}
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskSuspenseQueryHookResult = ReturnType<
  typeof useGetTaskSuspenseQuery
>;
export type GetTaskQueryResult = Apollo.QueryResult<
  GetTaskQuery,
  GetTaskQueryVariables
>;
