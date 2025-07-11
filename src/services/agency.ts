import { GET_AGENCY_CONTRACTS_QUERY } from '@/apollo/queries/agency';
import { Contract, GetAgencyContractsDto } from '@/types/graphql';
import { useQuery } from '@apollo/client';

export const useGetAgencyContracts = (params: GetAgencyContractsDto) => {
  return useQuery<
    { getAgencyContracts: Contract[]; totalCount: number },
    { getAgencyContractsDto: GetAgencyContractsDto }
  >(GET_AGENCY_CONTRACTS_QUERY, {
    variables: { getAgencyContractsDto: params },
    fetchPolicy: 'network-only',
  });
};
