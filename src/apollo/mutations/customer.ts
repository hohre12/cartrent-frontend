import { gql } from '@apollo/client';

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
