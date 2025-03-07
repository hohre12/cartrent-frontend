import { gql } from '@apollo/client';

/* Mutation */
export const CREATE_ADDITIONAL_INCENTIVE_MUTATION = gql`
  mutation CreateAdditionalIncentive(
    $createAdditionalIncentiveDto: CreateAdditionalIncentiveDto!
  ) {
    createAdditionalIncentive(
      createAdditionalIncentiveDto: $createAdditionalIncentiveDto
    ) {
      id
    }
  }
`;

export const UPDATE_ADDITIONAL_INCENTIVE_MUTATION = gql`
  mutation UpdateAdditionalIncentive(
    $updateAdditionalIncentiveDto: UpdateAdditionalIncentiveDto!
  ) {
    updateAdditionalIncentive(
      updateAdditionalIncentiveDto: $updateAdditionalIncentiveDto
    ) {
      id
    }
  }
`;

export const DELETE_ADDITIONAL_INCENTIVE_MUTATION = gql`
  mutation DeleteAdditionalIncentive($additionalIncentiveId: Float!) {
    deleteAdditionalIncentive(additionalIncentiveId: $additionalIncentiveId)
  }
`;
/* Mutation */
