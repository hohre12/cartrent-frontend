import { GET_CONTRACTS_QUERY } from '@/apollo/queries/contract';
import { Contract, GetContractsDto } from '@/types/graphql';
import { useQuery } from '@apollo/client';

export const useGetContracts = (params: GetContractsDto) => {
  return useQuery<
    { getContracts: Contract[] },
    { getContractsDto: GetContractsDto }
  >(GET_CONTRACTS_QUERY, {
    variables: { getContractsDto: params },
  });
};
