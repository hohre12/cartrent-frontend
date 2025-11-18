import {
  CREATE_POSITION_INCENTIVE_MUTATION,
  DELETE_POSITION_INCENTIVE_MUTATION,
  UPDATE_POSITION_INCENTIVE_MUTATION,
} from '@/apollo/mutations/positionIncentive';
import {
  GET_POSITION_INCENTIVES_QUERY,
  GET_POSITION_INCENTIVE_QUERY,
} from '@/apollo/queries/positionIncentive';
import { PositionIncentive } from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';

export const useGetPositionIncentives = (params: {
  limit: number;
  offset?: number;
}) => {
  return useQuery<
    { getPositionIncentives: PositionIncentive[] },
    { limit: number; offset?: number }
  >(GET_POSITION_INCENTIVES_QUERY, {
    variables: params,
    fetchPolicy: 'network-only',
  });
};

export const useGetPositionIncentive = (
  params: PositionIncentive['id'] | null,
) => {
  return useQuery<
    { getPositionIncentive: PositionIncentive },
    { positionIncentiveId: number }
  >(GET_POSITION_INCENTIVE_QUERY, {
    variables: { positionIncentiveId: params as number },
    skip: !params,
    fetchPolicy: 'network-only',
  });
};

export const useCreatePositionIncentive = () => {
  const [createPositionIncentiveMutate] = useMutation(
    CREATE_POSITION_INCENTIVE_MUTATION,
    {
      refetchQueries: [GET_POSITION_INCENTIVES_QUERY, 'GetPositionIncentives'],
    },
  );

  const createPositionIncentive = async (params: {
    positionId: number;
    minThreshold: number;
    maxThreshold: number;
    positionIncentiveRate: number;
  }) => {
    if (!params) return;
    return createPositionIncentiveMutate({
      variables: params,
    });
  };
  return { createPositionIncentive };
};

export const useUpdatePositionIncentive = () => {
  const [updatePositionIncentiveMutate] = useMutation(
    UPDATE_POSITION_INCENTIVE_MUTATION,
    {
      refetchQueries: [
        GET_POSITION_INCENTIVES_QUERY,
        GET_POSITION_INCENTIVE_QUERY,
      ],
    },
  );

  const updatePositionIncentive = async (params: {
    positionIncentiveId: number;
    positionId: number;
    minThreshold: number;
    maxThreshold: number;
    positionIncentiveRate: number;
  }) => {
    if (!params) return;
    return updatePositionIncentiveMutate({
      variables: params,
    });
  };
  return { updatePositionIncentive };
};

export const useDeletePositionIncentive = () => {
  const [deletePositionIncentiveMutate] = useMutation(
    DELETE_POSITION_INCENTIVE_MUTATION,
    {
      refetchQueries: [GET_POSITION_INCENTIVES_QUERY],
    },
  );

  const deletePositionIncentive = async (
    params: PositionIncentive['id'],
  ) => {
    if (!params) return;
    return deletePositionIncentiveMutate({
      variables: { positionIncentiveId: params },
    });
  };
  return { deletePositionIncentive };
};
