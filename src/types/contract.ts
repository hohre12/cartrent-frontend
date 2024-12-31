import { TUser } from './auth';
import { TFilterList } from './common';
import { TCustomerResponse } from './customer';

/* list */
export type TContractListRequest = {
  search?: string;
  offset?: number;
  length?: number;
};
export type TContractListResponse = {
  list: TContractList[];
  count: number;
};
export type TContractList = {
  id: number;
  context: string;
  status: string;
  totalPrice: number;
  color: string;
  extraPrice: number;
  bank: string;
  contractType: string;
  isVATSupport: boolean;
  interChangeFee: number;
  feeRate: string;
  fee: number;
  car_model_id: number;
  city_id: number;
  user_id?: number;
  customer_id?: number;
  contract_at: string;
  shipping_date: string;
  created_at: string;
  update_at: string;
  deleted_at: string;
  user: TUser; // 임시
  customer: TCustomerResponse;
  carModal: string; // 임시
  city: string; // 임시
  carOptions: string[]; // 임시
};
/* list */

/* detail */
export type TContractRequest = {
  ContractId: number;
};

export type TContractResponse = {
  id: number;
  context: string;
  status: string;
  totalPrice: number;
  color: string;
  extraPrice: number;
  bank: string;
  contractType: string;
  isVATSupport: boolean;
  interChangeFee: number;
  feeRate: string;
  fee: number;
  car_model_id: number;
  city_id: number;
  user_id?: number;
  customer_id?: number;
  contract_at: string;
  shipping_date: string;
  created_at: string;
  update_at: string;
  deleted_at: string;
  user: TUser;
  customer: TCustomerResponse;
  carModal: string; // 임시
  city: string; // 임시
  carOptions: string[]; // 임시
};
/* detail */

/* front handle type */
export type TContractFiltersStateType = {
  status: TFilterList<number>[];
  createdAt:
    | {
        createdAtFrom: string;
        createdAtTo: string;
      }
    | undefined;
};
/* front handle type */
