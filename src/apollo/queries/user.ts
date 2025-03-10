import { gql } from '@apollo/client';

export const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
      position {
        id
        name
      }
      role {
        id
        name
      }
      created_at
      updated_at
    }
  }
`;

export const GET_USER_QUERY = gql`
  query GetUser($userId: Float!) {
    getUser(userId: $userId) {
      id
      name
      email
      position {
        id
        name
      }
      role {
        id
        name
      }
      created_at
      updated_at
    }
  }
`;

export const GET_POSITIONS_QUERY = gql`
  query GetPositions {
    getPositions {
      id
      name
      created_at
      updated_at
      deleted_at
    }
  }
`;

// 월별 계약 1위 직원
export const GET_FIRST_CONTRACT_USER_BY_MONTH = gql`
  query GetFirstContractUserByMonth(
    $getFirstContractUserByMonthDto: GetRevenuesByUsersDto!
  ) {
    getFirstContractUserByMonth(
      getFirstContractUserByMonthDto: $getFirstContractUserByMonthDto
    ) {
      id
      name
    }
  }
`;

// 월별 매출 1위 직원
export const GET_FIRST_REVENUE_USER_BY_MONTH = gql`
  query GetFirstRevenueUserByMonth(
    $getFirstRevenueUserByMonthDto: GetRevenuesByUsersDto!
  ) {
    getFirstRevenueUserByMonth(
      getFirstRevenueUserByMonthDto: $getFirstRevenueUserByMonthDto
    ) {
      id
      name
    }
  }
`;
