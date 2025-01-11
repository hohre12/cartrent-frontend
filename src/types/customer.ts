import { TUser } from './auth';
import { TFilterList } from './common';
import { TContract } from './contract';
import { TCounsel } from './counsel';

/* Query DTO */
export type GetCustomersDto = {
  search?: string;
};
/* Query DTO */

/* Mutation DTO */
export type CreateCustomerDto = {
  name: string;
  phone: string;
  email?: string;
  birth?: string;
  address?: string;
  job?: string;
  customerGroupId: number;
};

export type UpdateCustomerDto = {
  name?: string;
  phone?: string;
  email?: string;
  birth?: string;
  status?: string;
  address?: string;
  job?: string;
  customerGroupId?: number;
  customerId: number;
};

export type UpdateCustomerOfUserDto = {
  customerId: number;
  userId: number;
};

export type CreateCustomerGroupDto = {
  name: string;
};

export type UpdateCustomerGroupDto = {
  customerGroupId: number;
  name: string;
};
/* Mutation DTO */

export type TCustomer = {
  address?: string;
  birth?: string;
  contractList: TContract[];
  counselList: TCounsel[];
  created_at?: string;
  customerGrade?: TCustomerGrade;
  customerGroup?: TCustomerGroup;
  customer_grade_id?: number;
  customer_group_id?: number;
  deleted_at?: string;
  email?: string;
  id: number;
  job?: string;
  memo?: string;
  name: string;
  phone: string;
  status: string;
  updated_at?: string;
  userList: TUser;
  user_id: number;
};

export type TCustomerGrade = {
  created_at?: string;
  deleted_at?: string;
  id: number;
  name: string;
  updated_at?: string;
};

export type TCustomerGroup = {
  created_at?: string;
  deleted_at?: string;
  id: number;
  name: string;
  updated_at?: string;
};

/* list */
// export type TCustomerListRequest = {
//   search?: string;
//   offset: number;
//   length: number;
// };
// export type TCustomerListResponse = {
//   list: TCustomerList[];
//   count: number;
// };
// export type TCustomerList = {
//   address?: string;
//   birth?: string;
//   contractList: TContractList[];
//   counselList?: TCounselList[];
//   created_at: string;
//   customerGroup: TCustomerGroup;
//   customer_group_id?: TCustomerGroup['id'];
//   deleted_at?: string;
//   email?: string;
//   id: number;
//   job?: string;
//   name: string;
//   phone: string;
//   status: string;
//   updated_at: string;
//   userList: TUser[];
//   user_id: TUser['id'];
//   grade?: string;
//   memo?: string;
// };
/* list */

/* detail */
// export type TCustomerRequest = {
//   customerId: number;
// };

// export type TCustomerResponse = {
//   address?: string;
//   birth?: string;
//   contractList: TContractList[];
//   counselList?: TCounselList[];
//   created_at?: string;
//   customerGroup?: TCustomerGroup;
//   customer_group_id?: TCustomerGroup['id'];
//   deleted_at?: string;
//   email?: string;
//   id: number;
//   job?: string;
//   name: string;
//   phone?: string;
//   status?: string;
//   updated_at?: string;
//   userList: TUser[];
//   user_id: TUser['id'];
//   grade?: string;
//   memo?: string;
// };
/* detail */

/* front handle type */
export type TCustomerFiltersStateType = {
  group: TFilterList<number>[];
  createdAt:
    | {
        createdAtFrom: string;
        createdAtTo: string;
      }
    | undefined;
};
/* front handle type */
