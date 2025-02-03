import { GET_CUSTOMERS_QUERY } from '@/apollo/queries/customer';
import { Customer, GetCustomersDto } from '@/types/graphql';
import { useQuery } from '@apollo/client';

export const useGetCustomers = (params: GetCustomersDto) => {
  return useQuery<
    { getCustomers: Customer[] },
    { getCustomersDto: GetCustomersDto }
  >(GET_CUSTOMERS_QUERY, {
    variables: { getCustomersDto: params },
  });
};

// export const useGetCustomers = (params: GetCustomersDto) => {
//   return useQuery<{ getCustomers: Customer[] }, GetCustomersDto>(
//     GET_CUSTOMERS_QUERY,
//     {
//       variables: params,
//     },
//   );
// };
