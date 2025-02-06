import { gql } from '@apollo/client';

/* Mutation */
export const CREATE_COUNSEL_MUTATION = gql`
  mutation CreateCounsel($createCounselDto: CreateCounselDto!) {
    createCounsel(createCounselDto: $createCounselDto) {
      id
    }
  }
`;
/* Mutation */
