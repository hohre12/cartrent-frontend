/* Query */

import { gql } from '@apollo/client';

/**
 * 정산 목록 쿼리
 * - 정산 목록 호출
 */
export const GET_ADJUSTMENTS_QUERY = gql`
  query GetAdjustments($getAdjustmentsDto: GetAdjustmentsDto!) {
    getAdjustments(getAdjustmentsDto: $getAdjustmentsDto) {
      year
      month
      user {
        id
        name
        position {
          id
          name
        }
      }
      totalCountContract
      totalFeeContract
      totalExpenditureContract
      totalNetIncomeContract
      totalIncentiveContract
      totalCountDelivery
      totalFeeDelivery
      totalExpenditureDelivery
      totalNetIncomeDelivery
      totalIncentiveDelivery
      totalBusinessExpensesContract
      totalBusinessExpensesDelivery
      etcIncentive
      additionalIncentive {
        id
        additionalIncentive
      }
      bonus {
        id
        bonus
      }
    }
  }
`;

/**
 * 엑셀 다운로드 (정산목록, 출고목록 공통 사용)
 * 2025-12-23: 출고목록에서도 사용
 */
export const MAKE_EXCEL_QUERY = gql`
  query MakeExcel($year: String!, $month: String!, $email: String!) {
    makeExcel(year: $year, month: $month, email: $email)
  }
`;
