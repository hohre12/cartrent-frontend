import {
  CREATE_CUSTOMER_MUTATION,
  DELETE_CUSTOMER_MUTATION,
  UPDATE_CUSTOMER_MUTATION,
} from '@/apollo/mutations/customer';
import {
  GET_CUSTOMER_GRADES_QUERY,
  GET_CUSTOMER_GROUPS_QUERY,
  GET_CUSTOMER_QUERY,
  GET_CUSTOMER_STATUSES_QUERY,
  GET_CUSTOMERS_QUERY,
} from '@/apollo/queries/customer';
import {
  CreateCustomerDto,
  Customer,
  CustomerGrade,
  CustomerGroup,
  CustomerStatus,
  GetCustomersDto,
  UpdateCustomerDto,
} from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';

// type GetCustomersResponse = {
//   getCustomers: Customer[];
// };

// type GetCustomerResponse = {
//   getCustomer: Customer;
// };

export const useGetCustomers = (params: GetCustomersDto) => {
  return useQuery<
    { getCustomers: Customer[] },
    { getCustomersDto: GetCustomersDto }
  >(GET_CUSTOMERS_QUERY, {
    variables: { getCustomersDto: params },
  });
};

export const useGetCustomer = (params: Customer['id']) => {
  return useQuery<{ getCustomer: Customer }, { customerId: Customer['id'] }>(
    GET_CUSTOMER_QUERY,
    { variables: { customerId: params }, skip: !params },
  );
};

export const useGetCustomerStatuses = () => {
  return useQuery<{ getCustomerStatuses: CustomerStatus[] }>(
    GET_CUSTOMER_STATUSES_QUERY,
  );
};

export const useGetCustomerGrades = () => {
  return useQuery<{ getCustomerGrades: CustomerGrade[] }>(
    GET_CUSTOMER_GRADES_QUERY,
  );
};

export const useGetCustomerGroups = () => {
  return useQuery<{ getCustomerGroups: CustomerGroup[] }>(
    GET_CUSTOMER_GROUPS_QUERY,
  );
};

export const useCreateCustomer = () => {
  const [createCustomerMutate] = useMutation(CREATE_CUSTOMER_MUTATION, {
    refetchQueries: [GET_CUSTOMERS_QUERY, 'GetCustomers'],
  });

  const createCustomer = async (params: CreateCustomerDto) => {
    if (!params) return;
    return createCustomerMutate({ variables: { createCustomerDto: params } });
  };
  return { createCustomer };
};

export const useDeleteCustomer = () => {
  const [deleteCustomerMutate] = useMutation(DELETE_CUSTOMER_MUTATION, {
    refetchQueries: [GET_CUSTOMERS_QUERY, 'GetCustomers'],
  });

  const deleteCustomer = async (params: Customer['id']) => {
    if (!params) return;
    return deleteCustomerMutate({ variables: { customerId: params } });
  };
  return { deleteCustomer };
};

export const useUpdateCustomer = () => {
  const [updateCustomerMutate] = useMutation(UPDATE_CUSTOMER_MUTATION, {
    refetchQueries: [GET_CUSTOMERS_QUERY, 'GetCustomers'],
  });

  const updateCustomer = async (params: UpdateCustomerDto) => {
    if (!params) return;
    return updateCustomerMutate({ variables: { updateCustomerDto: params } });
  };
  return { updateCustomer };
};
