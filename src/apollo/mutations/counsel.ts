import { gql } from '@apollo/client';

/* Mutation */
export const CREATE_COUNSEL_MUTATION = gql`
  mutation CreateCounsel($createCounselDto: CreateCounselDto!) {
    createCounsel(createCounselDto: $createCounselDto) {
      id
    }
  }
`;

export const UPDATE_COUNSEL_MUTATION = gql`
  mutation UpdateCounsel($updateCounselDto: UpdateCounselDto!) {
    updateCounsel(updateCounselDto: $updateCounselDto) {
      id
    }
  }
`;

export const DELETE_COUNSEL_MUTATION = gql`
  mutation DeleteCounsel($counselIds: [Int!]!) {
    deleteCounsel(counselIds: $counselIds)
  }
`;
/* Mutation */
