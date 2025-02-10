import { gql } from '@apollo/client';

export const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
      created_at
      updated_at
    }
  }
`;
