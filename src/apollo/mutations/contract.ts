import { gql } from '@apollo/client';

/* Mutation */
export const UPDATE_CONTRACT_MUTATION = gql`
  mutation UpdateContract($updateContractDto: UpdateContractDto!) {
    updateContract(updateContractDto: $updateContractDto) {
      id
    }
  }
`;
export const UPDATE_CONTRACT_STATUS_MUTATION = gql`
  mutation UpdateContractStatus(
    $updateContractStatus: UpdateContractStatusDto!
  ) {
    updateContractStatus(updateContractStatus: $updateContractStatus) {
      id
    }
  }
`;
/* Mutation */
