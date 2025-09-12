import { gql } from "@apollo/client";

//Fetch all task
export const GET_TASK = gql`
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

//Fetch all users
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      fullName
    }
  }
`;

//Create new task
export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      name
      status
      pointEstimate
      dueDate
      assignee {
        id
        fullName
      }
      tags
    }
  }
`;

//Enum queries-------------------------------------------
//Status
export const GET_STATUS = gql`
  query GetStatus {
    __type(name: "Status") {
      name
      enumValues {
        name
      }
    }
  }
`;

//Tags
export const GET_TAGS = gql`
  query GetTags {
    __type(name: "TaskTag") {
      name
      enumValues {
        name
      }
    }
  }
`;

//Estimate points-
export const GET_POINTS = gql`
  query GetPoints {
    __type(name: "PointEstimate") {
      name
      enumValues {
        name
      }
    }
  }
`;
