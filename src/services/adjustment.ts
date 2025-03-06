import { GET_ADJUSTMENTS_QUERY } from '@/apollo/queries/adjustment';
import { Adjustment, GetAdjustmentsDto } from '@/types/graphql';
import { useQuery } from '@apollo/client';

export const useGetAdjustments = (params: GetAdjustmentsDto) => {
  return useQuery<
    { getAdjustments: Adjustment[] },
    { getAdjustmentsDto: GetAdjustmentsDto }
  >(GET_ADJUSTMENTS_QUERY, {
    variables: { getAdjustmentsDto: params },
    fetchPolicy: 'network-only',
  });
};
