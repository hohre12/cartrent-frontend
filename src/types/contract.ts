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
  bank?: string; // 은행
  carModel: TCarModel; //
  carOptions: TCarOption[];
  car_model_id?: number;
  city: TCity;
  city_id?: number;
  color?: string; // 색상
  context?: string; // 계약 내용
  contractType?: string; // 계약 타입
  contract_at?: string; // 계약 일
  created_at?: string;
  customer: TCustomer;
  customer_id?: number;
  deleted_at?: string;
  extraPrice?: number; // 이외 추가 금액
  fee?: number; // 수수료
  feeRate?: string; // 수수료 비율
  id: number;
  interChangeFee?: number; // 정산 수수료
  isVATSupport?: boolean; // 부가세 지원 여부
  shipping_date?: string; // 출고 일
  status: string; // 계약 상태
  totalPrice?: number; // 총 계약 금액
  updated_at?: string;
  user: TUser;
  user_id?: number;
};

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
