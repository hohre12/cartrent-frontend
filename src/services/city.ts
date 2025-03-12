import {
  CREATE_CITY_MUTATION,
  DELETE_CITY_MUTATION,
  UPDATE_CITY_MUTATION,
} from '@/apollo/mutations/auth';
import { GET_CITIES_QUERY, GET_CITY_QUERY } from '@/apollo/queries/city';
import {
  City,
  CreateCityDto,
  GetCitiesDto,
  UpdateCityDto,
} from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';

export const useGetCites = (params: GetCitiesDto) => {
  return useQuery<{ getCities: City[] }, { getCitiesDto: GetCitiesDto }>(
    GET_CITIES_QUERY,
    {
      variables: { getCitiesDto: params },
      fetchPolicy: 'network-only',
    },
  );
};

export const useCreateCity = () => {
  const [createCityMutate] = useMutation(CREATE_CITY_MUTATION, {
    refetchQueries: [GET_CITIES_QUERY, 'GetCities'],
  });

  const createCity = async (params: CreateCityDto) => {
    if (!params) return;
    return createCityMutate({
      variables: { createCityDto: params },
    });
  };
  return { createCity };
};

export const useUpdateCity = () => {
  const [updateCityMutate] = useMutation(UPDATE_CITY_MUTATION, {
    refetchQueries: [GET_CITIES_QUERY, GET_CITY_QUERY],
  });

  const updateCity = async (params: UpdateCityDto) => {
    if (!params) return;
    return updateCityMutate({
      variables: { updateCityDto: params },
    });
  };
  return { updateCity };
};

export const useDeleteCity = () => {
  const [deleteCityMutate] = useMutation(DELETE_CITY_MUTATION, {
    refetchQueries: [GET_CITIES_QUERY],
  });

  const deleteCity = async (params: City['id']) => {
    if (!params) return;
    return deleteCityMutate({
      variables: { cityId: params },
    });
  };
  return { deleteCity };
};
