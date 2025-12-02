import { gql } from '@apollo/client';

export const CREATE_TEAM_INCENTIVE_MUTATION = gql`
  mutation CreateTeamIncentive(
    $positionId: Int!
    $minThreshold: Int!
    $maxThreshold: Int
    $teamIncentiveRate: Float!
  ) {
    createTeamIncentive(
      positionId: $positionId
      minThreshold: $minThreshold
      maxThreshold: $maxThreshold
      teamIncentiveRate: $teamIncentiveRate
    ) {
      id
      minThreshold
      maxThreshold
      teamIncentiveRate
    }
  }
`;

export const UPDATE_TEAM_INCENTIVE_MUTATION = gql`
  mutation UpdateTeamIncentive(
    $teamIncentiveId: Int!
    $positionId: Int!
    $minThreshold: Int!
    $maxThreshold: Int
    $teamIncentiveRate: Float!
  ) {
    updateTeamIncentive(
      teamIncentiveId: $teamIncentiveId
      positionId: $positionId
      minThreshold: $minThreshold
      maxThreshold: $maxThreshold
      teamIncentiveRate: $teamIncentiveRate
    ) {
      id
      minThreshold
      maxThreshold
      teamIncentiveRate
    }
  }
`;

export const DELETE_TEAM_INCENTIVE_MUTATION = gql`
  mutation DeleteTeamIncentive($teamIncentiveId: Float!) {
    deleteTeamIncentive(teamIncentiveId: $teamIncentiveId)
  }
`;
