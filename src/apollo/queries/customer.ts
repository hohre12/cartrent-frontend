import { gql } from '@apollo/client';

/* Query */
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
/* Query */

/* Mutation */
export const CREATE_CUSTOMER_MUTATION = gql`
  mutation CreateCustomer($createCustomerDto: CreateCustomerDto!) {
    createCustomer(createCustomerDto: $createCustomerDto) {
      id
    }
  }
`;
export const UPDATE_CUSTOMER_MUTATION = gql`
  mutation UpdateCustomer($updateCustomerDto: UpdateCustomerDto!) {
    updateCustomer(updateCustomerDto: $updateCustomerDto) {
      id
    }
  }
`;
export const DELETE_CUSTOMER_MUTATION = gql`
  mutation DeleteCustomer($customerId: Float!) {
    deleteCustomer(customerId: $customerId)
  }
`;
export const UPDATE_CUSTOMER_OF_USER_MUTATION = gql`
  mutation UpdateCustomerOfUser(
    $updateCustomerOfUserDto: UpdateCustomerOfUserDto!
  ) {
    updateCustomerOfUser(updateCustomerOfUserDto: $updateCustomerOfUserDto) {
      id
    }
  }
`;
export const CREATE_CUSTOMER_GROUP_MUTATION = gql`
  mutation CreateCustomerGroup(
    $createCustomerGroupDto: CreateCustomerGroupDto!
  ) {
    createCustomerGroup(CreateCustomerGroupDto: $createCustomerGroupDto) {
      id
    }
  }
`;
export const UPDATE_CUSTOMER_GROUP_MUTATION = gql`
  mutation UpdateCustomerGroup(
    $updateCustomerGroupDto: UpdateCustomerGroupDto!
  ) {
    updateCustomerGroup(UpdateCustomerGroupDto: $updateCustomerGroupDto) {
      id
    }
  }
`;
export const DELETE_CUSTOMER_GROUP_MUTATION = gql`
  mutation DeleteCustomerGroup($customerGroupId: Float!) {
    deleteCustomerGroup(customerGroupId: $customerGroupId)
  }
`;
/* Mutation */
