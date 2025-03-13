import { gql } from '@apollo/client';

/* Query */
export const GET_TEAMS_QUERY = gql`
  query GetTeams {
    getTeams {
      id
      name
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
      parentTeam {
        id
        name
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
      }
      subTeams {
        id
        name
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
        subTeams {
          id
          name
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
        }
      }
    }
  }
`;

export const GET_TEAM_QUERY = gql`
  query GetTeam($teamId: Float!) {
    getTeam(teamId: $teamId) {
      id
      name
      created_at
      updated_at
      deleted_at
      userList {
        id
        name
        email
        created_at
        position {
          id
          name
        }
      }
    }
  }
`;
/* Query */
