import { gql } from "@apollo/client";

export const GET_PEOPLES_QUERY = gql`
  query GetPeoples($filter: String) {
    people(filter: $filter) {
      id
      createdAt
      status
      fullName
      profilePicture
    }
  }
`;
