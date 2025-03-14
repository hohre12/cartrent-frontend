import { gql } from '@apollo/client';

export const TEAM_FIELDS = gql`
  fragment TeamFields on Team {
    id
    name
    depth
    leader {
      id
      name
    }
    userList {
      id
      name
      position {
        id
        name
      }
    }
    created_at
    updated_at
    deleted_at
  }
`;

export const TEAM_WITH_SUBTEAMS = gql`
  fragment TeamWithSubTeams on Team {
    ...TeamFields
    subTeams {
      ...TeamFields
      subTeams {
        ...TeamFields
        subTeams {
          ...TeamFields
        }
      }
    }
  }
`;

/* Query */
export const GET_TEAMS_QUERY = gql`
  query GetTeams {
    getTeams {
      ...TeamWithSubTeams
      parentTeam {
        ...TeamFields
      }
    }
  }
  ${TEAM_FIELDS}
  ${TEAM_WITH_SUBTEAMS}
`;

export const GET_TEAM_QUERY = gql`
  query GetTeam($teamId: Float!) {
    getTeam(teamId: $teamId) {
      ...TeamWithSubTeams
      parentTeam {
        ...TeamFields
      }
    }
  }
  ${TEAM_FIELDS}
  ${TEAM_WITH_SUBTEAMS}
`;
/* Query */
