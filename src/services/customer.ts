// import {
//   TCustomerListRequest,
//   TCustomerListResponse,
//   TCustomerRequest,
//   TCustomerResponse,
// } from '@/types/customer';
// import axiosInstance from './api';
// import { TDefaultResponse } from '@/types/common';
// import { useQuery } from '@tanstack/react-query';
// import customer from './keys/customer';

// /**
//  * 고객 목록을 조회한다.
//  * @param params TCustomerListRequest
//  * @returns Promise<TCustomerListResponse>
//  */
// export const getCustomerList = async (
//   params: TCustomerListRequest,
// ): Promise<TCustomerListResponse> => {
//   const { data } = await axiosInstance.get<
//     TDefaultResponse<TCustomerListResponse>
//   >(``, { params });
//   return data?.data;
// };

// export const useGetCustomerList = (params: TCustomerListRequest) => {
//   return useQuery({
//     queryKey: customer.list(params),
//     queryFn: () => getCustomerList(params),
//   });
// };

// /**
//  * 고객 상세 조회
//   - 고객 상세를 조회한다.
//  * @param params TCustomerRequest
//  * @returns Promise<TCustomerResponse>
//  */
// export const getCustomer = async (
//   params: TCustomerRequest,
// ): Promise<TCustomerResponse> => {
//   const { data } = await axiosInstance.get(``, {
//     params,
//   });

//   return data?.data;
// };
// export const useGetCustomer = (params: TCustomerRequest) => {
//   return useQuery({
//     queryKey: customer.detail(params),
//     queryFn: () => getCustomer(params),
//   });
// };
