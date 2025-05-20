import { gql } from '@apollo/client';

export const GET_BRANDS_QUERY = gql`
  query GetBrands($getBrandsDto: GetBrandsDto!) {
    getBrands(getBrandsDto: $getBrandsDto) {
      id
      name
      isDomestic
      cars {
        id
        name
        carFee
      }
      brandFee
      created_at
      updated_at
    }
  }
`;

export const GET_BRAND_QUERY = gql`
  query GetBrand($getBrandId: Float!) {
    getBrand(id: $getBrandId) {
      id
      name
      isDomestic
      cars {
        id
        name
        carFee
      }
      brandFee
      created_at
      updated_at
    }
  }
`;
