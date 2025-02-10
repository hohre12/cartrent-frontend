import { CREATE_CONTRACT_MUTATION } from '@/apollo/mutations/contract';
import { GET_CONTRACTS_QUERY } from '@/apollo/queries/contract';
import { Contract, CreateContractDto, GetContractsDto } from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';

export const useGetContracts = (params: GetContractsDto) => {
  return useQuery<
    { getContracts: Contract[] },
    { getContractsDto: GetContractsDto }
  >(GET_CONTRACTS_QUERY, {
    variables: { getContractsDto: params },
    fetchPolicy: 'network-only',
  });
};

export const useCreateCountract = () => {
  const [createContractMutate] = useMutation(CREATE_CONTRACT_MUTATION, {
    refetchQueries: [GET_CONTRACTS_QUERY, 'GetContracts'],
  });

  const createContractMutation = async (params: CreateContractDto) => {
    if (!params) return;
    return createContractMutate({ variables: { createContractDto: params } });
  };
  return { createContractMutation };
};
