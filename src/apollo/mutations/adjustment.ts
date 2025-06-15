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

// 상여금
export const CREATE_BONUS_MUTATION = gql`
  mutation CreateBonus($createBonusDto: CreateBonusDto!) {
    createBonus(createBonusDto: $createBonusDto) {
      id
    }
  }
`;

export const UPDATE_BONUS_MUTATION = gql`
  mutation UpdateBonus($updateBonusDto: UpdateBonusDto!) {
    updateBonus(updateBonusDto: $updateBonusDto) {
      id
    }
  }
`;

export const DELETE_BONUS_MUTATION = gql`
  mutation DeleteBonus($bonusId: Float!) {
    deleteBonus(bonusId: $bonusId)
  }
`;
/* Mutation */
