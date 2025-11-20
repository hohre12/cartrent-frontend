import { gql } from '@apollo/client';

export const CREATE_POSITION_INCENTIVE_MUTATION = gql`
  mutation CreatePositionIncentive(
    $positionId: Int!
    $minThreshold: Int!
    $maxThreshold: Int
    $positionIncentiveRate: Float!
  ) {
    createPositionIncentive(
      positionId: $positionId
      minThreshold: $minThreshold
      maxThreshold: $maxThreshold
      positionIncentiveRate: $positionIncentiveRate
    ) {
      id
      minThreshold
      maxThreshold
      positionIncentiveRate
    }
  }
`;

export const UPDATE_POSITION_INCENTIVE_MUTATION = gql`
  mutation UpdatePositionIncentive(
    $positionIncentiveId: Int!
    $positionId: Int!
    $minThreshold: Int!
    $maxThreshold: Int!
    $positionIncentiveRate: Float!
  ) {
    updatePositionIncentive(
      positionIncentiveId: $positionIncentiveId
      positionId: $positionId
      minThreshold: $minThreshold
      maxThreshold: $maxThreshold
      positionIncentiveRate: $positionIncentiveRate
    ) {
      id
      minThreshold
      maxThreshold
      positionIncentiveRate
    }
  }
`;

export const DELETE_POSITION_INCENTIVE_MUTATION = gql`
  mutation DeletePositionIncentive($positionIncentiveId: Float!) {
    deletePositionIncentive(positionIncentiveId: $positionIncentiveId)
  }
`;
