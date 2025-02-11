import { gql } from '@apollo/client';

/* Mutation */
export const CREATE_CONTRACT_MUTATION = gql`
  mutation CreateContract($createContractDto: CreateContractDto!) {
    createContract(createContractDto: $createContractDto) {
      id
    }
  }
`;

export const UPDATE_CONTRACT_MUTATION = gql`
  mutation UpdateContract($updateContractDto: UpdateContractDto!) {
    updateContract(updateContractDto: $updateContractDto) {
      id
    }
  }
`;

export const DELETE_CONTRACT_MUTATION = gql`
  mutation DeleteContract($contractIds: [Int!]!) {
    deleteContract(contractIds: $contractIds)
  }
`;
/* Mutation */
