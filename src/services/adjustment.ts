import {
  CREATE_ADDITIONAL_INCENTIVE_MUTATION,
  CREATE_BONUS_MUTATION,
  DELETE_ADDITIONAL_INCENTIVE_MUTATION,
  DELETE_BONUS_MUTATION,
  UPDATE_ADDITIONAL_INCENTIVE_MUTATION,
  UPDATE_BONUS_MUTATION,
} from '@/apollo/mutations/adjustment';
import {
  GET_ADJUSTMENTS_QUERY,
  MAKE_EXCEL_QUERY, // 2025-12-23: 정산목록, 출고목록 공통 사용
} from '@/apollo/queries/adjustment';
import {
  AdditionalIncentive,
  Adjustment,
  Bonus,
  CreateAdditionalIncentiveDto,
  CreateBonusDto,
  GetAdjustmentsDto,
  UpdateAdditionalIncentiveDto,
  UpdateBonusDto,
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

// 2025-12-23: 정산목록, 출고목록 공통 사용
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

// 상여금 CUD
export const useCreateBonus = () => {
  const [createBonusMutate] = useMutation(CREATE_BONUS_MUTATION, {
    refetchQueries: [GET_ADJUSTMENTS_QUERY, 'GetAdjustments'],
  });

  const createBonus = async (params: CreateBonusDto) => {
    if (!params) return;
    return createBonusMutate({
      variables: { createBonusDto: params },
    });
  };
  return { createBonus };
};

export const useUpdateBonus = () => {
  const [updateBonusMutate] = useMutation(UPDATE_BONUS_MUTATION, {
    refetchQueries: [GET_ADJUSTMENTS_QUERY, 'GetAdjustments'],
  });

  const updateBonus = async (params: UpdateBonusDto) => {
    if (!params) return;
    return updateBonusMutate({
      variables: { updateBonusDto: params },
    });
  };
  return { updateBonus };
};

export const useDeleteBonus = () => {
  const [deleteBonusMutate] = useMutation(DELETE_BONUS_MUTATION, {
    refetchQueries: [GET_ADJUSTMENTS_QUERY, 'GetAdjustments'],
  });

  const deleteBonus = async (params: Bonus['id']) => {
    if (!params) return;
    return deleteBonusMutate({
      variables: { bonusId: params },
    });
  };
  return { deleteBonus };
};
