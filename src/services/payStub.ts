import { CREATE_PAY_STUB_MUTATION } from '@/apollo/mutations/payStub';
import {
  CHECK_SETTLE_CONTRACT_QUERY,
  GET_PAYSTUB_QUERY,
  GET_PAYSTUBS_QUERY,
} from '@/apollo/queries/payStub';
import {
  CheckSettleContractDto,
  CreatePayStubDto,
  GetPayStubDto,
  PayStub,
} from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';

export const useGetPayStubs = (params: GetPayStubDto) => {
  return useQuery<{ getPayStubs: PayStub[] }, { getPayStubDto: GetPayStubDto }>(
    GET_PAYSTUBS_QUERY,
    {
      variables: { getPayStubDto: params },
      fetchPolicy: 'network-only',
    },
  );
};

export const useGetPayStub = (params: PayStub['id']) => {
  return useQuery<{ getPayStub: PayStub }, { payStubId: PayStub['id'] }>(
    GET_PAYSTUB_QUERY,
    {
      variables: { payStubId: params },
      skip: !params,
      fetchPolicy: 'network-only',
    },
  );
};

export const useCreatePayStub = () => {
  const [createPayStubMutate] = useMutation(CREATE_PAY_STUB_MUTATION, {
    refetchQueries: [GET_PAYSTUBS_QUERY, 'GetPayStubs'],
  });

  const createPayStub = async (params: CreatePayStubDto) => {
    if (!params) return;
    return createPayStubMutate({
      variables: { createPayStubDto: params },
    });
  };
  return { createPayStub };
};

export const useCheckSettleContract = (params: CheckSettleContractDto) => {
  return useQuery<
    { checkSettleContract: boolean },
    { checkSettleContractDto: CheckSettleContractDto }
  >(CHECK_SETTLE_CONTRACT_QUERY, {
    variables: { checkSettleContractDto: params },
    fetchPolicy: 'network-only',
  });
};
