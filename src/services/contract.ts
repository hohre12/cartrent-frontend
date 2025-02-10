import { GET_CONTRACTS_QUERY } from '@/apollo/queries/contract';
import { Contract, GetContractsDto } from '@/types/graphql';
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

// export const useCreateCountract = () => {
//   const [createContractMutate] = useMutation(CREATE_CONCRACT_MUTATION, {
//     refetchQueries: [GET_COUNSELS_QUERY, 'GetCounsels'],
//   });

//   const createCounsel = async (params: CreateCounselDto) => {
//     if (!params) return;
//     return createCounselMutate({ variables: { createCounselDto: params } });
//   };
//   return { createCounsel };
// };
