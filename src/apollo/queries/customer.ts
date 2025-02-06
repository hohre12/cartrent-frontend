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
      product
      division
      memo
      type
      note
      status
      created_at
      counselList {
        id
        updated_at
      }
      contractList {
        id
        carName
      }
      customerGroup {
        id
        name
      }
      userList {
        id
        name
      }
      customerGrade {
        id
        name
      }
      customerStatus {
        id
        status
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
      created_at
      updated_at
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
        carName
        carOption
        contractPeriod
        agreedMileage
        collateralRate
      }
      customerGroup {
        id
        name
      }
      userList {
        id
        name
      }
      customerGrade {
        id
        name
      }
      customerStatus {
        id
        status
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
