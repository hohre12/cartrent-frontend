import { gql } from '@apollo/client';

export const GET_POSITION_INCENTIVES_QUERY = gql`
  query GetPositionIncentives($limit: Int!, $offset: Int) {
    getPositionIncentives(limit: $limit, offset: $offset) {
      id
      minThreshold
      maxThreshold
      positionIncentiveRate
      position {
        id
        name
      }
    }
  }
`;

export const GET_POSITION_INCENTIVE_QUERY = gql`
  query GetPositionIncentive($positionIncentiveId: Float!) {
    getPositionIncentive(positionIncentiveId: $positionIncentiveId) {
      id
      minThreshold
      maxThreshold
      positionIncentiveRate
      position {
        id
        name
      }
    }
  }
`;
