import { TCity, TUser } from './auth';
import { TCarModel, TCarOption } from './car';
import { TFilterList } from './common';
import { TCustomer } from './customer';

/* Query DTO */
export type GetContractsDto = {
  search?: string;
};
/* Query DTO */

/* Mutation DTO */
export type UpdateContractDto = {
  contractId: number;
  context: string;
  carModelId?: number;
  carOptionIds: number[];
  color?: string;
  cityId?: number;
  userId?: number;
  contractAt?: string;
  shippingAt?: string;
  extraPrice?: number;
  bank?: string;
  contractType?: string;
  isVATSupport?: boolean;
  interChangeFee?: number;
  feeRate?: string;
  fee?: number;
};
export type UpdateContractStatusDto = {
  contractId: number;
  status: string;
};
/* Mutation DTO */

/* list */
export type TContract = {
  bank?: string;
  carModel: TCarModel;
  carOptions: TCarOption[];
  car_model_id?: number;
  city: TCity;
  city_id?: number;
  color?: string;
  context?: string;
  contractType?: string;
  contract_at?: string;
  created_at?: string;
  customer: TCustomer;
  customer_id?: number;
  deleted_at?: string;
  extraPrice?: number;
  fee?: number;
  feeRate?: string;
  id: number;
  interChangeFee?: number;
  isVATSupport?: boolean;
  shipping_date?: string;
  status: string;
  totalPrice?: number;
  updated_at?: string;
  user: TUser;
  user_id?: number;
};
// export type TContractListRequest = {
//   search?: string;
//   offset?: number;
//   length?: number;
// };
// export type TContractListResponse = {
//   list: TContractList[];
//   count: number;
// };
// export type TContractList = {
//   id: number;
//   context: string;
//   status: string;
//   totalPrice: number;
//   color: string;
//   extraPrice: number;
//   bank: string;
//   contractType: string;
//   isVATSupport: boolean;
//   interChangeFee: number;
//   feeRate: string;
//   fee: number;
//   car_model_id: number;
//   city_id: number;
//   user_id?: number;
//   customer_id?: number;
//   contract_at: string;
//   shipping_date: string;
//   created_at: string;
//   update_at: string;
//   deleted_at: string;
//   user: TUser; // 임시
//   customer: TCustomerResponse;
//   carModel: string; // 임시
//   city: string; // 임시
//   carOptions: string[]; // 임시
// };
/* list */

/* detail */
// export type TContractRequest = {
//   ContractId: number;
// };

// export type TContractResponse = {
//   id: number;
//   context: string;
//   status: string;
//   totalPrice: number;
//   color: string;
//   extraPrice: number;
//   bank: string;
//   contractType: string;
//   isVATSupport: boolean;
//   interChangeFee: number;
//   feeRate: string;
//   fee: number;
//   car_model_id: number;
//   city_id: number;
//   user_id?: number;
//   customer_id?: number;
//   contract_at: string;
//   shipping_date: string;
//   created_at: string;
//   update_at: string;
//   deleted_at: string;
//   user: TUser;
//   customer: TCustomerResponse;
//   carModal: string; // 임시
//   city: string; // 임시
//   carOptions: string[]; // 임시
// };
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
