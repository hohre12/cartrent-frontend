import { gql } from '@apollo/client';

/**
 * 계약 목록 쿼리
 * - 계약 목록 호출
 */
export const GET_CONTRACTS_QUERY = gql`
  query GetContracts($getContractDto: GetContractsDto!) {
    getContracts(getContractDto: $getContractDto) {
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
