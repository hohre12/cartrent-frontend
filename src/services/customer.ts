import {
  GET_CUSTOMER_QUERY,
  GET_CUSTOMERS_QUERY,
} from '@/apollo/queries/customer';
import { Customer, GetCustomersDto } from '@/types/graphql';
import { useQuery } from '@apollo/client';

// export const useGetCustomers = (params: GetCustomersDto) => {
//   return useQuery<
//     { getCustomers: Customer[] },
//     { getCustomersDto: GetCustomersDto }
//   >(GET_CUSTOMERS_QUERY, {
//     variables: { getCustomersDto: params },
//   });
// };

// type GetCustomersResponse = {
//   getCustomers: Customer[];
// };

// type GetCustomerResponse = {
//   getCustomer: Customer;
// };

export const useGetCustomers = (params: GetCustomersDto) => {
  return useQuery<{ getCustomers: Customer[] }, GetCustomersDto>(
    GET_CUSTOMERS_QUERY,
    {
      variables: params,
    },
  );
};

export const useGetCustomer = (params: Customer['id']) => {
  return useQuery<{ getCustomer: Customer }, { customerId: Customer['id'] }>(
    GET_CUSTOMER_QUERY,
    { variables: { customerId: params } },
  );
};
