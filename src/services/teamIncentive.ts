import {
  CREATE_TEAM_INCENTIVE_MUTATION,
  DELETE_TEAM_INCENTIVE_MUTATION,
  UPDATE_TEAM_INCENTIVE_MUTATION,
} from '@/apollo/mutations/teamIncentive';
import {
  GET_TEAM_INCENTIVES_QUERY,
  GET_TEAM_INCENTIVE_QUERY,
} from '@/apollo/queries/teamIncentive';
import { TeamIncentive } from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';

export const useGetTeamIncentives = (params: {
  limit: number;
  offset?: number;
}) => {
  return useQuery<
    { getTeamIncentives: TeamIncentive[] },
    { limit: number; offset?: number }
  >(GET_TEAM_INCENTIVES_QUERY, {
    variables: params,
    fetchPolicy: 'network-only',
  });
};

export const useGetTeamIncentive = (params: TeamIncentive['id'] | null) => {
  return useQuery<
    { getTeamIncentive: TeamIncentive },
    { teamIncentiveId: number }
  >(GET_TEAM_INCENTIVE_QUERY, {
    variables: { teamIncentiveId: params as number },
    skip: !params,
    fetchPolicy: 'network-only',
  });
};

export const useCreateTeamIncentive = () => {
  const [createTeamIncentiveMutate] = useMutation(
    CREATE_TEAM_INCENTIVE_MUTATION,
    {
      refetchQueries: [GET_TEAM_INCENTIVES_QUERY, 'GetTeamIncentives'],
    },
  );

  const createTeamIncentive = async (params: {
    positionId: number;
    minThreshold: number;
    maxThreshold: number;
    teamIncentiveRate: number;
  }) => {
    if (!params) return;
    return createTeamIncentiveMutate({
      variables: params,
    });
  };
  return { createTeamIncentive };
};

export const useUpdateTeamIncentive = () => {
  const [updateTeamIncentiveMutate] = useMutation(
    UPDATE_TEAM_INCENTIVE_MUTATION,
    {
      refetchQueries: [GET_TEAM_INCENTIVES_QUERY, GET_TEAM_INCENTIVE_QUERY],
    },
  );

  const updateTeamIncentive = async (params: {
    teamIncentiveId: number;
    positionId: number;
    minThreshold: number;
    maxThreshold: number;
    teamIncentiveRate: number;
  }) => {
    if (!params) return;
    return updateTeamIncentiveMutate({
      variables: params,
    });
  };
  return { updateTeamIncentive };
};

export const useDeleteTeamIncentive = () => {
  const [deleteTeamIncentiveMutate] = useMutation(
    DELETE_TEAM_INCENTIVE_MUTATION,
    {
      refetchQueries: [GET_TEAM_INCENTIVES_QUERY],
    },
  );

  const deleteTeamIncentive = async (params: TeamIncentive['id']) => {
    if (!params) return;
    return deleteTeamIncentiveMutate({
      variables: { teamIncentiveId: params },
    });
  };
  return { deleteTeamIncentive };
};
