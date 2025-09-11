import { gql } from "@apollo/client";

//Fetch all task
export const GET_TASK = gql`
  query GetTask {
    tasks(input: {}) {
      id
      name
      status
      dueDate
      assignee {
        id
        fullName
        avatar
      }
    }
  }
`;
