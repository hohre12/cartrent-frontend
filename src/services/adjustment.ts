import {
  CREATE_ADDITIONAL_INCENTIVE_MUTATION,
  DELETE_ADDITIONAL_INCENTIVE_MUTATION,
  UPDATE_ADDITIONAL_INCENTIVE_MUTATION,
} from '@/apollo/mutations/adjustment';
import {
  GET_ADJUSTMENTS_QUERY,
  MAKE_EXCEL_QUERY,
} from '@/apollo/queries/adjustment';
import {
  AdditionalIncentive,
  Adjustment,
  CreateAdditionalIncentiveDto,
  GetAdjustmentsDto,
  UpdateAdditionalIncentiveDto,
} from '@/types/graphql';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

export const useGetAdjustments = (params: GetAdjustmentsDto) => {
  return useQuery<
    { getAdjustments: Adjustment[] },
    { getAdjustmentsDto: GetAdjustmentsDto }
  >(GET_ADJUSTMENTS_QUERY, {
    variables: { getAdjustmentsDto: params },
    fetchPolicy: 'network-only',
  });
};

export const useMakeExcel = () => {
  return useLazyQuery(MAKE_EXCEL_QUERY);
};

export const useCreateAdditionalIncentive = () => {
  const [createAdditionalIncentiveMutate] = useMutation(
    CREATE_ADDITIONAL_INCENTIVE_MUTATION,
    {
      refetchQueries: [GET_ADJUSTMENTS_QUERY, 'GetAdjustments'],
    },
  );

  const createAdditionalIncentive = async (
    params: CreateAdditionalIncentiveDto,
  ) => {
    if (!params) return;
    return createAdditionalIncentiveMutate({
      variables: { createAdditionalIncentiveDto: params },
    });
  };
  return { createAdditionalIncentive };
};

export const useUpdateAdditionalIncentive = () => {
  const [updateAdditionalIncentiveMutate] = useMutation(
    UPDATE_ADDITIONAL_INCENTIVE_MUTATION,
    {
      refetchQueries: [GET_ADJUSTMENTS_QUERY, 'GetAdjustments'],
    },
  );

  const updateAdditionalIncentive = async (
    params: UpdateAdditionalIncentiveDto,
  ) => {
    if (!params) return;
    return updateAdditionalIncentiveMutate({
      variables: { updateAdditionalIncentiveDto: params },
    });
  };
  return { updateAdditionalIncentive };
};

export const useDeleteAdditionalIncentive = () => {
  const [deleteAdditionalIncentiveMutate] = useMutation(
    DELETE_ADDITIONAL_INCENTIVE_MUTATION,
    {
      refetchQueries: [GET_ADJUSTMENTS_QUERY, 'GetAdjustments'],
    },
  );

  const deleteAdditionalIncentive = async (
    params: AdditionalIncentive['id'],
  ) => {
    if (!params) return;
    return deleteAdditionalIncentiveMutate({
      variables: { additionalIncentiveId: params },
    });
  };
  return { deleteAdditionalIncentive };
};
