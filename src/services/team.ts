import {
  CREATE_TEAM_MUTATION,
  DELETE_TEAM_MUTATION,
  UPDATE_TEAM_MUTATION,
} from '@/apollo/mutations/team';
import { GET_TEAM_QUERY, GET_TEAMS_QUERY } from '@/apollo/queries/team';
import { CreateTeamDto, Team, UpdateTeamDto } from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';

export const useGetTeams = () => {
  return useQuery<{ getTeams: Team[] }>(GET_TEAMS_QUERY, {
    fetchPolicy: 'network-only',
  });
};

export const useGetTeam = (params: Team['id']) => {
  return useQuery<{ getTeam: Team }, { teamId: Team['id'] }>(GET_TEAM_QUERY, {
    variables: { teamId: params },
    skip: !params,
    fetchPolicy: 'network-only',
  });
};

export const useCreateTeam = () => {
  const [createTeamMutate] = useMutation(CREATE_TEAM_MUTATION, {
    refetchQueries: [GET_TEAMS_QUERY, 'GetTeams'],
  });

  const createTeam = async (params: CreateTeamDto) => {
    if (!params) return;
    return createTeamMutate({
      variables: { createTeamDto: params },
    });
  };
  return { createTeam };
};

export const useUpdateTeam = () => {
  const [updateTeamMutate] = useMutation(UPDATE_TEAM_MUTATION, {
    refetchQueries: [GET_TEAMS_QUERY, GET_TEAM_QUERY, 'GetTeams'],
  });

  const updateTeam = async (params: UpdateTeamDto) => {
    if (!params) return;
    return updateTeamMutate({
      variables: { updateTeamDto: params },
    });
  };
  return { updateTeam };
};

export const useDeleteTeam = () => {
  const [deleteTeamMutate] = useMutation(DELETE_TEAM_MUTATION, {
    refetchQueries: [GET_TEAMS_QUERY],
  });

  const deleteTeam = async (params: Team['id']) => {
    if (!params) return;
    return deleteTeamMutate({
      variables: { teamId: params },
    });
  };
  return { deleteTeam };
};
