import { gql } from '@apollo/client';

/* Query */
/**
 * 계약 목록 쿼리
 * - 계약 목록 호출
 */
export const GET_CONTRACTS_QUERY = gql`
  query GetContracts($getContractsDto: GetContractsDto!) {
    getContracts(getContractsDto: $getContractsDto) {
      id
      context
      status
      totalPrice
      color
      extraPrice
      bank
      contractType
      isVATSupport
      interChangeFee
      feeRate
      fee
      car_model_id
      city_id
      user_id
      customer_id
      contract_at
      shipping_date
      created_at
      updated_at
      deleted_at
      user {
        id
      }
      customer {
        id
      }
      carModel {
        id
      }
      city {
        id
      }
      carOptions {
        id
      }
    }
  }
`;

/**
 * 계약 상세 쿼리
 * - 계약 상세 호출
 */
export const GET_CONTRACT_QUERY = gql`
  query GetContracts($contractId: Float!) {
    getContract(contractId: $contractId) {
      id
      context
      status
      totalPrice
      color
      extraPrice
      bank
      contractType
      isVATSupport
      interChangeFee
      feeRate
      fee
      car_model_id
      city_id
      user_id
      customer_id
      contract_at
      shipping_date
      created_at
      updated_at
      deleted_at
      user {
        id
      }
      customer {
        id
      }
      carModel {
        id
      }
      city {
        id
      }
      carOptions {
        id
      }
    }
  }
`;
/* Query */
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
