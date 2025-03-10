import {
  GET_PAYSTUB_QUERY,
  GET_PAYSTUBS_QUERY,
} from '@/apollo/queries/payStub';
import { GetPayStubDto, PayStub } from '@/types/graphql';
import { useQuery } from '@apollo/client';

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
