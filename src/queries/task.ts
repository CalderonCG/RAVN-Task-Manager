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
      e
      tags
    }
  }
`;

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
