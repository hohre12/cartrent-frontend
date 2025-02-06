import { GET_CITIES_QUERY } from '@/apollo/queries/city';
import { City, GetCitiesDto } from '@/types/graphql';
import { useQuery } from '@apollo/client';

export const useGetCites = (params: GetCitiesDto) => {
  return useQuery<{ getCities: City[] }, { getCitiesDto: GetCitiesDto }>(
    GET_CITIES_QUERY,
    {
      variables: { getCitiesDto: params },
    },
  );
};
