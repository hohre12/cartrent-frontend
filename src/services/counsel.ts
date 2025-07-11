import {
  CREATE_COUNSEL_MUTATION,
  DELETE_COUNSEL_MUTATION,
  UPDATE_COUNSEL_MUTATION,
} from '@/apollo/mutations/counsel';
import {
  GET_COUNSEL_QUERY,
  GET_COUNSELS_QUERY,
} from '@/apollo/queries/counsel';
import { GET_CUSTOMER_QUERY } from '@/apollo/queries/customer';
import {
  Counsel,
  CreateCounselDto,
  GetCounselsDto,
  UpdateCounselDto,
} from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';

export const useGetCounsels = (params: GetCounselsDto) => {
  return useQuery<
    { getCounsels: { data: Counsel[]; totalCount: number } },
    { getCounselsDto: GetCounselsDto }
  >(GET_COUNSELS_QUERY, {
    variables: { getCounselsDto: params },
    fetchPolicy: 'network-only',
  });
};

export const useGetCounsel = (params: Counsel['id']) => {
  return useQuery<{ getCounsel: Counsel }, { counselId: Counsel['id'] }>(
    GET_COUNSEL_QUERY,
    {
      variables: { counselId: params },
      skip: !params,
      fetchPolicy: 'network-only',
    },
  );
};

export const useCreateCounsel = () => {
  const [createCounselMutate] = useMutation(CREATE_COUNSEL_MUTATION, {
    refetchQueries: [GET_CUSTOMER_QUERY, 'GetCustomer'],
  });

  const createCounsel = async (params: CreateCounselDto) => {
    if (!params) return;
    return createCounselMutate({ variables: { createCounselDto: params } });
  };
  return { createCounsel };
};

export const useUpdateCounsel = () => {
  const [updateCounselMutate] = useMutation(UPDATE_COUNSEL_MUTATION, {
    refetchQueries: [GET_COUNSEL_QUERY, 'GetCounsel'],
  });

  const updateCounsel = async (params: UpdateCounselDto) => {
    if (!params) return;
    return updateCounselMutate({ variables: { updateCounselDto: params } });
  };
  return { updateCounsel };
};

export const useDeleteCounsel = () => {
  const [deleteCounselMutate] = useMutation(DELETE_COUNSEL_MUTATION, {
    refetchQueries: [GET_COUNSELS_QUERY, 'GetCounsels'],
  });

  const deleteCounsel = async (params: Counsel['id'][]) => {
    if (!params) return;
    return deleteCounselMutate({ variables: { counselIds: params } });
  };
  return { deleteCounsel };
};
