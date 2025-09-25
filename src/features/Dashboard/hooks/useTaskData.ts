import { useMutation, useQuery } from "@apollo/client";
import type {
  GetStatusQuery,
  GetTaskQuery,
  GetTaskQueryVariables,
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from "../../../generated/graphql";
import { GET_STATUS, GET_TASK, UPDATE_TASK } from "../../../queries/TaskQuery";

export const useTaskData = (
  filters: GetTaskQueryVariables,
  userLoading: boolean = false,
  userError?: string,
) => {
  //Queries -----------------------------
  //Get all task query
  const { data, loading, error } = useQuery<
    GetTaskQuery,
    GetTaskQueryVariables
  >(GET_TASK, {
    variables: {
      //Sends the filter parameters to the query
      input: filters.input,
    }, //Context for rebounce to avoid multiple queries
    context: {
      debounceKey: "search-tasks",
    },
  });

  //Get all status options query, for the columns
  const {
    data: statusList,
    loading: statusLoading,
    error: statusError,
  } = useQuery<GetStatusQuery>(GET_STATUS);
  const [UpdateTaskMutation] = useMutation<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >(UPDATE_TASK);

  //Consts---------------------------

  //Checks if any query is loading
  const isLoading = loading || statusLoading || userLoading;
  //Checks if any query threw an error
  const errorMessage = error?.message || userError || statusError?.message;

  return {
    data,
    statusList,
    isLoading,
    errorMessage,
    UpdateTaskMutation,
  };
};
