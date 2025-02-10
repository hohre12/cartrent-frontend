import { CREATE_CONTRACT_MUTATION } from '@/apollo/mutations/contract';
import {
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
