import { TUser } from './user';
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
  company_name_nominee?: string; // 회사명/명의자
  //   address?: string; // 주소
  //   birth?: string; // 생년월일
  contractList: TContract[];
  counselList: TCounsel[];
  created_at?: string; // 등록일
  customerGrade?: TCustomerGrade;
  customerGroup?: TCustomerGroup;
  customerStatus?: TCustomerStatus;
  customer_grade_id?: number;
  customer_group_id?: number;
  customer_status_id?: number;
  deleted_at?: string;
  division?: string; // 구분
  //   email?: string; // 이메일
  id: number;
  //   job?: string; // 직업
  memo?: string; // 고객 메모
  name: string; // 고객 이름
  note?: string; // 비고
  phone: string; // 핸드폰 번호
  product?: string; // 상품
  status: string; // 상태
  sub_phone: string; // 추가 연락처
  type?: string; //고객 유형
  updated_at?: string;
  userList: TUser;
  user_id: number;
};

export type TCustomerGrade = {
  created_at?: string;
  deleted_at?: string;
  id: number;
  name: string; // 고객 등급 이름
  updated_at?: string;
};

export type TCustomerGroup = {
  created_at?: string;
  deleted_at?: string;
  id: number;
  name: string; // 고객 그룹 이름
  updated_at?: string;
};

export type TCustomerStatus = {
  id: number;
  status: string; // 고객 상태 이름
};

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
