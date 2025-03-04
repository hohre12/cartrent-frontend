import { GET_DELIVERIES_QUERY } from '@/apollo/queries/delivery';
import { Contract, GetDeliveriesDto } from '@/types/graphql';
import { useQuery } from '@apollo/client';

export const useGetDeliveries = (params: GetDeliveriesDto) => {
  return useQuery<
    { getDeliveries: Contract[] },
    { getDeliveriesDto: GetDeliveriesDto }
  >(GET_DELIVERIES_QUERY, {
    variables: { getDeliveriesDto: params },
    fetchPolicy: 'network-only',
  });
};
