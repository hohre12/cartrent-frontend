import {
  CREATE_CONTRACT_MUTATION,
  DELETE_CONTRACT_MUTATION,
  UPDATE_CONTRACT_MUTATION,
} from '@/apollo/mutations/contract';
import {
  GET_CONTRACT_QUERY,
  GET_CONTRACTS_QUERY,
  GET_DIVISIONS_QUERY,
  GET_FINANCIAL_COMPANIES_QUERY,
  GET_SHIPPING_METHODS_QUERY,
} from '@/apollo/queries/contract';
import {
  Contract,
  CreateContractDto,
  Division,
  FinancialCompany,
  GetContractsDto,
  ShippingMethod,
  UpdateContractDto,
} from '@/types/graphql';
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

export const useGetContract = (params: Contract['id']) => {
  return useQuery<{ getContract: Contract }, { contractId: Contract['id'] }>(
    GET_CONTRACT_QUERY,
    {
      variables: { contractId: params },
      skip: !params,
      fetchPolicy: 'network-only',
    },
  );
};

export const useGetFinancialCompanies = () => {
  return useQuery<{ getFinancialCompanies: FinancialCompany[] }>(
    GET_FINANCIAL_COMPANIES_QUERY,
  );
};

export const useGetDivisions = () => {
  return useQuery<{ getDivisions: Division[] }>(GET_DIVISIONS_QUERY);
};

export const useGetShippingMethods = () => {
  return useQuery<{ getShippingMethods: ShippingMethod[] }>(
    GET_SHIPPING_METHODS_QUERY,
  );
};

export const useCreateContract = () => {
  const [createContractMutate] = useMutation(CREATE_CONTRACT_MUTATION, {
    refetchQueries: [GET_CONTRACTS_QUERY, 'GetContracts'],
  });

  const createContractMutation = async (params: CreateContractDto) => {
    if (!params) return;
    return createContractMutate({ variables: { createContractDto: params } });
  };
  return { createContractMutation };
};

export const useUpdateContract = () => {
  const [updateContractMutate] = useMutation(UPDATE_CONTRACT_MUTATION, {
    refetchQueries: [GET_CONTRACT_QUERY, 'GetContract'],
  });

  const updateContractMutation = async (params: UpdateContractDto) => {
    if (!params) return;
    return updateContractMutate({ variables: { updateContractDto: params } });
  };
  return { updateContractMutation };
};

export const useDeleteContract = () => {
  const [deleteContractMutate] = useMutation(DELETE_CONTRACT_MUTATION, {
    refetchQueries: [GET_CONTRACTS_QUERY, 'GetContracts'],
  });

  const deleteContractMutation = async (params: Contract['id'][]) => {
    if (!params) return;
    return deleteContractMutate({ variables: { contractIds: params } });
  };
  return { deleteContractMutation };
};
