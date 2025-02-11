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
      created_at
      name
      phone
      memo
      note
      type
      contractList {
        carName
        division {
          name
        }
      }
      counselList {
        counselAt
      }
      customerGrade {
        name
      }
      userList {
        name
      }
      customerStatus {
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
      type
      created_at
      memo
      note
      userList {
        id
        name
      }
      customerGroup {
        id
        name
      }
      customerStatus {
        id
        status
      }
      contractList {
        id
        company_name_nominee
        division {
          name
        }
        carName
        carOption
        contractPeriod
        agreedMileage
      }
      customerGrade {
        id
        name
      }
      counselList {
        id
        counselAt
        customer {
          name
        }
        user {
          name
        }
        context
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
