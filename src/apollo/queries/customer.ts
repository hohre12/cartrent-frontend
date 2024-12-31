import { gql } from '@apollo/client';

/**
 * 고객 목록 쿼리
 * - 고객 목록 호출
 */
export const GET_CUSTOMERS_QUERY = gql`
  query GetCustomers($getCustomersDto: GetCustomersDto!) {
    getCustomers(getCustomersDto: $getCustomersDto) {
      id
      name
      phone
      email
      birth
      address
      job
      status
      user_id
      customer_group_id
      created_at
      updated_at
      deleted_at
      counselList {
        id
      }
      contractList {
        id
      }
      customerGroup {
        id
      }
      userList {
        id
      }
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
      id
      name
      phone
      email
      birth
      address
      job
      status
      user_id
      customer_group_id
      created_at
      updated_at
      deleted_at
      counselList {
        id
      }
      contractList {
        id
      }
      customerGroup {
        id
      }
      userList {
        id
      }
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
      id
      name
      created_at
      updated_at
      deleted_at
    }
  }
`;
