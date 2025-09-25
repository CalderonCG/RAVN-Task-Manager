import { useQuery } from "@apollo/client";
import type {
  GetPointsQuery,
  GetStatusQuery,
  GetTagsQuery,
  GetUsersQuery,
} from "../../../generated/graphql";
import {
  GET_POINTS,
  GET_STATUS,
  GET_TAGS,
  GET_USERS,
} from "../../../queries/TaskQuery";

export const useDropdownData = () => {
  //Queries to map the dropdown options
  const {
    data: dataTags,
    loading: loadingTags,
    error: errorTags,
  } = useQuery<GetTagsQuery>(GET_TAGS);
  const {
    data: dataPoints,
    loading: loadingPoints,
    error: errorPoints,
  } = useQuery<GetPointsQuery>(GET_POINTS);
  const {
    data: dataUsers,
    loading: loadingUsers,
    error: errorUsers,
  } = useQuery<GetUsersQuery>(GET_USERS);
  const {
    data: dataStatus,
    loading: loadingStatus,
    error: errorStatus,
  } = useQuery<GetStatusQuery>(GET_STATUS);

  const isLoading =
    loadingPoints || loadingStatus || loadingTags || loadingUsers;

  return {
    dataPoints,
    errorPoints,
    dataStatus,
    errorStatus,
    dataTags,
    errorTags,
    dataUsers,
    errorUsers,
    isLoading,
  };
};
