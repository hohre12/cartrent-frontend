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
      etcIncentive
      additionalIncentive {
        id
        additionalIncentive
      }
    }
  }
`;

/**
 * 정산 엑셀 다운로드
 */
export const MAKE_EXCEL_QUERY = gql`
  query MakeExcel($year: String!, $month: String!) {
    makeExcel(year: $year, month: $month)
  }
`;
