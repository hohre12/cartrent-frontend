/* Query */

import { gql } from '@apollo/client';

/**
 * 출고 목록 쿼리
 * - 출고 목록 호출
 */
export const GET_DELIVERIES_QUERY = gql`
  query GetDeliveries($getDeliveriesDto: GetDeliveriesDto!) {
    getDeliveries(getDeliveriesDto: $getDeliveriesDto) {
      id
      contractAt
      shippingDate
      customer {
        id
        name
      }
      user {
        id
        name
      }
      financialCompany {
        id
        name
      }
      division {
        id
        name
      }
      carName
      carPrice
      fee
      promotion
      shippingMethod {
        id
        name
      }
    }
  }
`;
