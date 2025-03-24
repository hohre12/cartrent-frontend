import { gql } from '@apollo/client';

/* Mutation */
// 고객
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
  mutation DeleteCustomer($customerIds: [Int!]!) {
    deleteCustomer(customerIds: $customerIds)
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

// 고객그룹
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

// 고객등급
export const CREATE_CUSTOMER_GRADE_MUTATION = gql`
  mutation CreateCustomerGrade(
    $createCustomerGradeDto: CreateCustomerGradeDto!
  ) {
    createCustomerGrade(CreateCustomerGradeDto: $createCustomerGradeDto) {
      id
    }
  }
`;
export const UPDATE_CUSTOMER_GRADE_MUTATION = gql`
  mutation UpdateCustomerGrade(
    $updateCustomerGradeDto: UpdateCustomerGradeDto!
  ) {
    updateCustomerGrade(UpdateCustomerGradeDto: $updateCustomerGradeDto) {
      id
    }
  }
`;
export const DELETE_CUSTOMER_GRADE_MUTATION = gql`
  mutation DeleteCustomerGrade($customerGradeId: Float!) {
    deleteCustomerGrade(customerGradeId: $customerGradeId)
  }
`;

/* Mutation */
