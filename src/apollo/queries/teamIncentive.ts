import { gql } from '@apollo/client';

export const GET_TEAM_INCENTIVES_QUERY = gql`
  query GetTeamIncentives($limit: Int!, $offset: Int) {
    getTeamIncentives(limit: $limit, offset: $offset) {
      id
      minThreshold
      maxThreshold
      teamIncentiveRate
      position {
        id
        name
      }
    }
  }
`;

export const GET_TEAM_INCENTIVE_QUERY = gql`
  query GetTeamIncentive($teamIncentiveId: Float!) {
    getTeamIncentive(teamIncentiveId: $teamIncentiveId) {
      id
      minThreshold
      maxThreshold
      teamIncentiveRate
      position {
        id
        name
      }
    }
  }
`;
