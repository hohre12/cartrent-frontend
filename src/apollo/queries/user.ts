import { gql } from '@apollo/client';

export const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
      password
      hireDate
      birthDate
      phone
      salesPhone
      fax
      englishName
      salaryAccount
      bank
      position {
        id
        name
      }
      role {
        id
        name
      }
      customers {
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
      password
      hireDate
      birthDate
      phone
      salesPhone
      fax
      englishName
      salaryAccount
      bank
      position {
        id
        name
      }
      role {
        id
        name
      }
      team {
        id
        name
      }
      customers {
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

// 월별 출고건수 top5 유저
export const GET_TOP_FIVE_DELIVERY_USERS_BY_MONTH = gql`
  query GetTopFiveDeliveryUsersByMonth(
    $getTopFiveDeliveryUsersByMonthDto: GetDashBoardByUsersDto!
  ) {
    getTopFiveDeliveryUsersByMonth(
      getTopFiveDeliveryUsersByMonthDto: $getTopFiveDeliveryUsersByMonthDto
    ) {
      user {
        id
        name
      }
      year
      month
      totalCountDelivery
      totalFeeDelivery
    }
  }
`;

// 월별 매출 top5 유저
export const GET_TOP_FIVE_TOTAL_FEE_DELIVERY_USERS_BY_MONTH = gql`
  query GetTopFiveTotalFeeDeliveryUsersByMonth(
    $getTopFiveTotalFeeDeliveryUsersByMonthDto: GetDashBoardByUsersDto!
  ) {
    getTopFiveTotalFeeDeliveryUsersByMonth(
      getTopFiveTotalFeeDeliveryUsersByMonthDto: $getTopFiveTotalFeeDeliveryUsersByMonthDto
    ) {
      user {
        id
        name
      }
      year
      month
      totalFeeDelivery
      totalCountDelivery
    }
  }
`;

// 월별 계약순익 집계 (전체 직원)
export const GET_MONTHLY_TOTAL_NET_INCOME_USERS_BY_MONTH = gql`
  query GetMonthlyTotalNetIncomeUsersByMonth(
    $getMonthlyTotalNetIncomeUsersByMonthDto: GetDashBoardByUsersDto!
  ) {
    getMonthlyTotalNetIncomeUsersByMonth(
      getMonthlyTotalNetIncomeUsersByMonthDto: $getMonthlyTotalNetIncomeUsersByMonthDto
    ) {
      user {
        id
        name
      }
      year
      month
      totalCountContract
      totalNetIncomeContract
    }
  }
`;
