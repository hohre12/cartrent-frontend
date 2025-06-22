import {
  GET_CUSTOMER_TAXES_QUERY,
  GET_USER_INCENTIVE_DELIVERY_TEXES_QUERY,
} from '@/apollo/queries/tax';
import {
  Contract,
  GetCustomerTaxesDto,
  GetUserIncentiveDeliveryTaxesDto,
  UserIncentiveDeliveryTax,
} from '@/types/graphql';
import { useQuery } from '@apollo/client';

export const useGetUserIncentiveDeliveryTaxes = (
  params: GetUserIncentiveDeliveryTaxesDto,
) => {
  return useQuery<
    { getUserIncentiveDeliveryTaxes: UserIncentiveDeliveryTax[] },
    { getUserIncentiveDeliveryTaxesDto: GetUserIncentiveDeliveryTaxesDto }
  >(GET_USER_INCENTIVE_DELIVERY_TEXES_QUERY, {
    variables: { getUserIncentiveDeliveryTaxesDto: params },
    fetchPolicy: 'network-only',
  });
};

export const useGetCustomerTaxes = (params: GetCustomerTaxesDto) => {
  return useQuery<
    { getCustomerTaxes: Contract[] },
    { getCustomerTaxesDto: GetCustomerTaxesDto }
  >(GET_CUSTOMER_TAXES_QUERY, {
    variables: { getCustomerTaxesDto: params },
    fetchPolicy: 'network-only',
  });
};
