import { gql } from '@apollo/client';

export const GET_CITES_QUERY = gql`
  query GetCities($getCitiesDto: GetCitiesDto!) {
    getCities(getCitiesDto: $getCitiesDto) {
      id
      name
    }
  }
`;

export const GET_CITY_QUERY = gql`
  query GetCity($cityId: Float!) {
    getCity(cityId: $cityId) {
      id
      name
    }
  }
`;
