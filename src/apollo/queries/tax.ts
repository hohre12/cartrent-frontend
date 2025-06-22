import { gql } from '@apollo/client';

export const GET_USER_INCENTIVE_DELIVERY_TEXES_QUERY = gql`
  query GetUserIncentiveDeliveryTaxes(
    $getUserIncentiveDeliveryTaxesDto: GetUserIncentiveDeliveryTaxesDto!
  ) {
    getUserIncentiveDeliveryTaxes(
      getUserIncentiveDeliveryTaxesDto: $getUserIncentiveDeliveryTaxesDto
    ) {
      year
      month
      totalIncentiveDelivery
      additionalIncentive {
        id
        additionalIncentive
      }
      etcIncentive
      bonus {
        id
        bonus
      }
      totalBusinessExpenses
      user {
        id
      }
    }
  }
`;

export const GET_CUSTOMER_TAXES_QUERY = gql`
  query GetCustomerTaxes($getCustomerTaxesDto: GetCustomerTaxesDto!) {
    getCustomerTaxes(getCustomerTaxesDto: $getCustomerTaxesDto) {
      cashAssistance
      id
      incomeEarner
    }
  }
`;
