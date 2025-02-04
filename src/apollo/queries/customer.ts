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
      sub_phone
      product
      division
      company_name_nominee
      memo
      type
      note
      status
      user_id
      customer_group_id
      customer_grade_id
      customer_status_id
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
      customerGrade {
        id
      }
      customerStatus {
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
      sub_phone
      product
      division
      company_name_nominee
      memo
      type
      note
      status
      user_id
      customer_group_id
      customer_grade_id
      customer_status_id
      created_at
      updated_at
      deleted_at
      counselList {
        context
        created_at
        updated_at
        user {
          name
        }
        customer {
          name
        }
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
      customerGrade {
        id
      }
      customerStatus {
        id
      }
    }
  }
`;

/**
 * 고객 그룹 리스트 쿼리
 * - 고객 그룹 리스트 호출
 */
export const GET_CUSTOMER_GROUPS_QUERY = gql`
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

/**
 * 고객 등급 리스트 쿼리
 * - 고객 등급 리스트 호출
 */
export const GET_CUSTOMER_GRADES_QUERY = gql`
  query GetCustomerGrades {
    getCustomerGrades {
      id
      name
      created_at
      updated_at
      deleted_at
    }
  }
`;

/**
 * 고객 상태 리스트 쿼리
 * - 고객 상태 리스트 호출
 */
export const GET_CUSTOMER_STATUSES_QUERY = gql`
  query GetCustomerStatuses {
    getCustomerStatuses {
      id
      status
    }
  }
`;
/* Query */
