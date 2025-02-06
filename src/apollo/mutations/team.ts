import { gql } from '@apollo/client';

/* Mutation */
export const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeam($createTeamDto: CreateTeamDto!) {
    createTeam(createTeamDto: $createTeamDto) {
      id
    }
  }
`;
export const UPDATE_TEAM_MUTATION = gql`
  mutation UpdateTeam($updateTeamDto: UpdateTeamDto!) {
    updateTeam(updateTeamDto: $updateTeamDto) {
      id
    }
  }
`;
export const DELETE_TEAM_MUTATION = gql`
  mutation DeleteTeam($teamId: Float!) {
    deleteTeam(teamId: $teamId)
  }
`;
/* Mutation */
