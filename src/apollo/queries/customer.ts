import { gql } from '@apollo/client';

/**
 * 고객 목록 쿼리
 * - 고객 목록 호출
 */
export const GET_CUSTOMERS_QUERY = gql`
  query GetCustomers($getCustomersDto: GetCustomersDto!) {
    getCustomers(getCustomersDto: $getCustomersDto) {
      address
      birth
      created_at
      customer_group_id
      deleted_at
      email
      id
      job
      name
      phone
      status
      updated_at
    }
  }
`;

/**
 * 고객 상세 쿼리
 * - 고객 상세 호출
 */
export const GET_CUSTOMER_QUERY = gql`
  query GetCustomer($customerId: Float!) {
    getCustomer(customerId: $customerId) {
      address
      birth
      created_at
      customer_group_id
      deleted_at
      email
      id
      job
      name
      phone
      status
      updated_at
      user_id
    }
  }
`;

/**
 * 고객 그룹 쿼리
 * - 고객 그룹 호출
 */
export const GET_CUSTOMER_GROUP_QUERY = gql`
  query GetCustomerGroups {
    getCustomerGroups {
      created_at
      deleted_at
      id
      name
      updated_at
    }
  }
`;
