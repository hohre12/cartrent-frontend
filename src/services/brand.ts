import {
  CREATE_BRAND_MUTATION,
  DELETE_BRAND_MUTATION,
  UPDATE_BRAND_MUTATION,
} from '@/apollo/mutations/brand';
import { GET_BRANDS_QUERY, GET_BRAND_QUERY } from '@/apollo/queries/brand';
import {
  Brand,
  CreateBrandDto,
  GetBrandsDto,
  UpdateBrandDto,
} from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';

export const useGetBrands = (params: GetBrandsDto) => {
  return useQuery<{ getBrands: Brand[] }, { getBrandsDto: GetBrandsDto }>(
    GET_BRANDS_QUERY,
    {
      variables: { getBrandsDto: params },
      fetchPolicy: 'network-only',
    },
  );
};

export const useGetBrand = (params: Brand['id']) => {
  return useQuery<{ getBrand: Brand }, { getBrandId: Brand['id'] }>(
    GET_BRAND_QUERY,
    {
      variables: { getBrandId: params },
      skip: !params,
      fetchPolicy: 'network-only',
    },
  );
};

export const useCreateBrand = () => {
  const [createBrandMutate] = useMutation(CREATE_BRAND_MUTATION, {
    refetchQueries: [GET_BRANDS_QUERY, 'GetBrands'],
  });

  const createBrand = async (params: CreateBrandDto) => {
    if (!params) return;
    return createBrandMutate({
      variables: { createBrandDto: params },
    });
  };
  return { createBrand };
};

export const useUpdateBrand = () => {
  const [updateBrandMutate] = useMutation(UPDATE_BRAND_MUTATION, {
    refetchQueries: [GET_BRANDS_QUERY, GET_BRAND_QUERY],
  });

  const updateBrand = async (params: UpdateBrandDto) => {
    if (!params) return;
    return updateBrandMutate({
      variables: { updateBrandDto: params },
    });
  };
  return { updateBrand };
};

export const useDeleteBrand = () => {
  const [deleteBrandMutate] = useMutation(DELETE_BRAND_MUTATION, {
    refetchQueries: [GET_BRANDS_QUERY],
  });

  const deleteBrand = async (params: Brand['id']) => {
    if (!params) return;
    return deleteBrandMutate({
      variables: { id: params },
    });
  };
  return { deleteBrand };
};
