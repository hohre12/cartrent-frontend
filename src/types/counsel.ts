import { TUser } from './auth';
import { TFilterList } from './common';
import { TCustomer, TCustomerGroup } from './customer';

/* Query DTO */
export type GetCounselsDto = {
  search?: string;
};
/* Query DTO */

/* Mutation DTO */
export type CreateCounselDto = {
  context: string;
  status: string;
  type: string;
  image_url?: string;
  customer_id: number;
};
/* Mutation DTO */

export type TCounsel = {
  context: string; // 상담 내용
  created_at?: string;
  customer: TCustomer;
  customerGroup: TCustomerGroup;
  customer_id?: number;
  deleted_at?: string;
  id: number;
  image_url?: string; // 이미지 파일
  status: string; // 상담 상태
  type: string; // 상담 유형
  updated_at?: string;
  user: TUser;
  user_id?: number;
};

/* front handle type */
export type TCounselFiltersStateType = {
  // 상담자
  type: TFilterList<number>[];
  createdAt:
    | {
        createdAtFrom: string;
        createdAtTo: string;
      }
    | undefined;
};
/* front handle type */
