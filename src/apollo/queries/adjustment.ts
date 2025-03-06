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
    }
  }
`;
