import { gql } from "@apollo/client";

//Fetch user-------------
export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      fullName
      email
      type
      createdAt
      updatedAt
    }
  }
`;
