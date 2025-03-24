import {
  CREATE_CUSTOMER_GRADE_MUTATION,
  CREATE_CUSTOMER_GROUP_MUTATION,
  CREATE_CUSTOMER_MUTATION,
  DELETE_CUSTOMER_GRADE_MUTATION,
  DELETE_CUSTOMER_GROUP_MUTATION,
  DELETE_CUSTOMER_MUTATION,
  UPDATE_CUSTOMER_GRADE_MUTATION,
  UPDATE_CUSTOMER_GROUP_MUTATION,
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
  CreateCustomerGradeDto,
  CreateCustomerGroupDto,
  Customer,
  CustomerGrade,
  CustomerGroup,
  CustomerStatus,
  GetCustomersDto,
  UpdateCustomerDto,
  UpdateCustomerGradeDto,
  UpdateCustomerGroupDto,
} from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';

export const useGetCustomers = (params: GetCustomersDto) => {
  return useQuery<
    { getCustomers: Customer[] },
    { getCustomersDto: GetCustomersDto }
  >(GET_CUSTOMERS_QUERY, {
    variables: { getCustomersDto: params },
    fetchPolicy: 'network-only',
  });
};

export const useGetCustomer = (params: Customer['id']) => {
  return useQuery<{ getCustomer: Customer }, { customerId: Customer['id'] }>(
    GET_CUSTOMER_QUERY,
    {
      variables: { customerId: params },
      skip: !params,
      fetchPolicy: 'network-only',
    },
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

  const deleteCustomer = async (params: Customer['id'][]) => {
    if (!params) return;
    return deleteCustomerMutate({ variables: { customerIds: params } });
  };
  return { deleteCustomer };
};

export const useUpdateCustomer = () => {
  const [updateCustomerMutate] = useMutation(UPDATE_CUSTOMER_MUTATION, {
    refetchQueries: [GET_CUSTOMERS_QUERY, GET_CUSTOMER_QUERY],
  });

  const updateCustomer = async (params: UpdateCustomerDto) => {
    if (!params) return;
    return updateCustomerMutate({ variables: { updateCustomerDto: params } });
  };
  return { updateCustomer };
};

// 고객그룹
export const useCreateCustomerGroup = () => {
  const [createCustomerGroupMutate] = useMutation(
    CREATE_CUSTOMER_GROUP_MUTATION,
    {
      refetchQueries: [GET_CUSTOMER_GROUPS_QUERY, 'GetCustomerGroups'],
    },
  );

  const createCustomerGroup = async (params: CreateCustomerGroupDto) => {
    if (!params) return;
    return createCustomerGroupMutate({
      variables: { createCustomerGroupDto: params },
    });
  };
  return { createCustomerGroup };
};

export const useUpdateCustomerGroup = () => {
  const [updateCustomerGroupMutate] = useMutation(
    UPDATE_CUSTOMER_GROUP_MUTATION,
    {
      refetchQueries: [GET_CUSTOMER_GROUPS_QUERY],
    },
  );

  const updateCustomerGroup = async (params: UpdateCustomerGroupDto) => {
    if (!params) return;
    return updateCustomerGroupMutate({
      variables: { updateCustomerGroupDto: params },
    });
  };
  return { updateCustomerGroup };
};

export const useDeleteCustomerGroup = () => {
  const [deleteCustomerGroupMutate] = useMutation(
    DELETE_CUSTOMER_GROUP_MUTATION,
    {
      refetchQueries: [GET_CUSTOMER_GROUPS_QUERY],
    },
  );

  const deleteCustomerGroup = async (params: CustomerGroup['id']) => {
    if (!params) return;
    return deleteCustomerGroupMutate({
      variables: { customerGroupId: params },
    });
  };
  return { deleteCustomerGroup };
};

// 고객등급
export const useCreateCustomerGrade = () => {
  const [createCustomerGradeMutate] = useMutation(
    CREATE_CUSTOMER_GRADE_MUTATION,
    {
      refetchQueries: [GET_CUSTOMER_GRADES_QUERY, 'GetCustomerGrades'],
    },
  );

  const createCustomerGrade = async (params: CreateCustomerGradeDto) => {
    if (!params) return;
    return createCustomerGradeMutate({
      variables: { createCustomerGradeDto: params },
    });
  };
  return { createCustomerGrade };
};

export const useUpdateCustomerGrade = () => {
  const [updateCustomerGradeMutate] = useMutation(
    UPDATE_CUSTOMER_GRADE_MUTATION,
    {
      refetchQueries: [GET_CUSTOMER_GRADES_QUERY],
    },
  );

  const updateCustomerGrade = async (params: UpdateCustomerGradeDto) => {
    if (!params) return;
    return updateCustomerGradeMutate({
      variables: { updateCustomerGradeDto: params },
    });
  };
  return { updateCustomerGrade };
};

export const useDeleteCustomerGrade = () => {
  const [deleteCustomerGradeMutate] = useMutation(
    DELETE_CUSTOMER_GRADE_MUTATION,
    {
      refetchQueries: [GET_CUSTOMER_GRADES_QUERY],
    },
  );

  const deleteCustomerGrade = async (params: CustomerGrade['id']) => {
    if (!params) return;
    return deleteCustomerGradeMutate({
      variables: { customerGradeId: params },
    });
  };
  return { deleteCustomerGrade };
};
