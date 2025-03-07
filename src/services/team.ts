import { GET_TEAMS_QUERY } from '@/apollo/queries/team';
import { Team } from '@/types/graphql';
import { useQuery } from '@apollo/client';

export const useGetTeams = () => {
  return useQuery<{ getTeams: Team[] }>(GET_TEAMS_QUERY);
};
