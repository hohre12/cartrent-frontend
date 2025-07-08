import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type AdditionalIncentive = {
  /** 추가 수당 */
  additionalIncentive: Scalars['Int']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  /** 추가 수당 받은 월 */
  month: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
  /** 추가 수당 받은 년도 */
  year: Scalars['String']['output'];
};

export type Adjustment = {
  additionalIncentive?: Maybe<AdditionalIncentive>;
  additionalIncentiveId?: Maybe<Scalars['Int']['output']>;
  bonus?: Maybe<Bonus>;
  bonusId?: Maybe<Scalars['Int']['output']>;
  /** 기타 수당 / 팀장급 이상 팀 전체 매출의 인센티브 */
  etcIncentive: Scalars['Float']['output'];
  /** 달 */
  month: Scalars['String']['output'];
  /** 계약 총 건수 */
  totalCountContract: Scalars['Int']['output'];
  /** 출고 총 건수 */
  totalCountDelivery: Scalars['Int']['output'];
  /** 계약 총 지출 */
  totalExpenditureContract: Scalars['Int']['output'];
  /** 출고 총 지출 */
  totalExpenditureDelivery: Scalars['Int']['output'];
  /** 계약 총 매출 */
  totalFeeContract: Scalars['Int']['output'];
  /** 출고 총 매출 */
  totalFeeDelivery: Scalars['Int']['output'];
  /** 계약 수당 / 직급별 인센티브 */
  totalIncentiveContract: Scalars['Float']['output'];
  /** 출고 수당 / 직급별 인센티브 */
  totalIncentiveDelivery: Scalars['Float']['output'];
  /** 계약 총 순매출 */
  totalNetIncomeContract: Scalars['Int']['output'];
  /** 출고 총 순매출 */
  totalNetIncomeDelivery: Scalars['Int']['output'];
  user: User;
  userId: Scalars['Int']['output'];
  /** 년 */
  year: Scalars['String']['output'];
};

export type AuthPayload = {
  accessToken: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

/** 상여금 */
export type Bonus = {
  /** 상여금 */
  bonus: Scalars['Int']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  /** 상여금 받은 월 */
  month: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['Int']['output'];
  /** 상여금 받은 년도 */
  year: Scalars['String']['output'];
};

/** 차량 브랜드 */
export type Brand = {
  /** 브랜드 수수료 */
  brandFee?: Maybe<Scalars['Float']['output']>;
  cars?: Maybe<Array<Car>>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** 브랜드 아이디 */
  id: Scalars['Int']['output'];
  /** 국산 여부 */
  isDomestic: Scalars['Boolean']['output'];
  /** 브랜드 이름 */
  name: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** 차량 */
export type Car = {
  brand: Brand;
  brandId: Scalars['Int']['output'];
  /** 차량 수수료 */
  carFee?: Maybe<Scalars['Float']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** 차량 아이디 */
  id: Scalars['Int']['output'];
  /** 차량 이름 */
  name: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type CheckSettleContractDto = {
  contractId?: InputMaybe<Scalars['Int']['input']>;
  month?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

/** 도시 */
export type City = {
  id: Scalars['Int']['output'];
  /** 도시 이름 */
  name: Scalars['String']['output'];
};

/** 계약 */
export type Contract = {
  /** 선수금 */
  advancePayment?: Maybe<Scalars['Int']['output']>;
  /** 대리점 결제일 */
  agencyPaymentDate?: Maybe<Scalars['String']['output']>;
  /** 약정 거리 */
  agreedMileage?: Maybe<Scalars['Int']['output']>;
  /** 지점 */
  branch?: Maybe<Scalars['String']['output']>;
  /** 지점 수수료 */
  branchFee?: Maybe<Scalars['Int']['output']>;
  /** 경비 */
  businessExpenses?: Maybe<Scalars['Int']['output']>;
  /** 경비 내용 */
  businessExpensesDetail?: Maybe<Scalars['String']['output']>;
  car?: Maybe<Car>;
  carId?: Maybe<Scalars['Int']['output']>;
  /** 차 옵션 */
  carOption?: Maybe<Scalars['String']['output']>;
  /** 차량 가격 */
  carPrice?: Maybe<Scalars['Int']['output']>;
  /** 현금 지원 */
  cashAssistance?: Maybe<Scalars['Int']['output']>;
  city?: Maybe<City>;
  city_id?: Maybe<Scalars['Int']['output']>;
  /** 담보율 */
  collateralRate?: Maybe<Scalars['Int']['output']>;
  /** 회사명/명의자 */
  company_name_nominee?: Maybe<Scalars['String']['output']>;
  /** 계약 일 */
  contractAt?: Maybe<Scalars['String']['output']>;
  /** 약정 기간 */
  contractPeriod?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  customer: Customer;
  customer_id?: Maybe<Scalars['Int']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  division?: Maybe<Division>;
  divisionId?: Maybe<Scalars['Int']['output']>;
  /** 수수료 */
  fee?: Maybe<Scalars['Int']['output']>;
  /** 수수료 비율 */
  feeRate?: Maybe<Scalars['Float']['output']>;
  financialCompany?: Maybe<FinancialCompany>;
  financialCompanyId?: Maybe<Scalars['Int']['output']>;
  /** 계약사실확인서 여부 */
  hasContractConfirmationLetter?: Maybe<Scalars['Boolean']['output']>;
  /** 등록증 여부 */
  hasRegistrationCertificate?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['Int']['output'];
  /** 소득자 */
  incomeEarner?: Maybe<Scalars['String']['output']>;
  /** 내부 색상 */
  innerColor?: Maybe<Scalars['String']['output']>;
  /** 보험 연령 */
  insuranceAge?: Maybe<Scalars['Int']['output']>;
  /** 출고 여부 */
  isOrdering?: Maybe<Scalars['String']['output']>;
  /** 부가세 지원 여부 */
  isVATSupport?: Maybe<Scalars['Boolean']['output']>;
  /** 월 납입료 */
  monthlyPayment?: Maybe<Scalars['Int']['output']>;
  /** 수익합계 */
  netIncome?: Maybe<Scalars['Int']['output']>;
  /** 비고 */
  note?: Maybe<Scalars['String']['output']>;
  /** 대물 */
  object?: Maybe<Scalars['Float']['output']>;
  /** 외부 색상 */
  outerColor?: Maybe<Scalars['String']['output']>;
  /** 프로모션 */
  promotion?: Maybe<Scalars['Int']['output']>;
  /** 품의 금액 1 */
  service1?: Maybe<Scalars['Int']['output']>;
  /** 품의 금액 2 */
  service2?: Maybe<Scalars['Int']['output']>;
  /** 품의 금액 3 */
  service3?: Maybe<Scalars['Int']['output']>;
  /** 품의 내용 1 */
  serviceBody1?: Maybe<Scalars['String']['output']>;
  /** 품의 내용 2 */
  serviceBody2?: Maybe<Scalars['String']['output']>;
  /** 품의 내용 3 */
  serviceBody3?: Maybe<Scalars['String']['output']>;
  /** 출고 일 */
  shippingDate?: Maybe<Scalars['String']['output']>;
  shippingMethod?: Maybe<ShippingMethod>;
  shippingMethodId?: Maybe<Scalars['Int']['output']>;
  /** 계약 상태 */
  status: Status;
  supportAmounts?: Maybe<Array<SupportAmount>>;
  /** 지원 내용 */
  supportDetails?: Maybe<Scalars['String']['output']>;
  /** 지출합계 */
  totalExpenditure?: Maybe<Scalars['Int']['output']>;
  /** 매출 합계 */
  totalFee?: Maybe<Scalars['Int']['output']>;
  /** 총 계약 금액 */
  totalPrice?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** 계약 검색 타입 Enum Type */
export enum ContractSearchType {
  /** 차종 */
  CarName = 'CAR_NAME',
  /** 고객명 */
  CustomerName = 'CUSTOMER_NAME',
  /** 금융사 */
  FinancialCompany = 'FINANCIAL_COMPANY',
  /** 고객 연락처 */
  Phone = 'PHONE',
  /** 상담자 이름 */
  UserName = 'USER_NAME'
}

/** 상담 */
export type Counsel = {
  /** 상담 내용 */
  context: Scalars['String']['output'];
  contract?: Maybe<Contract>;
  contract_id?: Maybe<Scalars['Int']['output']>;
  /** 상담 일시 */
  counselAt: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  customer: Customer;
  customerGroup?: Maybe<CustomerGroup>;
  customer_id?: Maybe<Scalars['Int']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  /** 이미지 파일 */
  image_url?: Maybe<Scalars['String']['output']>;
  /** 상담 상태 */
  status?: Maybe<Status>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** 상담 검색 타입 Enum Type */
export enum CounselSearchType {
  /** 차종 */
  CarName = 'CAR_NAME',
  /** 상담 내용 */
  Context = 'CONTEXT',
  /** 고객등급 */
  CustomerGrade = 'CUSTOMER_GRADE',
  /** 고객명 */
  CustomerName = 'CUSTOMER_NAME',
  /** 비고 */
  Note = 'NOTE',
  /** 연락처 */
  Phone = 'PHONE',
  /** 상담자 이름 */
  UserName = 'USER_NAME'
}

/** 상담 정렬 방향 Enum Type */
export enum CounselSortDirectionType {
  /** 오름차순 */
  Asc = 'ASC',
  /** 내림차순 */
  Desc = 'DESC'
}

export type CreateAdditionalIncentiveDto = {
  /** 추가 수당 */
  additionalIncentive: Scalars['Int']['input'];
  /** 월 */
  month: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
  /** 년도 */
  year: Scalars['String']['input'];
};

export type CreateBonusDto = {
  /** 상여금 */
  bonus: Scalars['Int']['input'];
  /** 월 */
  month: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
  /** 년도 */
  year: Scalars['String']['input'];
};

export type CreateBrandDto = {
  /** 수수료 */
  brandFee?: InputMaybe<Scalars['Float']['input']>;
  /** 국산 여부 */
  isDomestic: Scalars['Boolean']['input'];
  /** 브랜드 이름 */
  name: Scalars['String']['input'];
};

export type CreateCarDto = {
  /** 브랜드 아이디 */
  brandId: Scalars['Int']['input'];
  /** 차량 수수료 */
  carFee?: InputMaybe<Scalars['Float']['input']>;
  /** 차량 이름 */
  name: Scalars['String']['input'];
};

export type CreateCityDto = {
  name: Scalars['String']['input'];
};

export type CreateContractDto = {
  /** 선수금 */
  advancePayment?: InputMaybe<Scalars['Int']['input']>;
  /** 대리점 결제일 */
  agencyPaymentDate?: InputMaybe<Scalars['String']['input']>;
  /** 약정 거리 */
  agreedMileage?: InputMaybe<Scalars['Int']['input']>;
  /** 지점 */
  branch?: InputMaybe<Scalars['String']['input']>;
  /** 지점 수수료 */
  branchFee?: InputMaybe<Scalars['Int']['input']>;
  /** 발비 */
  businessExpenses?: InputMaybe<Scalars['Int']['input']>;
  /** 발비 내용 */
  businessExpensesDetail?: InputMaybe<Scalars['String']['input']>;
  /** 차종 Id */
  carId: Scalars['Int']['input'];
  /** 차 옵션 */
  carOption?: InputMaybe<Scalars['String']['input']>;
  /** 차량 가격 */
  carPrice?: InputMaybe<Scalars['Int']['input']>;
  /** 현금 지원 */
  cashAssistance?: InputMaybe<Scalars['Int']['input']>;
  cityId?: InputMaybe<Scalars['Int']['input']>;
  /** 담보율 */
  collateralRate?: InputMaybe<Scalars['Int']['input']>;
  /** 회사명/명의자 */
  company_name_nominee?: InputMaybe<Scalars['String']['input']>;
  /** 계약 일 */
  contractAt?: InputMaybe<Scalars['String']['input']>;
  /** 약정 기간 */
  contractPeriod?: InputMaybe<Scalars['Int']['input']>;
  customerId: Scalars['Int']['input'];
  /** 구분 */
  divisionId?: InputMaybe<Scalars['Int']['input']>;
  /** 수수료 */
  fee?: InputMaybe<Scalars['Int']['input']>;
  /** 수수료 비율 */
  feeRate?: InputMaybe<Scalars['Float']['input']>;
  /** 금융사 id */
  financialCompanyId?: InputMaybe<Scalars['Int']['input']>;
  /** 계약사실확인서 여부 */
  hasContractConfirmationLetter?: InputMaybe<Scalars['Boolean']['input']>;
  /** 등록증 여부 */
  hasRegistrationCertificate?: InputMaybe<Scalars['Boolean']['input']>;
  /** 소득자 */
  incomeEarner?: InputMaybe<Scalars['String']['input']>;
  /** 내부 색상 */
  innerColor?: InputMaybe<Scalars['String']['input']>;
  /** 보험 연령 */
  insuranceAge?: InputMaybe<Scalars['Int']['input']>;
  /** 발주 여부 */
  isOrdering?: InputMaybe<Scalars['String']['input']>;
  /** 월 납입료 */
  monthlyPayment?: InputMaybe<Scalars['Int']['input']>;
  /** 순수익 */
  netIncome?: InputMaybe<Scalars['Int']['input']>;
  /** 비고 */
  note?: InputMaybe<Scalars['String']['input']>;
  /** 대물 */
  object?: InputMaybe<Scalars['Float']['input']>;
  /** 외부 색상 */
  outerColor?: InputMaybe<Scalars['String']['input']>;
  /** 프로모션 */
  promotion?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 1 */
  service1?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 2 */
  service2?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 3 */
  service3?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 내용 1 */
  serviceBody1?: InputMaybe<Scalars['String']['input']>;
  /** 서비스 내용 2 */
  serviceBody2?: InputMaybe<Scalars['String']['input']>;
  /** 서비스 내용 3 */
  serviceBody3?: InputMaybe<Scalars['String']['input']>;
  /** 출고 일 */
  shippingDate?: InputMaybe<Scalars['String']['input']>;
  /** 출고 방식 id */
  shippingMethodId?: InputMaybe<Scalars['Int']['input']>;
  /** 지원 내용 */
  supportDetails?: InputMaybe<Scalars['String']['input']>;
  /** 총지출 */
  totalExpenditure?: InputMaybe<Scalars['Int']['input']>;
  /** 총 수수료 */
  totalFee?: InputMaybe<Scalars['Int']['input']>;
  /** 총 계약 금액 */
  totalPrice?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type CreateCounselDto = {
  context: Scalars['String']['input'];
  contract_id?: InputMaybe<Scalars['Int']['input']>;
  /** 상담 일시 */
  counselAt: Scalars['String']['input'];
  customer_id: Scalars['Int']['input'];
  image_url?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateCustomerDto = {
  /** 차종 */
  carName?: InputMaybe<Scalars['String']['input']>;
  customerGradeId?: InputMaybe<Scalars['Int']['input']>;
  customerGroupId?: InputMaybe<Scalars['Int']['input']>;
  customerStatusId?: InputMaybe<Scalars['Int']['input']>;
  /** 메모 */
  memo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  /** 비고 */
  note?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  /** 고객 유형 */
  type?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
};

export type CreateCustomerGradeDto = {
  name: Scalars['String']['input'];
};

export type CreateCustomerGroupDto = {
  name: Scalars['String']['input'];
};

export type CreateCustomerStatusDto = {
  /** 고객 상태 이름 */
  status: Scalars['String']['input'];
};

export type CreateNoticeDto = {
  /** 공지사항 내용 */
  body: Scalars['String']['input'];
  /** 공지사항 제목 */
  title: Scalars['String']['input'];
};

export type CreatePayStubDto = {
  month: Scalars['String']['input'];
  year: Scalars['String']['input'];
};

/** 지원금 생성 */
export type CreateSupportAmountDto = {
  /** 지원금액 */
  amount: Scalars['Int']['input'];
  /** 내용1 */
  body1?: InputMaybe<Scalars['String']['input']>;
  /** 내용2 */
  body2?: InputMaybe<Scalars['String']['input']>;
  /** 내용3 */
  body3?: InputMaybe<Scalars['String']['input']>;
  /** 내용4 */
  body4?: InputMaybe<Scalars['String']['input']>;
  contractId: Scalars['Int']['input'];
};

export type CreateTeamDto = {
  /** 조직 장 userId */
  leaderUserId?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  /** 상위 부모 조직 Id */
  parentId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateUserDto = {
  /** 은행 */
  bank?: InputMaybe<Scalars['String']['input']>;
  /** 생년월일 */
  birthDate?: InputMaybe<Scalars['String']['input']>;
  /** 소속 */
  company?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  /** 이메일주소 */
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  /** 영문이름 */
  englishName?: InputMaybe<Scalars['String']['input']>;
  /** 팩스번호 */
  fax?: InputMaybe<Scalars['String']['input']>;
  /** 입사일시 */
  hireDate?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  /** 연락처 */
  phone?: InputMaybe<Scalars['String']['input']>;
  positionId: Scalars['Int']['input'];
  /** 급여계좌번호 */
  salaryAccount?: InputMaybe<Scalars['String']['input']>;
  /** 영업폰 */
  salesPhone?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

/** 고객 */
export type Customer = {
  /** 선수금 */
  advancePayment?: Maybe<Scalars['Int']['output']>;
  /** 약정 거리 */
  agreedMileage?: Maybe<Scalars['Int']['output']>;
  /** 차종 */
  carName?: Maybe<Scalars['String']['output']>;
  /** 차 옵션 */
  carOption?: Maybe<Scalars['String']['output']>;
  /** 회사명/명의자 */
  company_name_nominee?: Maybe<Scalars['String']['output']>;
  contractList: Array<Contract>;
  /** 약정 기간 */
  contractPeriod?: Maybe<Scalars['Int']['output']>;
  counselList: Array<Counsel>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** 고객 테이블의 division */
  customerDivision?: Maybe<Division>;
  customerGrade?: Maybe<CustomerGrade>;
  customerGroup?: Maybe<CustomerGroup>;
  customerStatus?: Maybe<CustomerStatus>;
  customer_grade_id?: Maybe<Scalars['Int']['output']>;
  customer_group_id?: Maybe<Scalars['Int']['output']>;
  customer_status_id?: Maybe<Scalars['Int']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  divisionId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  /** 보험 연령 */
  insuranceAge?: Maybe<Scalars['Int']['output']>;
  /** 고객 메모 */
  memo?: Maybe<Scalars['String']['output']>;
  /** 고객 이름 */
  name: Scalars['String']['output'];
  /** 비고 */
  note?: Maybe<Scalars['String']['output']>;
  /** 원산지 */
  origin?: Maybe<Scalars['String']['output']>;
  /** 핸드폰 번호 */
  phone: Scalars['String']['output'];
  /** 상태 */
  status: Scalars['String']['output'];
  /** 추가 연락처 */
  sub_phone?: Maybe<Scalars['String']['output']>;
  /** 고객 유형 */
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  userList: User;
  user_id: Scalars['Int']['output'];
};

/** 고객 등급 */
export type CustomerGrade = {
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  /** 등급 이름 */
  name: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** 고객 그룹 */
export type CustomerGroup = {
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  /** 그룹 이름 */
  name: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** 검색 타입 Enum Type */
export enum CustomerSearchType {
  /** 차종 */
  CarName = 'CAR_NAME',
  /** 고객등급 */
  CustomerGrade = 'CUSTOMER_GRADE',
  /** 고객명 */
  CustomerName = 'CUSTOMER_NAME',
  /** 상태 */
  CustomerStatus = 'CUSTOMER_STATUS',
  /** 구분 */
  Division = 'DIVISION',
  /** 메모 */
  Memo = 'MEMO',
  /** 비고 */
  Note = 'NOTE',
  /** 연락처 */
  Phone = 'PHONE',
  /** 고객유형 */
  Type = 'TYPE'
}

/** 정렬 방향 Enum Type */
export enum CustomerSortDirectionType {
  /** 오름차순 */
  Asc = 'ASC',
  /** 내림차순 */
  Desc = 'DESC'
}

/** 고객 상태 */
export type CustomerStatus = {
  /** id */
  id: Scalars['Int']['output'];
  /** 고객 상태 이름 */
  status: Scalars['String']['output'];
};

/** 구분 */
export type Division = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

/** 금융사 */
export type FinancialCompany = {
  id: Scalars['Int']['output'];
  /** 이름 */
  name: Scalars['String']['output'];
};

export type GetAdjustmentsDto = {
  month: Scalars['String']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  /** 담당자 Ids */
  userIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  year: Scalars['String']['input'];
};

export type GetAgencyContractsDto = {
  /** 결제일 종료일 */
  endAgencyPaymentDate?: InputMaybe<Scalars['String']['input']>;
  /** 출고일 종료일 */
  endShippingDate?: InputMaybe<Scalars['String']['input']>;
  /** 데이터 가져올 시작 위치 */
  lastCreatedAt?: InputMaybe<Scalars['String']['input']>;
  /** 데이터 가져올 개수 */
  limit: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  /** 결제일 시작일 */
  startAgencyPaymentDate?: InputMaybe<Scalars['String']['input']>;
  /** 출고일 시작일 */
  startShippingDate?: InputMaybe<Scalars['String']['input']>;
};

export type GetBrandsDto = {
  isDomestic?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GetCarsDto = {
  brandId?: InputMaybe<Scalars['Float']['input']>;
};

export type GetCitiesDto = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type GetContractsDto = {
  customerId?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 계약일자 년월 */
  endContractAtYearMonth?: InputMaybe<Scalars['String']['input']>;
  /** 데이터 가져올 시작 위치 */
  lastCreatedAt?: InputMaybe<Scalars['String']['input']>;
  /** 데이터 가져올 개수 */
  limit: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  searchType?: InputMaybe<ContractSearchType>;
  /** 출고방식 ids */
  shippingMethodIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 계약일자 년월 시작일 */
  startContractAtYearMonth?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type GetCounselsDto = {
  customerGroupId?: InputMaybe<Array<Scalars['Int']['input']>>;
  customerStatusId?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 데이터 가져올 시작 위치 */
  lastCreatedAt?: InputMaybe<Scalars['String']['input']>;
  /** 데이터 가져올 개수 */
  limit: Scalars['Int']['input'];
  /** 검색 내용 */
  search?: InputMaybe<Scalars['String']['input']>;
  /** 검색 타입 */
  searchType?: InputMaybe<CounselSearchType>;
  /** 정렬 방향 */
  sortDirection?: InputMaybe<CounselSortDirectionType>;
  /** 정렬 기준 */
  sortKey?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type GetCustomerTaxesDto = {
  month: Scalars['String']['input'];
  year: Scalars['String']['input'];
};

export type GetCustomersDto = {
  /** 고객 등급 Id */
  customerGradeId?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 고객 그룹 Id */
  customerGroupId?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 고객 상태 Id */
  customerStatusId?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 데이터 가져올 시작 위치 */
  lastCreatedAt?: InputMaybe<Scalars['String']['input']>;
  /** 데이터 가져올 개수 */
  limit: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  /** 검색 타입 */
  searchType?: InputMaybe<CustomerSearchType>;
  /** 정렬 방향 */
  sortDirection?: InputMaybe<CustomerSortDirectionType>;
  /** 정렬 기준 */
  sortKey?: InputMaybe<Scalars['String']['input']>;
  /** 유저 Id */
  userId?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type GetDashBoardByUsersDto = {
  month: Scalars['String']['input'];
  year: Scalars['String']['input'];
};

export type GetDeliveriesDto = {
  /** 구분 Ids */
  divisionIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 출고일 마지막일 */
  endDeliveryAtYearMonth?: InputMaybe<Scalars['String']['input']>;
  /** 금융사 Ids */
  financialCompanyIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 데이터 가져올 시작 위치 */
  lastCreatedAt?: InputMaybe<Scalars['String']['input']>;
  /** 데이터 가져올 개수 */
  limit: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  /** 출고일 시작일 */
  startDeliveryAtYearMonth?: InputMaybe<Scalars['String']['input']>;
  /** 유저 Ids */
  userIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type GetPayStubDto = {
  /** 월 */
  month?: InputMaybe<Scalars['String']['input']>;
  /** 직책 ids */
  positionIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 년 */
  year?: InputMaybe<Scalars['String']['input']>;
};

export type GetUserIncentiveDeliveryTaxesDto = {
  month: Scalars['String']['input'];
  year: Scalars['String']['input'];
};

/** 월별 top5 유저 */
export type MonthlyTopFiveUser = {
  month: Scalars['String']['output'];
  /** 출고건수 */
  totalCountDelivery?: Maybe<Scalars['Int']['output']>;
  /** 매출 합계 */
  totalFeeDelivery?: Maybe<Scalars['Int']['output']>;
  user: User;
  userId?: Maybe<Scalars['Int']['output']>;
  year: Scalars['String']['output'];
};

export type Mutation = {
  /** 추가 수당 생성 */
  createAdditionalIncentive: AdditionalIncentive;
  /** 상여금 생성 */
  createBonus: Bonus;
  /** 브랜드 생성 */
  createBrand: Brand;
  /** 차량 생성 */
  createCar: Car;
  /** 도시 생성 */
  createCity: City;
  /** 계약 생성 */
  createContract: Contract;
  /** 상담 생성 */
  createCounsel: Counsel;
  /** 어드민 고객 생성 */
  createCustomer: Customer;
  /** 고객 등급 생성 */
  createCustomerGrade: CustomerGrade;
  /** 고객 그룹 생성 */
  createCustomerGroup: CustomerGroup;
  /** 고객 상태 생성 */
  createCustomerStatus: CustomerStatus;
  /** 공지사항 생성 */
  createNotice: Notice;
  /** 급여 명세서 생성 */
  createPayStub: Scalars['Boolean']['output'];
  /** 지원금 생성 */
  createSupportAmount: SupportAmount;
  /** 팀 생성 */
  createTeam: Team;
  /** 유저 생성 */
  createUser: User;
  /** 추가 수당 삭제 */
  deleteAdditionalIncentive: Scalars['Boolean']['output'];
  /** 전체 알림 삭제 */
  deleteAllNotification: Scalars['Boolean']['output'];
  /** 상여금 삭제 */
  deleteBonus: Scalars['Boolean']['output'];
  /** 브랜드 삭제 */
  deleteBrand: Scalars['Boolean']['output'];
  /** 차량 삭제 */
  deleteCar: Scalars['Boolean']['output'];
  /** 도시 삭제 */
  deleteCity: Scalars['String']['output'];
  /** 계약 삭제 */
  deleteContract: Scalars['String']['output'];
  /** 상담 삭제 */
  deleteCounsel: Scalars['String']['output'];
  /** 고객 삭제 */
  deleteCustomer: Scalars['String']['output'];
  /** 고객 그룹 삭제 */
  deleteCustomerGrade: Scalars['String']['output'];
  /** 고객 그룹 삭제 */
  deleteCustomerGroup: Scalars['String']['output'];
  /** 고객 상태 삭제 */
  deleteCustomerStatus: Scalars['String']['output'];
  /** 공지사항 삭제 */
  deleteNotice: Scalars['Boolean']['output'];
  /** 알림 삭제 */
  deleteNotification: Scalars['Boolean']['output'];
  /** 지원금 삭제 */
  deleteSupportAmount: Scalars['Boolean']['output'];
  /** 팀 삭제 */
  deleteTeam: Scalars['Boolean']['output'];
  /** 유저 삭제 */
  deleteUser: Scalars['Boolean']['output'];
  /** 전체 알림 읽음 */
  readAllNotification: Scalars['Boolean']['output'];
  /** 알림 읽음 */
  readNotification: Notification;
  /** 토큰 재발급 */
  refresh: AuthPayload;
  /** 로그인 */
  signIn: AuthPayload;
  /** 로그아웃 */
  signOut: Scalars['String']['output'];
  /** 유저 생성 */
  signUp: User;
  /** 테스트 계정 생성 */
  testSignUp: User;
  /** 추가 수당 수정 */
  updateAdditionalIncentive: AdditionalIncentive;
  /** 상여금 수정 */
  updateBonus: Bonus;
  /** 브랜드 수정 */
  updateBrand: Brand;
  /** 차량 수정 */
  updateCar: Car;
  /** 도시 수정 */
  updateCity: City;
  /** 계약 수정 */
  updateContract: Contract;
  /** 상담 수정 */
  updateCounsel: Counsel;
  /** 고객 정보 수정 */
  updateCustomer: Customer;
  /** 고객 등급 수정 */
  updateCustomerGrade: CustomerGrade;
  /** 고객 그룹 수정 */
  updateCustomerGroup: CustomerGroup;
  /** 고객 담당자 수정 */
  updateCustomerOfUser: Customer;
  /** 고객 상태 수정 */
  updateCustomerStatus: CustomerStatus;
  /** 여러 고객 정보 수정 */
  updateCustomers: Scalars['Boolean']['output'];
  /** 내 정보 수정 */
  updateMyInfo: AuthPayload;
  /** 공지사항 수정 */
  updateNotice: Notice;
  /** 비밀번호 수정 */
  updatePassword: Scalars['Boolean']['output'];
  /** 지원금 수정 */
  updateSupportAmount: SupportAmount;
  /** 팀 수정 */
  updateTeam: Team;
  /** 유저 정보 수정 / 관리자 */
  updateUser: User;
};


export type MutationCreateAdditionalIncentiveArgs = {
  createAdditionalIncentiveDto: CreateAdditionalIncentiveDto;
};


export type MutationCreateBonusArgs = {
  createBonusDto: CreateBonusDto;
};


export type MutationCreateBrandArgs = {
  createBrandDto: CreateBrandDto;
};


export type MutationCreateCarArgs = {
  createCarDto: CreateCarDto;
};


export type MutationCreateCityArgs = {
  createCityDto: CreateCityDto;
};


export type MutationCreateContractArgs = {
  createContractDto: CreateContractDto;
};


export type MutationCreateCounselArgs = {
  createCounselDto: CreateCounselDto;
};


export type MutationCreateCustomerArgs = {
  createCustomerDto: CreateCustomerDto;
};


export type MutationCreateCustomerGradeArgs = {
  CreateCustomerGradeDto: CreateCustomerGradeDto;
};


export type MutationCreateCustomerGroupArgs = {
  CreateCustomerGroupDto: CreateCustomerGroupDto;
};


export type MutationCreateCustomerStatusArgs = {
  CreateCustomerStatusDto: CreateCustomerStatusDto;
};


export type MutationCreateNoticeArgs = {
  createNoticeDto: CreateNoticeDto;
};


export type MutationCreatePayStubArgs = {
  createPayStubDto: CreatePayStubDto;
};


export type MutationCreateSupportAmountArgs = {
  createSupportAmountDto: CreateSupportAmountDto;
};


export type MutationCreateTeamArgs = {
  createTeamDto: CreateTeamDto;
};


export type MutationCreateUserArgs = {
  createUserDto: CreateUserDto;
};


export type MutationDeleteAdditionalIncentiveArgs = {
  additionalIncentiveId: Scalars['Float']['input'];
};


export type MutationDeleteBonusArgs = {
  bonusId: Scalars['Float']['input'];
};


export type MutationDeleteBrandArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteCarArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteCityArgs = {
  cityId: Scalars['Float']['input'];
};


export type MutationDeleteContractArgs = {
  contractIds: Array<Scalars['Int']['input']>;
};


export type MutationDeleteCounselArgs = {
  counselIds: Array<Scalars['Int']['input']>;
};


export type MutationDeleteCustomerArgs = {
  customerIds: Array<Scalars['Int']['input']>;
};


export type MutationDeleteCustomerGradeArgs = {
  customerGradeId: Scalars['Float']['input'];
};


export type MutationDeleteCustomerGroupArgs = {
  customerGroupId: Scalars['Float']['input'];
};


export type MutationDeleteCustomerStatusArgs = {
  customerStatusId: Scalars['Float']['input'];
};


export type MutationDeleteNoticeArgs = {
  noticeId: Scalars['Float']['input'];
};


export type MutationDeleteNotificationArgs = {
  notificationId: Scalars['Float']['input'];
};


export type MutationDeleteSupportAmountArgs = {
  supportAmountId: Scalars['Float']['input'];
};


export type MutationDeleteTeamArgs = {
  teamId: Scalars['Float']['input'];
};


export type MutationDeleteUserArgs = {
  deleteUserId: Scalars['Float']['input'];
  targetUserId?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationReadNotificationArgs = {
  notificationId: Scalars['Float']['input'];
};


export type MutationRefreshArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  signInDto: SignInDto;
};


export type MutationSignUpArgs = {
  signUpDto: SignUpDto;
};


export type MutationTestSignUpArgs = {
  signUpDto: SignUpDto;
};


export type MutationUpdateAdditionalIncentiveArgs = {
  updateAdditionalIncentiveDto: UpdateAdditionalIncentiveDto;
};


export type MutationUpdateBonusArgs = {
  updateBonusDto: UpdateBonusDto;
};


export type MutationUpdateBrandArgs = {
  updateBrandDto: UpdateBrandDto;
};


export type MutationUpdateCarArgs = {
  updateCarDto: UpdateCarDto;
};


export type MutationUpdateCityArgs = {
  updateCityDto: UpdateCityDto;
};


export type MutationUpdateContractArgs = {
  updateContractDto: UpdateContractDto;
};


export type MutationUpdateCounselArgs = {
  updateCounselDto: UpdateCounselDto;
};


export type MutationUpdateCustomerArgs = {
  updateCustomerDto: UpdateCustomerDto;
};


export type MutationUpdateCustomerGradeArgs = {
  UpdateCustomerGradeDto: UpdateCustomerGradeDto;
};


export type MutationUpdateCustomerGroupArgs = {
  UpdateCustomerGroupDto: UpdateCustomerGroupDto;
};


export type MutationUpdateCustomerOfUserArgs = {
  updateCustomerOfUserDto: UpdateCustomerOfUserDto;
};


export type MutationUpdateCustomerStatusArgs = {
  UpdateCustomerStatusDto: UpdateCustomerStatusDto;
};


export type MutationUpdateCustomersArgs = {
  updateCustomersDto: UpdateCustomersDto;
};


export type MutationUpdateMyInfoArgs = {
  updateUserMyInfoDto: UpdateUserMyInfoDto;
};


export type MutationUpdateNoticeArgs = {
  updateNoticeDto: UpdateNoticeDto;
};


export type MutationUpdatePasswordArgs = {
  updatePasswordDto: UpdatePasswordDto;
};


export type MutationUpdateSupportAmountArgs = {
  updateSupportAmountDto: UpdateSupportAmountDto;
};


export type MutationUpdateTeamArgs = {
  updateTeamDto: UpdateTeamDto;
};


export type MutationUpdateUserArgs = {
  updateUserDto: UpdateUserDto;
};

/** 공지사항 */
export type Notice = {
  author: User;
  authorId: Scalars['Int']['output'];
  /** 공지사항 내용 */
  body: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  /** 공지사항 제목 */
  title: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** 알림 */
export type Notification = {
  /** 알림 내용 */
  content: Scalars['String']['output'];
  counselId?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  customerId?: Maybe<Scalars['Int']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  fromUserId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  /** 읽음 여부 */
  isRead: Scalars['Boolean']['output'];
  targetUserId: Scalars['Int']['output'];
  /** 알림 제목 */
  title: Scalars['String']['output'];
  /** 알림 타입 */
  type: NotificationType;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type NotificationPayLoad = {
  /** 알림 개수 */
  count: Scalars['Int']['output'];
  /** 새로운 메세지 개수 */
  isNewNotificationCount: Scalars['Int']['output'];
  notifications: Array<Notification>;
};

/** 알림 타입 EnumType */
export enum NotificationType {
  /** 상담 등록 알림 타입 */
  Counsel = 'COUNSEL',
  /** 고객 담당자 지정 알림 타입 */
  Customer = 'CUSTOMER'
}

/** 급여명세서 */
export type PayStub = {
  /** 실수령액 - 수당합계 - 소득세 */
  actualSalary: Scalars['Int']['output'];
  contracts: Array<Contract>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  day?: Maybe<Scalars['String']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** 기타수당 */
  etcIncentive?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  /** 소득세 - 수당합계 * 0.033 */
  incomeTax: Scalars['Int']['output'];
  /** 월 */
  month: Scalars['String']['output'];
  /** 수당합계 - 출고수당 합계 + 추가수당 합계 + 기타수당 합계 */
  totalAllowance?: Maybe<Scalars['Int']['output']>;
  /** 지원합계 - 출고지출 합계 */
  totalExpenditureDelivery: Scalars['Int']['output'];
  /** 매출합계 - 출고매출 합계 */
  totalFeeDelivery: Scalars['Int']['output'];
  /** 출고 수당의 직급별 인센티브 */
  totalIncentiveDelivery?: Maybe<Scalars['Float']['output']>;
  /** 정산합계 - 출고순익 합계 */
  totalNetIncomeDelivery: Scalars['Int']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  userId?: Maybe<Scalars['Int']['output']>;
  /** 년도 */
  year: Scalars['String']['output'];
};

/** 권한 Enum Type */
export enum PermissionType {
  /** ADMIN */
  Admin = 'ADMIN',
  /** USER */
  User = 'USER'
}

/** 직책 */
export type Position = {
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  name: PositionType;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** 직책 EnumType */
export enum PositionType {
  /** 관리자 */
  Admin = 'ADMIN',
  /** 대리 */
  AssistantManager = 'ASSISTANT_MANAGER',
  /** 대표 */
  Ceo = 'CEO',
  /** 실장 */
  DepartmentManager = 'DEPARTMENT_MANAGER',
  /** 본부장 */
  GeneralManager = 'GENERAL_MANAGER',
  /** 과장 */
  Manager = 'MANAGER',
  /** 차장 */
  SeniorManager = 'SENIOR_MANAGER',
  /** 사원 */
  Staff = 'STAFF',
  /** 팀장 */
  TeamLeader = 'TEAM_LEADER'
}

export type Query = {
  /** 새 알림 체크 api */
  checkNewNotifications: Scalars['Boolean']['output'];
  /** 계약 정산 유무 */
  checkSettleContract: Scalars['Boolean']['output'];
  /** 정산 리스트 조회 */
  getAdjustments: Array<Adjustment>;
  /** 대리점 계약 리스트 조회 */
  getAgencyContracts: Array<Contract>;
  /** 브랜드 조회 */
  getBrand: Brand;
  /** 브랜드 리스트 조회 */
  getBrands: Array<Brand>;
  /** 차량 상세 조회 */
  getCar: Car;
  /** 차량 목록 조회 */
  getCars: Array<Car>;
  /** 도시 리스트 조회 */
  getCities: Array<City>;
  /** 도시 상세 조회 */
  getCity: City;
  /** 계약 조회 */
  getContract: Contract;
  /** 계약 리스트 조회 */
  getContracts: Array<Contract>;
  /** 상담 정보 조회 */
  getCounsel: Counsel;
  /** 상담 리스트 조회 */
  getCounsels: Array<Counsel>;
  /** 고객 정보 조회 */
  getCustomer: Customer;
  /** 고객 등급 상세페이지 */
  getCustomerGrade: CustomerGrade;
  /** 고객 등급 리스트 */
  getCustomerGrades: Array<CustomerGrade>;
  /** 고객 그룹 상세페이지 */
  getCustomerGroup: CustomerGroup;
  /** 고객 그룹 리스트 */
  getCustomerGroups: Array<CustomerGroup>;
  /** 고객 상태 리스트 */
  getCustomerStatuses: Array<CustomerStatus>;
  /** 고객 현금지원 관련 세금 리스트 조회 */
  getCustomerTaxes: Array<Contract>;
  /** 고객 리스트 조회 */
  getCustomers: Array<Customer>;
  /** 출고 내역 리스트 조회 */
  getDeliveries: Array<Contract>;
  /** 구분 리스트 */
  getDivisions: Array<Division>;
  /** 금융사 리스트 */
  getFinancialCompanies: Array<FinancialCompany>;
  /** 노출 최신 공지사항 */
  getLatestNotice: Notice;
  /** 내 정보 조회 */
  getMyInfo: User;
  /** 공지사항 상세 */
  getNotice: Notice;
  /** 공지사항 목록 */
  getNotices: Array<Notice>;
  /** 알림 리스트 */
  getNotifications: NotificationPayLoad;
  /** 급여 명세서 상세페이지 */
  getPayStub: PayStub;
  /** 급여명세서 리스트 */
  getPayStubs: Array<PayStub>;
  /** 직책 리스트 */
  getPositions: Array<Position>;
  /** 출고방식 리스트 */
  getShippingMethods: Array<ShippingMethod>;
  /** 지원금 조회 */
  getSupportAmount: SupportAmount;
  /** 지원금 리스트 조회 */
  getSupportAmounts: Array<SupportAmount>;
  /** 팀 조회 */
  getTeam: Team;
  /** 팀 리스트 조회 */
  getTeams: Array<Team>;
  /** 월별 출고건수 top5 유저 */
  getTopFiveDeliveryUsersByMonth: Array<MonthlyTopFiveUser>;
  /** 월별 매출 top5 유저 */
  getTopFiveTotalFeeDeliveryUsersByMonth: Array<MonthlyTopFiveUser>;
  /** 담당자 상세 페이지 조회 */
  getUser: User;
  /** 직원 출고 수당 리스트 조회 */
  getUserIncentiveDeliveryTaxes: Array<UserIncentiveDeliveryTax>;
  /** 담당자 리스트 */
  getUsers: Array<User>;
  /** 정산 엑셀 이메일 발송 */
  makeExcel: Scalars['Boolean']['output'];
  userInfo: Scalars['String']['output'];
};


export type QueryCheckSettleContractArgs = {
  checkSettleContractDto: CheckSettleContractDto;
};


export type QueryGetAdjustmentsArgs = {
  getAdjustmentsDto: GetAdjustmentsDto;
};


export type QueryGetAgencyContractsArgs = {
  getAgencyContractsDto: GetAgencyContractsDto;
};


export type QueryGetBrandArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetBrandsArgs = {
  getBrandsDto: GetBrandsDto;
};


export type QueryGetCarArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetCarsArgs = {
  getCarsDto: GetCarsDto;
};


export type QueryGetCitiesArgs = {
  getCitiesDto: GetCitiesDto;
};


export type QueryGetCityArgs = {
  cityId: Scalars['Float']['input'];
};


export type QueryGetContractArgs = {
  contractId: Scalars['Float']['input'];
};


export type QueryGetContractsArgs = {
  getContractsDto: GetContractsDto;
};


export type QueryGetCounselArgs = {
  counselId: Scalars['Float']['input'];
};


export type QueryGetCounselsArgs = {
  getCounselsDto: GetCounselsDto;
};


export type QueryGetCustomerArgs = {
  customerId: Scalars['Float']['input'];
};


export type QueryGetCustomerGradeArgs = {
  customerGradeId: Scalars['Float']['input'];
};


export type QueryGetCustomerGroupArgs = {
  customerGroupId: Scalars['Float']['input'];
};


export type QueryGetCustomerTaxesArgs = {
  getCustomerTaxesDto: GetCustomerTaxesDto;
};


export type QueryGetCustomersArgs = {
  getCustomersDto: GetCustomersDto;
};


export type QueryGetDeliveriesArgs = {
  getDeliveriesDto: GetDeliveriesDto;
};


export type QueryGetNoticeArgs = {
  noticeId: Scalars['Float']['input'];
};


export type QueryGetNotificationsArgs = {
  limit: Scalars['Float']['input'];
  offset: Scalars['Float']['input'];
};


export type QueryGetPayStubArgs = {
  payStubId: Scalars['Float']['input'];
};


export type QueryGetPayStubsArgs = {
  getPayStubDto: GetPayStubDto;
};


export type QueryGetSupportAmountArgs = {
  supportAmountId: Scalars['Float']['input'];
};


export type QueryGetSupportAmountsArgs = {
  contractId: Scalars['Float']['input'];
};


export type QueryGetTeamArgs = {
  teamId: Scalars['Float']['input'];
};


export type QueryGetTopFiveDeliveryUsersByMonthArgs = {
  getTopFiveDeliveryUsersByMonthDto: GetDashBoardByUsersDto;
};


export type QueryGetTopFiveTotalFeeDeliveryUsersByMonthArgs = {
  getTopFiveTotalFeeDeliveryUsersByMonthDto: GetDashBoardByUsersDto;
};


export type QueryGetUserArgs = {
  userId: Scalars['Float']['input'];
};


export type QueryGetUserIncentiveDeliveryTaxesArgs = {
  getUserIncentiveDeliveryTaxesDto: GetUserIncentiveDeliveryTaxesDto;
};


export type QueryMakeExcelArgs = {
  email: Scalars['String']['input'];
  month: Scalars['String']['input'];
  year: Scalars['String']['input'];
};

export type Role = {
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  name: PermissionType;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** 출고방식 */
export type ShippingMethod = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type SignInDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpDto = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  positionId: Scalars['Int']['input'];
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

/** status Enum Type */
export enum Status {
  /** 활성화 */
  Active = 'ACTIVE',
  /** 삭제 */
  Deleted = 'DELETED'
}

/** 지원금액 */
export type SupportAmount = {
  /** 지원 금액 */
  amount: Scalars['Int']['output'];
  body1: Scalars['String']['output'];
  body2: Scalars['String']['output'];
  body3: Scalars['String']['output'];
  body4: Scalars['String']['output'];
  contract_id: Scalars['Int']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type Team = {
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** 깊이 */
  depth?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  leader?: Maybe<User>;
  leaderId?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['Int']['output']>;
  parentTeam?: Maybe<Team>;
  subTeams?: Maybe<Array<Team>>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  userList: Array<User>;
};

export type UpdateAdditionalIncentiveDto = {
  /** 추가 수당 */
  additionalIncentive?: InputMaybe<Scalars['Int']['input']>;
  /** 추가 수당 Id */
  additionalIncentiveId: Scalars['Int']['input'];
};

export type UpdateBonusDto = {
  /** 상여금 */
  bonus?: InputMaybe<Scalars['Int']['input']>;
  bonusId: Scalars['Int']['input'];
  /** 월 */
  month?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  /** 년도 */
  year?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBrandDto = {
  /** 수수료 */
  brandFee?: InputMaybe<Scalars['Float']['input']>;
  /** 브랜드 아이디 */
  id: Scalars['Int']['input'];
  /** 국산 여부 */
  isDomestic?: InputMaybe<Scalars['Boolean']['input']>;
  /** 브랜드 이름 */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCarDto = {
  /** 브랜드 아이디 */
  brandId?: InputMaybe<Scalars['Int']['input']>;
  /** 차량 수수료 */
  carFee?: InputMaybe<Scalars['Float']['input']>;
  /** 차량 아이디 */
  id: Scalars['Int']['input'];
  /** 차량 이름 */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCityDto = {
  cityId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type UpdateContractDto = {
  /** 선수금 */
  advancePayment?: InputMaybe<Scalars['Int']['input']>;
  /** 대리점 결제일 */
  agencyPaymentDate?: InputMaybe<Scalars['String']['input']>;
  /** 약정 거리 */
  agreedMileage?: InputMaybe<Scalars['Int']['input']>;
  /** 지점 */
  branch?: InputMaybe<Scalars['String']['input']>;
  /** 지점 수수료 */
  branchFee?: InputMaybe<Scalars['Int']['input']>;
  /** 발비 */
  businessExpenses?: InputMaybe<Scalars['Int']['input']>;
  /** 발비 내용 */
  businessExpensesDetail?: InputMaybe<Scalars['String']['input']>;
  /** 차종 */
  carId?: InputMaybe<Scalars['Int']['input']>;
  /** 차 옵션 */
  carOption?: InputMaybe<Scalars['String']['input']>;
  /** 차량 가격 */
  carPrice?: InputMaybe<Scalars['Int']['input']>;
  /** 현금 지원 */
  cashAssistance?: InputMaybe<Scalars['Int']['input']>;
  cityId?: InputMaybe<Scalars['Int']['input']>;
  /** 담보율 */
  collateralRate?: InputMaybe<Scalars['Int']['input']>;
  /** 회사명/명의자 */
  company_name_nominee?: InputMaybe<Scalars['String']['input']>;
  /** 계약 일 */
  contractAt?: InputMaybe<Scalars['String']['input']>;
  contractId: Scalars['Int']['input'];
  /** 약정 기간 */
  contractPeriod?: InputMaybe<Scalars['Int']['input']>;
  customerId: Scalars['Int']['input'];
  /** 구분 id */
  divisionId?: InputMaybe<Scalars['Int']['input']>;
  /** 수수료 */
  fee?: InputMaybe<Scalars['Int']['input']>;
  /** 수수료 비율 */
  feeRate?: InputMaybe<Scalars['Float']['input']>;
  /** 금융사 id */
  financialCompanyId?: InputMaybe<Scalars['Int']['input']>;
  /** 계약사실확인서 여부 */
  hasContractConfirmationLetter?: InputMaybe<Scalars['Boolean']['input']>;
  /** 등록증 여부 */
  hasRegistrationCertificate?: InputMaybe<Scalars['Boolean']['input']>;
  /** 소득자 */
  incomeEarner?: InputMaybe<Scalars['String']['input']>;
  /** 내부 색상 */
  innerColor?: InputMaybe<Scalars['String']['input']>;
  /** 보험 연령 */
  insuranceAge?: InputMaybe<Scalars['Int']['input']>;
  /** 정산 수수료 */
  interChangeFee?: InputMaybe<Scalars['Int']['input']>;
  /** 출고 여부 */
  isOrdering?: InputMaybe<Scalars['String']['input']>;
  /** 월 납입료 */
  monthlyPayment?: InputMaybe<Scalars['Int']['input']>;
  /** 순수익 */
  netIncome?: InputMaybe<Scalars['Int']['input']>;
  /** 비고 */
  note?: InputMaybe<Scalars['String']['input']>;
  /** 대물 */
  object?: InputMaybe<Scalars['Float']['input']>;
  /** 외부 색상 */
  outerColor?: InputMaybe<Scalars['String']['input']>;
  /** 프로모션 */
  promotion?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 1 */
  service1?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 2 */
  service2?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 3 */
  service3?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 내용 1 */
  serviceBody1?: InputMaybe<Scalars['String']['input']>;
  /** 서비스 내용 2 */
  serviceBody2?: InputMaybe<Scalars['String']['input']>;
  /** 서비스 내용 3 */
  serviceBody3?: InputMaybe<Scalars['String']['input']>;
  /** 출고 일 */
  shippingDate?: InputMaybe<Scalars['String']['input']>;
  /** 출고 방식 id */
  shippingMethodId?: InputMaybe<Scalars['Int']['input']>;
  /** 계약 삭제 여부 */
  status?: Status;
  /** 지원 내용 */
  supportDetails?: InputMaybe<Scalars['String']['input']>;
  /** 총지출 */
  totalExpenditure?: InputMaybe<Scalars['Int']['input']>;
  /** 총 수수료 */
  totalFee?: InputMaybe<Scalars['Int']['input']>;
  /** 총 계약 금액 */
  totalPrice?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type UpdateCounselDto = {
  context: Scalars['String']['input'];
  contractId?: InputMaybe<Scalars['Int']['input']>;
  /** 상담 일시 */
  counselAt: Scalars['String']['input'];
  counselId: Scalars['Int']['input'];
  customerId?: InputMaybe<Scalars['Int']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCustomerDto = {
  /** 선수금 */
  advancePayment?: InputMaybe<Scalars['Int']['input']>;
  /** 약정 거리 */
  agreedMileage?: InputMaybe<Scalars['Int']['input']>;
  /** 차종 */
  carName?: InputMaybe<Scalars['String']['input']>;
  /** 차 옵션 */
  carOption?: InputMaybe<Scalars['String']['input']>;
  /** 회사명/명의자 */
  company_name_nominee?: InputMaybe<Scalars['String']['input']>;
  /** 약정 기간 */
  contractPeriod?: InputMaybe<Scalars['Int']['input']>;
  customerGradeId?: InputMaybe<Scalars['Int']['input']>;
  customerGroupId?: InputMaybe<Scalars['Int']['input']>;
  customerId: Scalars['Int']['input'];
  customerStatusId?: InputMaybe<Scalars['Int']['input']>;
  divisionId?: InputMaybe<Scalars['Int']['input']>;
  /** 보험 연령 */
  insuranceAge?: InputMaybe<Scalars['Int']['input']>;
  /** 메모 */
  memo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** 비고 */
  note?: InputMaybe<Scalars['String']['input']>;
  /** 원산지 */
  origin?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  /** 고객 삭제 상태 */
  status?: InputMaybe<Scalars['String']['input']>;
  /** 추가 연락처 */
  sub_phone?: InputMaybe<Scalars['String']['input']>;
  /** 고객 유형 */
  type?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCustomerGradeDto = {
  customerGradeId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type UpdateCustomerGroupDto = {
  customerGroupId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type UpdateCustomerOfUserDto = {
  customerId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type UpdateCustomerStatusDto = {
  customerStatusId: Scalars['Int']['input'];
  /** 고객 상태 이름 */
  status: Scalars['String']['input'];
};

export type UpdateCustomersDto = {
  /** 선수금 */
  advancePayment?: InputMaybe<Scalars['Int']['input']>;
  /** 약정 거리 */
  agreedMileage?: InputMaybe<Scalars['Int']['input']>;
  /** 차종 */
  carName?: InputMaybe<Scalars['String']['input']>;
  /** 차 옵션 */
  carOption?: InputMaybe<Scalars['String']['input']>;
  /** 회사명/명의자 */
  company_name_nominee?: InputMaybe<Scalars['String']['input']>;
  /** 약정 기간 */
  contractPeriod?: InputMaybe<Scalars['Int']['input']>;
  customerGradeId?: InputMaybe<Scalars['Int']['input']>;
  customerGroupId?: InputMaybe<Scalars['Int']['input']>;
  customerIds: Array<Scalars['Int']['input']>;
  customerStatusId?: InputMaybe<Scalars['Int']['input']>;
  divisionId?: InputMaybe<Scalars['Int']['input']>;
  /** 보험 연령 */
  insuranceAge?: InputMaybe<Scalars['Int']['input']>;
  /** 메모 */
  memo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** 비고 */
  note?: InputMaybe<Scalars['String']['input']>;
  /** 원산지 */
  origin?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  /** 고객 삭제 상태 */
  status?: InputMaybe<Scalars['String']['input']>;
  /** 추가 연락처 */
  sub_phone?: InputMaybe<Scalars['String']['input']>;
  /** 고객 유형 */
  type?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateNoticeDto = {
  /** 공지사항 내용 */
  body: Scalars['String']['input'];
  /** 공지사항 아이디 */
  noticeId: Scalars['Int']['input'];
  /** 공지사항 제목 */
  title: Scalars['String']['input'];
};

export type UpdatePasswordDto = {
  password: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

/** 지원금 수정 */
export type UpdateSupportAmountDto = {
  /** 지원금액 */
  amount: Scalars['Int']['input'];
  /** 내용1 */
  body1?: InputMaybe<Scalars['String']['input']>;
  /** 내용2 */
  body2?: InputMaybe<Scalars['String']['input']>;
  /** 내용3 */
  body3?: InputMaybe<Scalars['String']['input']>;
  /** 내용4 */
  body4?: InputMaybe<Scalars['String']['input']>;
  contractId: Scalars['Int']['input'];
  supportAmountId: Scalars['Int']['input'];
};

export type UpdateTeamDto = {
  /** 조직 장 userId */
  leaderUserId?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  /** 상위 부모 조직 Id */
  parentId?: InputMaybe<Scalars['Int']['input']>;
  teamId: Scalars['Int']['input'];
};

export type UpdateUserDto = {
  /** 은행 */
  bank?: InputMaybe<Scalars['String']['input']>;
  /** 생년월일 */
  birthDate?: InputMaybe<Scalars['String']['input']>;
  /** 소속 */
  company?: InputMaybe<Scalars['String']['input']>;
  /** 이메일 */
  email: Scalars['String']['input'];
  /** 이메일주소 */
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  /** 영문이름 */
  englishName?: InputMaybe<Scalars['String']['input']>;
  /** 팩스번호 */
  fax?: InputMaybe<Scalars['String']['input']>;
  /** 입사일시 */
  hireDate?: InputMaybe<Scalars['String']['input']>;
  /** 이름 */
  name: Scalars['String']['input'];
  /** 연락처 */
  phone?: InputMaybe<Scalars['String']['input']>;
  positionId?: InputMaybe<Scalars['Int']['input']>;
  /** 급여계좌번호 */
  salaryAccount?: InputMaybe<Scalars['String']['input']>;
  /** 영업폰 */
  salesPhone?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type UpdateUserMyInfoDto = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  bank?: Maybe<Scalars['String']['output']>;
  birthDate?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  customers?: Maybe<Array<Customer>>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  emailAddress?: Maybe<Scalars['String']['output']>;
  englishName?: Maybe<Scalars['String']['output']>;
  fax?: Maybe<Scalars['String']['output']>;
  hireDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  position: Position;
  role: Role;
  salaryAccount?: Maybe<Scalars['String']['output']>;
  salesPhone?: Maybe<Scalars['String']['output']>;
  team?: Maybe<Team>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type UserIncentiveDeliveryTax = {
  additionalIncentive?: Maybe<AdditionalIncentive>;
  additionalIncentiveId?: Maybe<Scalars['Int']['output']>;
  bonus?: Maybe<Bonus>;
  bonusId?: Maybe<Scalars['Int']['output']>;
  /** 기타 수당 / 팀장급 이상 팀 전체 매출의 인센티브 */
  etcIncentive: Scalars['Float']['output'];
  /** 달 */
  month: Scalars['String']['output'];
  /** 총 경비 */
  totalBusinessExpenses: Scalars['Int']['output'];
  /** 출고 수당 / 직급별 인센티브 */
  totalIncentiveDelivery: Scalars['Float']['output'];
  user: User;
  userId: Scalars['Int']['output'];
  /** 년 */
  year: Scalars['String']['output'];
};

export type CreateAdditionalIncentiveMutationVariables = Exact<{
  createAdditionalIncentiveDto: CreateAdditionalIncentiveDto;
}>;


export type CreateAdditionalIncentiveMutation = { createAdditionalIncentive: { id: number } };

export type UpdateAdditionalIncentiveMutationVariables = Exact<{
  updateAdditionalIncentiveDto: UpdateAdditionalIncentiveDto;
}>;


export type UpdateAdditionalIncentiveMutation = { updateAdditionalIncentive: { id: number } };

export type DeleteAdditionalIncentiveMutationVariables = Exact<{
  additionalIncentiveId: Scalars['Float']['input'];
}>;


export type DeleteAdditionalIncentiveMutation = { deleteAdditionalIncentive: boolean };

export type CreateBonusMutationVariables = Exact<{
  createBonusDto: CreateBonusDto;
}>;


export type CreateBonusMutation = { createBonus: { id: number } };

export type UpdateBonusMutationVariables = Exact<{
  updateBonusDto: UpdateBonusDto;
}>;


export type UpdateBonusMutation = { updateBonus: { id: number } };

export type DeleteBonusMutationVariables = Exact<{
  bonusId: Scalars['Float']['input'];
}>;


export type DeleteBonusMutation = { deleteBonus: boolean };

export type SignInMutationVariables = Exact<{
  signInDto: SignInDto;
}>;


export type SignInMutation = { signIn: { accessToken: string, refreshToken?: string | null, user?: { name: string, id: number, position: { id: number, name: PositionType }, role: { id: number, name: PermissionType } } | null } };

export type SignUpMutationVariables = Exact<{
  signUpDto: SignUpDto;
}>;


export type SignUpMutation = { signUp: { created_at?: string | null, deleted_at?: string | null, email: string, id: number, name: string, password: string, updated_at?: string | null } };

export type MutationMutationVariables = Exact<{ [key: string]: never; }>;


export type MutationMutation = { signOut: string };

export type RefreshMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshMutation = { refresh: { accessToken: string, refreshToken?: string | null, user?: { id: number, name: string, position: { id: number, name: PositionType }, role: { id: number, name: PermissionType } } | null } };

export type UpdateMyInfoMutationVariables = Exact<{
  updateUserMyInfoDto: UpdateUserMyInfoDto;
}>;


export type UpdateMyInfoMutation = { updateMyInfo: { user?: { name: string, id: number } | null } };

export type CreateCityMutationVariables = Exact<{
  createCityDto: CreateCityDto;
}>;


export type CreateCityMutation = { createCity: { id: number, name: string } };

export type UpdateCityMutationVariables = Exact<{
  updateCityDto: UpdateCityDto;
}>;


export type UpdateCityMutation = { updateCity: { id: number, name: string } };

export type DeleteCityMutationVariables = Exact<{
  cityId: Scalars['Float']['input'];
}>;


export type DeleteCityMutation = { deleteCity: string };

export type CreateBrandMutationVariables = Exact<{
  createBrandDto: CreateBrandDto;
}>;


export type CreateBrandMutation = { createBrand: { id: number } };

export type UpdateBrandMutationVariables = Exact<{
  updateBrandDto: UpdateBrandDto;
}>;


export type UpdateBrandMutation = { updateBrand: { id: number, name: string } };

export type DeleteBrandMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteBrandMutation = { deleteBrand: boolean };

export type CreateCarMutationVariables = Exact<{
  createCarDto: CreateCarDto;
}>;


export type CreateCarMutation = { createCar: { id: number } };

export type UpdateCarMutationVariables = Exact<{
  updateCarDto: UpdateCarDto;
}>;


export type UpdateCarMutation = { updateCar: { id: number, name: string } };

export type DeleteCarMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteCarMutation = { deleteCar: boolean };

export type CreateContractMutationVariables = Exact<{
  createContractDto: CreateContractDto;
}>;


export type CreateContractMutation = { createContract: { id: number } };

export type UpdateContractMutationVariables = Exact<{
  updateContractDto: UpdateContractDto;
}>;


export type UpdateContractMutation = { updateContract: { id: number } };

export type DeleteContractMutationVariables = Exact<{
  contractIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteContractMutation = { deleteContract: string };

export type CreateCounselMutationVariables = Exact<{
  createCounselDto: CreateCounselDto;
}>;


export type CreateCounselMutation = { createCounsel: { id: number } };

export type UpdateCounselMutationVariables = Exact<{
  updateCounselDto: UpdateCounselDto;
}>;


export type UpdateCounselMutation = { updateCounsel: { id: number } };

export type DeleteCounselMutationVariables = Exact<{
  counselIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteCounselMutation = { deleteCounsel: string };

export type CreateCustomerMutationVariables = Exact<{
  createCustomerDto: CreateCustomerDto;
}>;


export type CreateCustomerMutation = { createCustomer: { id: number } };

export type UpdateCustomerMutationVariables = Exact<{
  updateCustomerDto: UpdateCustomerDto;
}>;


export type UpdateCustomerMutation = { updateCustomer: { id: number } };

export type DeleteCustomerMutationVariables = Exact<{
  customerIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteCustomerMutation = { deleteCustomer: string };

export type UpdateCustomersMutationVariables = Exact<{
  updateCustomersDto: UpdateCustomersDto;
}>;


export type UpdateCustomersMutation = { updateCustomers: boolean };

export type CreateCustomerGroupMutationVariables = Exact<{
  createCustomerGroupDto: CreateCustomerGroupDto;
}>;


export type CreateCustomerGroupMutation = { createCustomerGroup: { id: number } };

export type UpdateCustomerGroupMutationVariables = Exact<{
  updateCustomerGroupDto: UpdateCustomerGroupDto;
}>;


export type UpdateCustomerGroupMutation = { updateCustomerGroup: { id: number } };

export type DeleteCustomerGroupMutationVariables = Exact<{
  customerGroupId: Scalars['Float']['input'];
}>;


export type DeleteCustomerGroupMutation = { deleteCustomerGroup: string };

export type CreateCustomerGradeMutationVariables = Exact<{
  createCustomerGradeDto: CreateCustomerGradeDto;
}>;


export type CreateCustomerGradeMutation = { createCustomerGrade: { id: number } };

export type UpdateCustomerGradeMutationVariables = Exact<{
  updateCustomerGradeDto: UpdateCustomerGradeDto;
}>;


export type UpdateCustomerGradeMutation = { updateCustomerGrade: { id: number } };

export type DeleteCustomerGradeMutationVariables = Exact<{
  customerGradeId: Scalars['Float']['input'];
}>;


export type DeleteCustomerGradeMutation = { deleteCustomerGrade: string };

export type CreateNoticeMutationVariables = Exact<{
  createNoticeDto: CreateNoticeDto;
}>;


export type CreateNoticeMutation = { createNotice: { id: number } };

export type UpdateNoticeMutationVariables = Exact<{
  updateNoticeDto: UpdateNoticeDto;
}>;


export type UpdateNoticeMutation = { updateNotice: { id: number } };

export type DeleteNoticeMutationVariables = Exact<{
  noticeId: Scalars['Float']['input'];
}>;


export type DeleteNoticeMutation = { deleteNotice: boolean };

export type ReadNotificationMutationVariables = Exact<{
  notificationId: Scalars['Float']['input'];
}>;


export type ReadNotificationMutation = { readNotification: { id: number } };

export type DeleteNotificationMutationVariables = Exact<{
  notificationId: Scalars['Float']['input'];
}>;


export type DeleteNotificationMutation = { deleteNotification: boolean };

export type ReadAllNotificationMutationVariables = Exact<{ [key: string]: never; }>;


export type ReadAllNotificationMutation = { readAllNotification: boolean };

export type DeleteAllNotificationMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAllNotificationMutation = { deleteAllNotification: boolean };

export type CreatePayStubMutationVariables = Exact<{
  createPayStubDto: CreatePayStubDto;
}>;


export type CreatePayStubMutation = { createPayStub: boolean };

export type CreateTeamMutationVariables = Exact<{
  createTeamDto: CreateTeamDto;
}>;


export type CreateTeamMutation = { createTeam: { id: number } };

export type UpdateTeamMutationVariables = Exact<{
  updateTeamDto: UpdateTeamDto;
}>;


export type UpdateTeamMutation = { updateTeam: { id: number } };

export type DeleteTeamMutationVariables = Exact<{
  teamId: Scalars['Float']['input'];
}>;


export type DeleteTeamMutation = { deleteTeam: boolean };

export type CreateUserMutationVariables = Exact<{
  createUserDto: CreateUserDto;
}>;


export type CreateUserMutation = { createUser: { id: number } };

export type UpdateUserMutationVariables = Exact<{
  updateUserDto: UpdateUserDto;
}>;


export type UpdateUserMutation = { updateUser: { id: number } };

export type UpdatePasswordMutationVariables = Exact<{
  updatePasswordDto: UpdatePasswordDto;
}>;


export type UpdatePasswordMutation = { updatePassword: boolean };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['Float']['input'];
  targetUserId?: InputMaybe<Scalars['Float']['input']>;
}>;


export type DeleteUserMutation = { deleteUser: boolean };

export type GetAdjustmentsQueryVariables = Exact<{
  getAdjustmentsDto: GetAdjustmentsDto;
}>;


export type GetAdjustmentsQuery = { getAdjustments: Array<{ year: string, month: string, totalCountContract: number, totalFeeContract: number, totalExpenditureContract: number, totalNetIncomeContract: number, totalIncentiveContract: number, totalCountDelivery: number, totalFeeDelivery: number, totalExpenditureDelivery: number, totalNetIncomeDelivery: number, totalIncentiveDelivery: number, etcIncentive: number, user: { id: number, name: string, position: { id: number, name: PositionType } }, additionalIncentive?: { id: number, additionalIncentive: number } | null, bonus?: { id: number, bonus: number } | null }> };

export type MakeExcelQueryVariables = Exact<{
  year: Scalars['String']['input'];
  month: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type MakeExcelQuery = { makeExcel: boolean };

export type GetAgencyContractsQueryVariables = Exact<{
  getAgencyContractsDto: GetAgencyContractsDto;
}>;


export type GetAgencyContractsQuery = { getAgencyContracts: Array<{ id: number, status: Status, contractAt?: string | null, shippingDate?: string | null, carOption?: string | null, innerColor?: string | null, outerColor?: string | null, carPrice?: number | null, feeRate?: number | null, fee?: number | null, promotion?: number | null, monthlyPayment?: number | null, isOrdering?: string | null, isVATSupport?: boolean | null, branch?: string | null, branchFee?: number | null, collateralRate?: number | null, contractPeriod?: number | null, agreedMileage?: number | null, insuranceAge?: number | null, object?: number | null, service1?: number | null, serviceBody1?: string | null, service2?: number | null, serviceBody2?: string | null, service3?: number | null, serviceBody3?: string | null, incomeEarner?: string | null, cashAssistance?: number | null, supportDetails?: string | null, businessExpenses?: number | null, businessExpensesDetail?: string | null, totalExpenditure?: number | null, totalFee?: number | null, netIncome?: number | null, company_name_nominee?: string | null, advancePayment?: number | null, hasContractConfirmationLetter?: boolean | null, hasRegistrationCertificate?: boolean | null, note?: string | null, agencyPaymentDate?: string | null, user: { id: number, name: string }, city?: { id: number, name: string } | null, customer: { id: number, name: string, phone: string, customerStatus?: { id: number, status: string } | null }, car?: { id: number, name: string, brand: { id: number, name: string } } | null, financialCompany?: { id: number, name: string } | null, shippingMethod?: { id: number, name: string } | null, division?: { id: number, name: string } | null }> };

export type GetBrandsQueryVariables = Exact<{
  getBrandsDto: GetBrandsDto;
}>;


export type GetBrandsQuery = { getBrands: Array<{ id: number, name: string, isDomestic: boolean, brandFee?: number | null, created_at?: string | null, updated_at?: string | null, cars?: Array<{ id: number, name: string, carFee?: number | null }> | null }> };

export type GetBrandQueryVariables = Exact<{
  getBrandId: Scalars['Float']['input'];
}>;


export type GetBrandQuery = { getBrand: { id: number, name: string, isDomestic: boolean, brandFee?: number | null, created_at?: string | null, updated_at?: string | null, cars?: Array<{ id: number, name: string, carFee?: number | null }> | null } };

export type GetCarsQueryVariables = Exact<{
  getCarsDto: GetCarsDto;
}>;


export type GetCarsQuery = { getCars: Array<{ id: number, name: string, carFee?: number | null, created_at?: string | null, updated_at?: string | null, brand: { id: number, name: string, isDomestic: boolean, brandFee?: number | null } }> };

export type GetCarQueryVariables = Exact<{
  getCarId: Scalars['Float']['input'];
}>;


export type GetCarQuery = { getCar: { id: number, name: string, carFee?: number | null, created_at?: string | null, updated_at?: string | null, brand: { id: number, name: string, isDomestic: boolean, brandFee?: number | null } } };

export type GetCitiesQueryVariables = Exact<{
  getCitiesDto: GetCitiesDto;
}>;


export type GetCitiesQuery = { getCities: Array<{ id: number, name: string }> };

export type GetCityQueryVariables = Exact<{
  cityId: Scalars['Float']['input'];
}>;


export type GetCityQuery = { getCity: { id: number, name: string } };

export type GetContractsQueryVariables = Exact<{
  getContractsDto: GetContractsDto;
}>;


export type GetContractsQuery = { getContracts: Array<{ id: number, status: Status, contractAt?: string | null, shippingDate?: string | null, carOption?: string | null, innerColor?: string | null, outerColor?: string | null, carPrice?: number | null, feeRate?: number | null, fee?: number | null, promotion?: number | null, monthlyPayment?: number | null, isOrdering?: string | null, isVATSupport?: boolean | null, branch?: string | null, branchFee?: number | null, collateralRate?: number | null, contractPeriod?: number | null, agreedMileage?: number | null, insuranceAge?: number | null, object?: number | null, service1?: number | null, serviceBody1?: string | null, service2?: number | null, serviceBody2?: string | null, service3?: number | null, serviceBody3?: string | null, incomeEarner?: string | null, cashAssistance?: number | null, supportDetails?: string | null, businessExpenses?: number | null, businessExpensesDetail?: string | null, totalExpenditure?: number | null, totalFee?: number | null, netIncome?: number | null, company_name_nominee?: string | null, advancePayment?: number | null, hasContractConfirmationLetter?: boolean | null, hasRegistrationCertificate?: boolean | null, note?: string | null, agencyPaymentDate?: string | null, user: { id: number, name: string }, city?: { id: number, name: string } | null, customer: { id: number, name: string, phone: string, customerStatus?: { id: number, status: string } | null }, car?: { id: number, name: string, brand: { id: number, name: string } } | null, financialCompany?: { id: number, name: string } | null, shippingMethod?: { id: number, name: string } | null, division?: { id: number, name: string } | null }> };

export type GetContractQueryVariables = Exact<{
  contractId: Scalars['Float']['input'];
}>;


export type GetContractQuery = { getContract: { id: number, status: Status, contractAt?: string | null, shippingDate?: string | null, carOption?: string | null, innerColor?: string | null, outerColor?: string | null, carPrice?: number | null, feeRate?: number | null, fee?: number | null, promotion?: number | null, monthlyPayment?: number | null, isOrdering?: string | null, isVATSupport?: boolean | null, branch?: string | null, branchFee?: number | null, collateralRate?: number | null, contractPeriod?: number | null, agreedMileage?: number | null, insuranceAge?: number | null, object?: number | null, service1?: number | null, serviceBody1?: string | null, service2?: number | null, serviceBody2?: string | null, service3?: number | null, serviceBody3?: string | null, incomeEarner?: string | null, cashAssistance?: number | null, supportDetails?: string | null, businessExpenses?: number | null, businessExpensesDetail?: string | null, totalExpenditure?: number | null, totalFee?: number | null, netIncome?: number | null, company_name_nominee?: string | null, advancePayment?: number | null, hasContractConfirmationLetter?: boolean | null, hasRegistrationCertificate?: boolean | null, note?: string | null, agencyPaymentDate?: string | null, user: { id: number, name: string }, city?: { id: number, name: string } | null, customer: { id: number, name: string, phone: string }, car?: { id: number, name: string, carFee?: number | null, brand: { id: number, name: string, brandFee?: number | null } } | null, financialCompany?: { id: number, name: string } | null, shippingMethod?: { id: number, name: string } | null, division?: { id: number, name: string } | null } };

export type GetFinancialCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFinancialCompaniesQuery = { getFinancialCompanies: Array<{ id: number, name: string }> };

export type GetDivisionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDivisionsQuery = { getDivisions: Array<{ id: number, name: string }> };

export type GetShippingMethodsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShippingMethodsQuery = { getShippingMethods: Array<{ id: number, name: string }> };

export type GetCounselsQueryVariables = Exact<{
  getCounselsDto: GetCounselsDto;
}>;


export type GetCounselsQuery = { getCounsels: Array<{ id: number, status?: Status | null, counselAt: string, context: string, customer: { id: number, name: string, phone: string, customerGroup?: { id: number, name: string } | null, customerGrade?: { id: number, name: string } | null, customerStatus?: { id: number, status: string } | null }, contract?: { id: number, car?: { id: number, name: string, brand: { id: number, name: string } } | null, division?: { id: number, name: string } | null } | null, user: { id: number, name: string } }> };

export type GetCounselQueryVariables = Exact<{
  counselId: Scalars['Float']['input'];
}>;


export type GetCounselQuery = { getCounsel: { id: number, status?: Status | null, counselAt: string, context: string, customer: { id: number, name: string, phone: string, customerGroup?: { id: number, name: string } | null, customerGrade?: { id: number, name: string } | null, customerStatus?: { id: number, status: string } | null }, contract?: { id: number, car?: { id: number, name: string, brand: { id: number, name: string } } | null, division?: { id: number, name: string } | null } | null, user: { id: number, name: string } } };

export type GetCustomersQueryVariables = Exact<{
  getCustomersDto: GetCustomersDto;
}>;


export type GetCustomersQuery = { getCustomers: Array<{ id: number, created_at?: string | null, name: string, phone: string, memo?: string | null, note?: string | null, type?: string | null, company_name_nominee?: string | null, origin?: string | null, carName?: string | null, carOption?: string | null, contractPeriod?: number | null, agreedMileage?: number | null, advancePayment?: number | null, customerDivision?: { id: number, name: string } | null, contractList: Array<{ car?: { id: number, name: string, brand: { id: number, name: string } } | null, division?: { name: string } | null }>, counselList: Array<{ counselAt: string }>, customerGrade?: { name: string } | null, userList: { name: string }, customerStatus?: { status: string } | null }> };

export type GetCustomerQueryVariables = Exact<{
  customerId: Scalars['Float']['input'];
}>;


export type GetCustomerQuery = { getCustomer: { id: number, name: string, phone: string, sub_phone?: string | null, type?: string | null, created_at?: string | null, memo?: string | null, note?: string | null, company_name_nominee?: string | null, origin?: string | null, carName?: string | null, carOption?: string | null, contractPeriod?: number | null, agreedMileage?: number | null, advancePayment?: number | null, customerDivision?: { id: number, name: string } | null, userList: { id: number, name: string }, customerGroup?: { id: number, name: string } | null, customerStatus?: { id: number, status: string } | null, contractList: Array<{ id: number, company_name_nominee?: string | null, advancePayment?: number | null, carOption?: string | null, contractPeriod?: number | null, agreedMileage?: number | null, shippingMethod?: { id: number, name: string } | null, division?: { name: string } | null, car?: { id: number, name: string, brand: { id: number, name: string } } | null }>, customerGrade?: { id: number, name: string } | null, counselList: Array<{ id: number, counselAt: string, context: string, customer: { name: string }, user: { name: string } }> } };

export type GetCustomerGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerGroupsQuery = { getCustomerGroups: Array<{ id: number, name: string, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null }> };

export type GetCustomerGroupQueryVariables = Exact<{
  customerGroupId: Scalars['Float']['input'];
}>;


export type GetCustomerGroupQuery = { getCustomerGroup: { id: number, name: string, updated_at?: string | null, deleted_at?: string | null, created_at?: string | null } };

export type GetCustomerGradesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerGradesQuery = { getCustomerGrades: Array<{ id: number, name: string, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null }> };

export type GetCustomerGradeQueryVariables = Exact<{
  customerGradeId: Scalars['Float']['input'];
}>;


export type GetCustomerGradeQuery = { getCustomerGrade: { id: number, name: string, updated_at?: string | null, deleted_at?: string | null, created_at?: string | null } };

export type GetCustomerStatusesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerStatusesQuery = { getCustomerStatuses: Array<{ id: number, status: string }> };

export type GetDeliveriesQueryVariables = Exact<{
  getDeliveriesDto: GetDeliveriesDto;
}>;


export type GetDeliveriesQuery = { getDeliveries: Array<{ id: number, contractAt?: string | null, shippingDate?: string | null, carPrice?: number | null, fee?: number | null, promotion?: number | null, customer: { id: number, name: string }, user: { id: number, name: string }, financialCompany?: { id: number, name: string } | null, division?: { id: number, name: string } | null, car?: { id: number, name: string, brand: { id: number, name: string } } | null, shippingMethod?: { id: number, name: string } | null }> };

export type GetNoticesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNoticesQuery = { getNotices: Array<{ id: number, title: string, body: string, created_at?: string | null, deleted_at?: string | null, updated_at?: string | null, author: { id: number, name: string } }> };

export type GetNoticeQueryVariables = Exact<{
  noticeId: Scalars['Float']['input'];
}>;


export type GetNoticeQuery = { getNotice: { id: number, title: string, body: string, created_at?: string | null, deleted_at?: string | null, updated_at?: string | null, author: { id: number, name: string } } };

export type GetLatestNoticeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLatestNoticeQuery = { getLatestNotice: { id: number, title: string, body: string, created_at?: string | null, updated_at?: string | null, author: { id: number, name: string } } };

export type GetNotificationsQueryVariables = Exact<{
  offset: Scalars['Float']['input'];
  limit: Scalars['Float']['input'];
}>;


export type GetNotificationsQuery = { getNotifications: { count: number, isNewNotificationCount: number, notifications: Array<{ id: number, title: string, content: string, isRead: boolean, type: NotificationType, created_at?: string | null }> } };

export type CheckNewNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckNewNotificationsQuery = { checkNewNotifications: boolean };

export type GetPayStubsQueryVariables = Exact<{
  getPayStubDto: GetPayStubDto;
}>;


export type GetPayStubsQuery = { getPayStubs: Array<{ id: number, year: string, month: string, day?: string | null, totalFeeDelivery: number, totalExpenditureDelivery: number, totalNetIncomeDelivery: number, totalAllowance?: number | null, etcIncentive?: number | null, incomeTax: number, actualSalary: number, user: { id: number, name: string, team?: { id: number, name: string } | null, position: { id: number, name: PositionType } }, contracts: Array<{ id: number, shippingDate?: string | null, carPrice?: number | null, fee?: number | null, promotion?: number | null, cashAssistance?: number | null, businessExpenses?: number | null, service1?: number | null, service2?: number | null, service3?: number | null, serviceBody1?: string | null, serviceBody2?: string | null, serviceBody3?: string | null, netIncome?: number | null, totalFee?: number | null, customer: { id: number, name: string }, car?: { id: number, name: string, brand: { id: number, name: string } } | null }> }> };

export type GetPayStubQueryVariables = Exact<{
  payStubId: Scalars['Float']['input'];
}>;


export type GetPayStubQuery = { getPayStub: { id: number, year: string, month: string, day?: string | null, totalFeeDelivery: number, totalExpenditureDelivery: number, totalNetIncomeDelivery: number, totalAllowance?: number | null, etcIncentive?: number | null, incomeTax: number, actualSalary: number, user: { id: number, name: string, team?: { id: number, name: string } | null, position: { id: number, name: PositionType } }, contracts: Array<{ id: number, shippingDate?: string | null, carPrice?: number | null, fee?: number | null, promotion?: number | null, cashAssistance?: number | null, businessExpenses?: number | null, service1?: number | null, service2?: number | null, service3?: number | null, serviceBody1?: string | null, serviceBody2?: string | null, serviceBody3?: string | null, netIncome?: number | null, totalFee?: number | null, customer: { id: number, name: string }, car?: { id: number, name: string, brand: { id: number, name: string } } | null }> } };

export type CheckSettleContractQueryVariables = Exact<{
  checkSettleContractDto: CheckSettleContractDto;
}>;


export type CheckSettleContractQuery = { checkSettleContract: boolean };

export type GetUserIncentiveDeliveryTaxesQueryVariables = Exact<{
  getUserIncentiveDeliveryTaxesDto: GetUserIncentiveDeliveryTaxesDto;
}>;


export type GetUserIncentiveDeliveryTaxesQuery = { getUserIncentiveDeliveryTaxes: Array<{ year: string, month: string, totalIncentiveDelivery: number, etcIncentive: number, totalBusinessExpenses: number, additionalIncentive?: { id: number, additionalIncentive: number } | null, bonus?: { id: number, bonus: number } | null, user: { id: number, name: string } }> };

export type GetCustomerTaxesQueryVariables = Exact<{
  getCustomerTaxesDto: GetCustomerTaxesDto;
}>;


export type GetCustomerTaxesQuery = { getCustomerTaxes: Array<{ cashAssistance?: number | null, id: number, incomeEarner?: string | null, user: { id: number, name: string } }> };

export type TeamFieldsFragment = { id: number, name: string, depth?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, leader?: { id: number, name: string } | null, userList: Array<{ id: number, name: string, position: { id: number, name: PositionType } }> };

export type TeamWithSubTeamsFragment = { id: number, name: string, depth?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, subTeams?: Array<{ id: number, name: string, depth?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, subTeams?: Array<{ id: number, name: string, depth?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, subTeams?: Array<{ id: number, name: string, depth?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, leader?: { id: number, name: string } | null, userList: Array<{ id: number, name: string, position: { id: number, name: PositionType } }> }> | null, leader?: { id: number, name: string } | null, userList: Array<{ id: number, name: string, position: { id: number, name: PositionType } }> }> | null, leader?: { id: number, name: string } | null, userList: Array<{ id: number, name: string, position: { id: number, name: PositionType } }> }> | null, leader?: { id: number, name: string } | null, userList: Array<{ id: number, name: string, position: { id: number, name: PositionType } }> };

export type GetTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsQuery = { getTeams: Array<{ id: number, name: string, depth?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, parentTeam?: { id: number, name: string, depth?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, leader?: { id: number, name: string } | null, userList: Array<{ id: number, name: string, position: { id: number, name: PositionType } }> } | null, subTeams?: Array<{ id: number, name: string, depth?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, subTeams?: Array<{ id: number, name: string, depth?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, subTeams?: Array<{ id: number, name: string, depth?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, leader?: { id: number, name: string } | null, userList: Array<{ id: number, name: string, position: { id: number, name: PositionType } }> }> | null, leader?: { id: number, name: string } | null, userList: Array<{ id: number, name: string, position: { id: number, name: PositionType } }> }> | null, leader?: { id: number, name: string } | null, userList: Array<{ id: number, name: string, position: { id: number, name: PositionType } }> }> | null, leader?: { id: number, name: string } | null, userList: Array<{ id: number, name: string, position: { id: number, name: PositionType } }> }> };

export type GetTeamQueryVariables = Exact<{
  teamId: Scalars['Float']['input'];
}>;


export type GetTeamQuery = { getTeam: { id: number, name: string, depth?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, parentTeam?: { id: number, name: string, depth?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, leader?: { id: number, name: string } | null, userList: Array<{ id: number, name: string, position: { id: number, name: PositionType } }> } | null, subTeams?: Array<{ id: number, name: string, depth?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, subTeams?: Array<{ id: number, name: string, depth?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, subTeams?: Array<{ id: number, name: string, depth?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, leader?: { id: number, name: string } | null, userList: Array<{ id: number, name: string, position: { id: number, name: PositionType } }> }> | null, leader?: { id: number, name: string } | null, userList: Array<{ id: number, name: string, position: { id: number, name: PositionType } }> }> | null, leader?: { id: number, name: string } | null, userList: Array<{ id: number, name: string, position: { id: number, name: PositionType } }> }> | null, leader?: { id: number, name: string } | null, userList: Array<{ id: number, name: string, position: { id: number, name: PositionType } }> } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { getUsers: Array<{ id: number, name: string, email: string, password: string, hireDate?: string | null, birthDate?: string | null, phone?: string | null, salesPhone?: string | null, fax?: string | null, englishName?: string | null, salaryAccount?: string | null, bank?: string | null, created_at?: string | null, updated_at?: string | null, position: { id: number, name: PositionType }, role: { id: number, name: PermissionType }, customers?: Array<{ id: number, name: string }> | null }> };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetUserQuery = { getUser: { id: number, name: string, email: string, password: string, hireDate?: string | null, birthDate?: string | null, phone?: string | null, salesPhone?: string | null, fax?: string | null, englishName?: string | null, salaryAccount?: string | null, bank?: string | null, created_at?: string | null, updated_at?: string | null, position: { id: number, name: PositionType }, role: { id: number, name: PermissionType }, team?: { id: number, name: string } | null, customers?: Array<{ id: number, name: string }> | null } };

export type GetPositionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPositionsQuery = { getPositions: Array<{ id: number, name: PositionType, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null }> };

export type GetTopFiveDeliveryUsersByMonthQueryVariables = Exact<{
  getTopFiveDeliveryUsersByMonthDto: GetDashBoardByUsersDto;
}>;


export type GetTopFiveDeliveryUsersByMonthQuery = { getTopFiveDeliveryUsersByMonth: Array<{ year: string, month: string, totalCountDelivery?: number | null, totalFeeDelivery?: number | null, user: { id: number, name: string } }> };

export type GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables = Exact<{
  getTopFiveTotalFeeDeliveryUsersByMonthDto: GetDashBoardByUsersDto;
}>;


export type GetTopFiveTotalFeeDeliveryUsersByMonthQuery = { getTopFiveTotalFeeDeliveryUsersByMonth: Array<{ year: string, month: string, totalFeeDelivery?: number | null, totalCountDelivery?: number | null, user: { id: number, name: string } }> };

export const TeamFieldsFragmentDoc = gql`
    fragment TeamFields on Team {
  id
  name
  depth
  leader {
    id
    name
  }
  userList {
    id
    name
    position {
      id
      name
    }
  }
  created_at
  updated_at
  deleted_at
}
    `;
export const TeamWithSubTeamsFragmentDoc = gql`
    fragment TeamWithSubTeams on Team {
  ...TeamFields
  subTeams {
    ...TeamFields
    subTeams {
      ...TeamFields
      subTeams {
        ...TeamFields
      }
    }
  }
}
    ${TeamFieldsFragmentDoc}`;
export const CreateAdditionalIncentiveDocument = gql`
    mutation CreateAdditionalIncentive($createAdditionalIncentiveDto: CreateAdditionalIncentiveDto!) {
  createAdditionalIncentive(
    createAdditionalIncentiveDto: $createAdditionalIncentiveDto
  ) {
    id
  }
}
    `;
export type CreateAdditionalIncentiveMutationFn = Apollo.MutationFunction<CreateAdditionalIncentiveMutation, CreateAdditionalIncentiveMutationVariables>;

/**
 * __useCreateAdditionalIncentiveMutation__
 *
 * To run a mutation, you first call `useCreateAdditionalIncentiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdditionalIncentiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdditionalIncentiveMutation, { data, loading, error }] = useCreateAdditionalIncentiveMutation({
 *   variables: {
 *      createAdditionalIncentiveDto: // value for 'createAdditionalIncentiveDto'
 *   },
 * });
 */
export function useCreateAdditionalIncentiveMutation(baseOptions?: Apollo.MutationHookOptions<CreateAdditionalIncentiveMutation, CreateAdditionalIncentiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAdditionalIncentiveMutation, CreateAdditionalIncentiveMutationVariables>(CreateAdditionalIncentiveDocument, options);
      }
export type CreateAdditionalIncentiveMutationHookResult = ReturnType<typeof useCreateAdditionalIncentiveMutation>;
export type CreateAdditionalIncentiveMutationResult = Apollo.MutationResult<CreateAdditionalIncentiveMutation>;
export type CreateAdditionalIncentiveMutationOptions = Apollo.BaseMutationOptions<CreateAdditionalIncentiveMutation, CreateAdditionalIncentiveMutationVariables>;
export const UpdateAdditionalIncentiveDocument = gql`
    mutation UpdateAdditionalIncentive($updateAdditionalIncentiveDto: UpdateAdditionalIncentiveDto!) {
  updateAdditionalIncentive(
    updateAdditionalIncentiveDto: $updateAdditionalIncentiveDto
  ) {
    id
  }
}
    `;
export type UpdateAdditionalIncentiveMutationFn = Apollo.MutationFunction<UpdateAdditionalIncentiveMutation, UpdateAdditionalIncentiveMutationVariables>;

/**
 * __useUpdateAdditionalIncentiveMutation__
 *
 * To run a mutation, you first call `useUpdateAdditionalIncentiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdditionalIncentiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdditionalIncentiveMutation, { data, loading, error }] = useUpdateAdditionalIncentiveMutation({
 *   variables: {
 *      updateAdditionalIncentiveDto: // value for 'updateAdditionalIncentiveDto'
 *   },
 * });
 */
export function useUpdateAdditionalIncentiveMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAdditionalIncentiveMutation, UpdateAdditionalIncentiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAdditionalIncentiveMutation, UpdateAdditionalIncentiveMutationVariables>(UpdateAdditionalIncentiveDocument, options);
      }
export type UpdateAdditionalIncentiveMutationHookResult = ReturnType<typeof useUpdateAdditionalIncentiveMutation>;
export type UpdateAdditionalIncentiveMutationResult = Apollo.MutationResult<UpdateAdditionalIncentiveMutation>;
export type UpdateAdditionalIncentiveMutationOptions = Apollo.BaseMutationOptions<UpdateAdditionalIncentiveMutation, UpdateAdditionalIncentiveMutationVariables>;
export const DeleteAdditionalIncentiveDocument = gql`
    mutation DeleteAdditionalIncentive($additionalIncentiveId: Float!) {
  deleteAdditionalIncentive(additionalIncentiveId: $additionalIncentiveId)
}
    `;
export type DeleteAdditionalIncentiveMutationFn = Apollo.MutationFunction<DeleteAdditionalIncentiveMutation, DeleteAdditionalIncentiveMutationVariables>;

/**
 * __useDeleteAdditionalIncentiveMutation__
 *
 * To run a mutation, you first call `useDeleteAdditionalIncentiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdditionalIncentiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdditionalIncentiveMutation, { data, loading, error }] = useDeleteAdditionalIncentiveMutation({
 *   variables: {
 *      additionalIncentiveId: // value for 'additionalIncentiveId'
 *   },
 * });
 */
export function useDeleteAdditionalIncentiveMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAdditionalIncentiveMutation, DeleteAdditionalIncentiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAdditionalIncentiveMutation, DeleteAdditionalIncentiveMutationVariables>(DeleteAdditionalIncentiveDocument, options);
      }
export type DeleteAdditionalIncentiveMutationHookResult = ReturnType<typeof useDeleteAdditionalIncentiveMutation>;
export type DeleteAdditionalIncentiveMutationResult = Apollo.MutationResult<DeleteAdditionalIncentiveMutation>;
export type DeleteAdditionalIncentiveMutationOptions = Apollo.BaseMutationOptions<DeleteAdditionalIncentiveMutation, DeleteAdditionalIncentiveMutationVariables>;
export const CreateBonusDocument = gql`
    mutation CreateBonus($createBonusDto: CreateBonusDto!) {
  createBonus(createBonusDto: $createBonusDto) {
    id
  }
}
    `;
export type CreateBonusMutationFn = Apollo.MutationFunction<CreateBonusMutation, CreateBonusMutationVariables>;

/**
 * __useCreateBonusMutation__
 *
 * To run a mutation, you first call `useCreateBonusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBonusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBonusMutation, { data, loading, error }] = useCreateBonusMutation({
 *   variables: {
 *      createBonusDto: // value for 'createBonusDto'
 *   },
 * });
 */
export function useCreateBonusMutation(baseOptions?: Apollo.MutationHookOptions<CreateBonusMutation, CreateBonusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBonusMutation, CreateBonusMutationVariables>(CreateBonusDocument, options);
      }
export type CreateBonusMutationHookResult = ReturnType<typeof useCreateBonusMutation>;
export type CreateBonusMutationResult = Apollo.MutationResult<CreateBonusMutation>;
export type CreateBonusMutationOptions = Apollo.BaseMutationOptions<CreateBonusMutation, CreateBonusMutationVariables>;
export const UpdateBonusDocument = gql`
    mutation UpdateBonus($updateBonusDto: UpdateBonusDto!) {
  updateBonus(updateBonusDto: $updateBonusDto) {
    id
  }
}
    `;
export type UpdateBonusMutationFn = Apollo.MutationFunction<UpdateBonusMutation, UpdateBonusMutationVariables>;

/**
 * __useUpdateBonusMutation__
 *
 * To run a mutation, you first call `useUpdateBonusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBonusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBonusMutation, { data, loading, error }] = useUpdateBonusMutation({
 *   variables: {
 *      updateBonusDto: // value for 'updateBonusDto'
 *   },
 * });
 */
export function useUpdateBonusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBonusMutation, UpdateBonusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBonusMutation, UpdateBonusMutationVariables>(UpdateBonusDocument, options);
      }
export type UpdateBonusMutationHookResult = ReturnType<typeof useUpdateBonusMutation>;
export type UpdateBonusMutationResult = Apollo.MutationResult<UpdateBonusMutation>;
export type UpdateBonusMutationOptions = Apollo.BaseMutationOptions<UpdateBonusMutation, UpdateBonusMutationVariables>;
export const DeleteBonusDocument = gql`
    mutation DeleteBonus($bonusId: Float!) {
  deleteBonus(bonusId: $bonusId)
}
    `;
export type DeleteBonusMutationFn = Apollo.MutationFunction<DeleteBonusMutation, DeleteBonusMutationVariables>;

/**
 * __useDeleteBonusMutation__
 *
 * To run a mutation, you first call `useDeleteBonusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBonusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBonusMutation, { data, loading, error }] = useDeleteBonusMutation({
 *   variables: {
 *      bonusId: // value for 'bonusId'
 *   },
 * });
 */
export function useDeleteBonusMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBonusMutation, DeleteBonusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBonusMutation, DeleteBonusMutationVariables>(DeleteBonusDocument, options);
      }
export type DeleteBonusMutationHookResult = ReturnType<typeof useDeleteBonusMutation>;
export type DeleteBonusMutationResult = Apollo.MutationResult<DeleteBonusMutation>;
export type DeleteBonusMutationOptions = Apollo.BaseMutationOptions<DeleteBonusMutation, DeleteBonusMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($signInDto: SignInDto!) {
  signIn(signInDto: $signInDto) {
    accessToken
    refreshToken
    user {
      name
      id
      position {
        id
        name
      }
      role {
        id
        name
      }
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      signInDto: // value for 'signInDto'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($signUpDto: SignUpDto!) {
  signUp(signUpDto: $signUpDto) {
    created_at
    deleted_at
    email
    id
    name
    password
    updated_at
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      signUpDto: // value for 'signUpDto'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const MutationDocument = gql`
    mutation Mutation {
  signOut
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
export const RefreshDocument = gql`
    mutation Refresh($refreshToken: String!) {
  refresh(refreshToken: $refreshToken) {
    accessToken
    refreshToken
    user {
      id
      name
      position {
        id
        name
      }
      role {
        id
        name
      }
    }
  }
}
    `;
export type RefreshMutationFn = Apollo.MutationFunction<RefreshMutation, RefreshMutationVariables>;

/**
 * __useRefreshMutation__
 *
 * To run a mutation, you first call `useRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshMutation, { data, loading, error }] = useRefreshMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshMutation(baseOptions?: Apollo.MutationHookOptions<RefreshMutation, RefreshMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument, options);
      }
export type RefreshMutationHookResult = ReturnType<typeof useRefreshMutation>;
export type RefreshMutationResult = Apollo.MutationResult<RefreshMutation>;
export type RefreshMutationOptions = Apollo.BaseMutationOptions<RefreshMutation, RefreshMutationVariables>;
export const UpdateMyInfoDocument = gql`
    mutation UpdateMyInfo($updateUserMyInfoDto: UpdateUserMyInfoDto!) {
  updateMyInfo(updateUserMyInfoDto: $updateUserMyInfoDto) {
    user {
      name
      id
    }
  }
}
    `;
export type UpdateMyInfoMutationFn = Apollo.MutationFunction<UpdateMyInfoMutation, UpdateMyInfoMutationVariables>;

/**
 * __useUpdateMyInfoMutation__
 *
 * To run a mutation, you first call `useUpdateMyInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMyInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMyInfoMutation, { data, loading, error }] = useUpdateMyInfoMutation({
 *   variables: {
 *      updateUserMyInfoDto: // value for 'updateUserMyInfoDto'
 *   },
 * });
 */
export function useUpdateMyInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMyInfoMutation, UpdateMyInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMyInfoMutation, UpdateMyInfoMutationVariables>(UpdateMyInfoDocument, options);
      }
export type UpdateMyInfoMutationHookResult = ReturnType<typeof useUpdateMyInfoMutation>;
export type UpdateMyInfoMutationResult = Apollo.MutationResult<UpdateMyInfoMutation>;
export type UpdateMyInfoMutationOptions = Apollo.BaseMutationOptions<UpdateMyInfoMutation, UpdateMyInfoMutationVariables>;
export const CreateCityDocument = gql`
    mutation CreateCity($createCityDto: CreateCityDto!) {
  createCity(createCityDto: $createCityDto) {
    id
    name
  }
}
    `;
export type CreateCityMutationFn = Apollo.MutationFunction<CreateCityMutation, CreateCityMutationVariables>;

/**
 * __useCreateCityMutation__
 *
 * To run a mutation, you first call `useCreateCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCityMutation, { data, loading, error }] = useCreateCityMutation({
 *   variables: {
 *      createCityDto: // value for 'createCityDto'
 *   },
 * });
 */
export function useCreateCityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCityMutation, CreateCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCityMutation, CreateCityMutationVariables>(CreateCityDocument, options);
      }
export type CreateCityMutationHookResult = ReturnType<typeof useCreateCityMutation>;
export type CreateCityMutationResult = Apollo.MutationResult<CreateCityMutation>;
export type CreateCityMutationOptions = Apollo.BaseMutationOptions<CreateCityMutation, CreateCityMutationVariables>;
export const UpdateCityDocument = gql`
    mutation UpdateCity($updateCityDto: UpdateCityDto!) {
  updateCity(updateCityDto: $updateCityDto) {
    id
    name
  }
}
    `;
export type UpdateCityMutationFn = Apollo.MutationFunction<UpdateCityMutation, UpdateCityMutationVariables>;

/**
 * __useUpdateCityMutation__
 *
 * To run a mutation, you first call `useUpdateCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCityMutation, { data, loading, error }] = useUpdateCityMutation({
 *   variables: {
 *      updateCityDto: // value for 'updateCityDto'
 *   },
 * });
 */
export function useUpdateCityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCityMutation, UpdateCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCityMutation, UpdateCityMutationVariables>(UpdateCityDocument, options);
      }
export type UpdateCityMutationHookResult = ReturnType<typeof useUpdateCityMutation>;
export type UpdateCityMutationResult = Apollo.MutationResult<UpdateCityMutation>;
export type UpdateCityMutationOptions = Apollo.BaseMutationOptions<UpdateCityMutation, UpdateCityMutationVariables>;
export const DeleteCityDocument = gql`
    mutation DeleteCity($cityId: Float!) {
  deleteCity(cityId: $cityId)
}
    `;
export type DeleteCityMutationFn = Apollo.MutationFunction<DeleteCityMutation, DeleteCityMutationVariables>;

/**
 * __useDeleteCityMutation__
 *
 * To run a mutation, you first call `useDeleteCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCityMutation, { data, loading, error }] = useDeleteCityMutation({
 *   variables: {
 *      cityId: // value for 'cityId'
 *   },
 * });
 */
export function useDeleteCityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCityMutation, DeleteCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCityMutation, DeleteCityMutationVariables>(DeleteCityDocument, options);
      }
export type DeleteCityMutationHookResult = ReturnType<typeof useDeleteCityMutation>;
export type DeleteCityMutationResult = Apollo.MutationResult<DeleteCityMutation>;
export type DeleteCityMutationOptions = Apollo.BaseMutationOptions<DeleteCityMutation, DeleteCityMutationVariables>;
export const CreateBrandDocument = gql`
    mutation CreateBrand($createBrandDto: CreateBrandDto!) {
  createBrand(createBrandDto: $createBrandDto) {
    id
  }
}
    `;
export type CreateBrandMutationFn = Apollo.MutationFunction<CreateBrandMutation, CreateBrandMutationVariables>;

/**
 * __useCreateBrandMutation__
 *
 * To run a mutation, you first call `useCreateBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBrandMutation, { data, loading, error }] = useCreateBrandMutation({
 *   variables: {
 *      createBrandDto: // value for 'createBrandDto'
 *   },
 * });
 */
export function useCreateBrandMutation(baseOptions?: Apollo.MutationHookOptions<CreateBrandMutation, CreateBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBrandMutation, CreateBrandMutationVariables>(CreateBrandDocument, options);
      }
export type CreateBrandMutationHookResult = ReturnType<typeof useCreateBrandMutation>;
export type CreateBrandMutationResult = Apollo.MutationResult<CreateBrandMutation>;
export type CreateBrandMutationOptions = Apollo.BaseMutationOptions<CreateBrandMutation, CreateBrandMutationVariables>;
export const UpdateBrandDocument = gql`
    mutation UpdateBrand($updateBrandDto: UpdateBrandDto!) {
  updateBrand(updateBrandDto: $updateBrandDto) {
    id
    name
  }
}
    `;
export type UpdateBrandMutationFn = Apollo.MutationFunction<UpdateBrandMutation, UpdateBrandMutationVariables>;

/**
 * __useUpdateBrandMutation__
 *
 * To run a mutation, you first call `useUpdateBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBrandMutation, { data, loading, error }] = useUpdateBrandMutation({
 *   variables: {
 *      updateBrandDto: // value for 'updateBrandDto'
 *   },
 * });
 */
export function useUpdateBrandMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBrandMutation, UpdateBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBrandMutation, UpdateBrandMutationVariables>(UpdateBrandDocument, options);
      }
export type UpdateBrandMutationHookResult = ReturnType<typeof useUpdateBrandMutation>;
export type UpdateBrandMutationResult = Apollo.MutationResult<UpdateBrandMutation>;
export type UpdateBrandMutationOptions = Apollo.BaseMutationOptions<UpdateBrandMutation, UpdateBrandMutationVariables>;
export const DeleteBrandDocument = gql`
    mutation DeleteBrand($id: Float!) {
  deleteBrand(id: $id)
}
    `;
export type DeleteBrandMutationFn = Apollo.MutationFunction<DeleteBrandMutation, DeleteBrandMutationVariables>;

/**
 * __useDeleteBrandMutation__
 *
 * To run a mutation, you first call `useDeleteBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBrandMutation, { data, loading, error }] = useDeleteBrandMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBrandMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBrandMutation, DeleteBrandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBrandMutation, DeleteBrandMutationVariables>(DeleteBrandDocument, options);
      }
export type DeleteBrandMutationHookResult = ReturnType<typeof useDeleteBrandMutation>;
export type DeleteBrandMutationResult = Apollo.MutationResult<DeleteBrandMutation>;
export type DeleteBrandMutationOptions = Apollo.BaseMutationOptions<DeleteBrandMutation, DeleteBrandMutationVariables>;
export const CreateCarDocument = gql`
    mutation CreateCar($createCarDto: CreateCarDto!) {
  createCar(createCarDto: $createCarDto) {
    id
  }
}
    `;
export type CreateCarMutationFn = Apollo.MutationFunction<CreateCarMutation, CreateCarMutationVariables>;

/**
 * __useCreateCarMutation__
 *
 * To run a mutation, you first call `useCreateCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCarMutation, { data, loading, error }] = useCreateCarMutation({
 *   variables: {
 *      createCarDto: // value for 'createCarDto'
 *   },
 * });
 */
export function useCreateCarMutation(baseOptions?: Apollo.MutationHookOptions<CreateCarMutation, CreateCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCarMutation, CreateCarMutationVariables>(CreateCarDocument, options);
      }
export type CreateCarMutationHookResult = ReturnType<typeof useCreateCarMutation>;
export type CreateCarMutationResult = Apollo.MutationResult<CreateCarMutation>;
export type CreateCarMutationOptions = Apollo.BaseMutationOptions<CreateCarMutation, CreateCarMutationVariables>;
export const UpdateCarDocument = gql`
    mutation UpdateCar($updateCarDto: UpdateCarDto!) {
  updateCar(updateCarDto: $updateCarDto) {
    id
    name
  }
}
    `;
export type UpdateCarMutationFn = Apollo.MutationFunction<UpdateCarMutation, UpdateCarMutationVariables>;

/**
 * __useUpdateCarMutation__
 *
 * To run a mutation, you first call `useUpdateCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCarMutation, { data, loading, error }] = useUpdateCarMutation({
 *   variables: {
 *      updateCarDto: // value for 'updateCarDto'
 *   },
 * });
 */
export function useUpdateCarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCarMutation, UpdateCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCarMutation, UpdateCarMutationVariables>(UpdateCarDocument, options);
      }
export type UpdateCarMutationHookResult = ReturnType<typeof useUpdateCarMutation>;
export type UpdateCarMutationResult = Apollo.MutationResult<UpdateCarMutation>;
export type UpdateCarMutationOptions = Apollo.BaseMutationOptions<UpdateCarMutation, UpdateCarMutationVariables>;
export const DeleteCarDocument = gql`
    mutation DeleteCar($id: Float!) {
  deleteCar(id: $id)
}
    `;
export type DeleteCarMutationFn = Apollo.MutationFunction<DeleteCarMutation, DeleteCarMutationVariables>;

/**
 * __useDeleteCarMutation__
 *
 * To run a mutation, you first call `useDeleteCarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCarMutation, { data, loading, error }] = useDeleteCarMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCarMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCarMutation, DeleteCarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCarMutation, DeleteCarMutationVariables>(DeleteCarDocument, options);
      }
export type DeleteCarMutationHookResult = ReturnType<typeof useDeleteCarMutation>;
export type DeleteCarMutationResult = Apollo.MutationResult<DeleteCarMutation>;
export type DeleteCarMutationOptions = Apollo.BaseMutationOptions<DeleteCarMutation, DeleteCarMutationVariables>;
export const CreateContractDocument = gql`
    mutation CreateContract($createContractDto: CreateContractDto!) {
  createContract(createContractDto: $createContractDto) {
    id
  }
}
    `;
export type CreateContractMutationFn = Apollo.MutationFunction<CreateContractMutation, CreateContractMutationVariables>;

/**
 * __useCreateContractMutation__
 *
 * To run a mutation, you first call `useCreateContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContractMutation, { data, loading, error }] = useCreateContractMutation({
 *   variables: {
 *      createContractDto: // value for 'createContractDto'
 *   },
 * });
 */
export function useCreateContractMutation(baseOptions?: Apollo.MutationHookOptions<CreateContractMutation, CreateContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContractMutation, CreateContractMutationVariables>(CreateContractDocument, options);
      }
export type CreateContractMutationHookResult = ReturnType<typeof useCreateContractMutation>;
export type CreateContractMutationResult = Apollo.MutationResult<CreateContractMutation>;
export type CreateContractMutationOptions = Apollo.BaseMutationOptions<CreateContractMutation, CreateContractMutationVariables>;
export const UpdateContractDocument = gql`
    mutation UpdateContract($updateContractDto: UpdateContractDto!) {
  updateContract(updateContractDto: $updateContractDto) {
    id
  }
}
    `;
export type UpdateContractMutationFn = Apollo.MutationFunction<UpdateContractMutation, UpdateContractMutationVariables>;

/**
 * __useUpdateContractMutation__
 *
 * To run a mutation, you first call `useUpdateContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContractMutation, { data, loading, error }] = useUpdateContractMutation({
 *   variables: {
 *      updateContractDto: // value for 'updateContractDto'
 *   },
 * });
 */
export function useUpdateContractMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContractMutation, UpdateContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContractMutation, UpdateContractMutationVariables>(UpdateContractDocument, options);
      }
export type UpdateContractMutationHookResult = ReturnType<typeof useUpdateContractMutation>;
export type UpdateContractMutationResult = Apollo.MutationResult<UpdateContractMutation>;
export type UpdateContractMutationOptions = Apollo.BaseMutationOptions<UpdateContractMutation, UpdateContractMutationVariables>;
export const DeleteContractDocument = gql`
    mutation DeleteContract($contractIds: [Int!]!) {
  deleteContract(contractIds: $contractIds)
}
    `;
export type DeleteContractMutationFn = Apollo.MutationFunction<DeleteContractMutation, DeleteContractMutationVariables>;

/**
 * __useDeleteContractMutation__
 *
 * To run a mutation, you first call `useDeleteContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContractMutation, { data, loading, error }] = useDeleteContractMutation({
 *   variables: {
 *      contractIds: // value for 'contractIds'
 *   },
 * });
 */
export function useDeleteContractMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContractMutation, DeleteContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContractMutation, DeleteContractMutationVariables>(DeleteContractDocument, options);
      }
export type DeleteContractMutationHookResult = ReturnType<typeof useDeleteContractMutation>;
export type DeleteContractMutationResult = Apollo.MutationResult<DeleteContractMutation>;
export type DeleteContractMutationOptions = Apollo.BaseMutationOptions<DeleteContractMutation, DeleteContractMutationVariables>;
export const CreateCounselDocument = gql`
    mutation CreateCounsel($createCounselDto: CreateCounselDto!) {
  createCounsel(createCounselDto: $createCounselDto) {
    id
  }
}
    `;
export type CreateCounselMutationFn = Apollo.MutationFunction<CreateCounselMutation, CreateCounselMutationVariables>;

/**
 * __useCreateCounselMutation__
 *
 * To run a mutation, you first call `useCreateCounselMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCounselMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCounselMutation, { data, loading, error }] = useCreateCounselMutation({
 *   variables: {
 *      createCounselDto: // value for 'createCounselDto'
 *   },
 * });
 */
export function useCreateCounselMutation(baseOptions?: Apollo.MutationHookOptions<CreateCounselMutation, CreateCounselMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCounselMutation, CreateCounselMutationVariables>(CreateCounselDocument, options);
      }
export type CreateCounselMutationHookResult = ReturnType<typeof useCreateCounselMutation>;
export type CreateCounselMutationResult = Apollo.MutationResult<CreateCounselMutation>;
export type CreateCounselMutationOptions = Apollo.BaseMutationOptions<CreateCounselMutation, CreateCounselMutationVariables>;
export const UpdateCounselDocument = gql`
    mutation UpdateCounsel($updateCounselDto: UpdateCounselDto!) {
  updateCounsel(updateCounselDto: $updateCounselDto) {
    id
  }
}
    `;
export type UpdateCounselMutationFn = Apollo.MutationFunction<UpdateCounselMutation, UpdateCounselMutationVariables>;

/**
 * __useUpdateCounselMutation__
 *
 * To run a mutation, you first call `useUpdateCounselMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCounselMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCounselMutation, { data, loading, error }] = useUpdateCounselMutation({
 *   variables: {
 *      updateCounselDto: // value for 'updateCounselDto'
 *   },
 * });
 */
export function useUpdateCounselMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCounselMutation, UpdateCounselMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCounselMutation, UpdateCounselMutationVariables>(UpdateCounselDocument, options);
      }
export type UpdateCounselMutationHookResult = ReturnType<typeof useUpdateCounselMutation>;
export type UpdateCounselMutationResult = Apollo.MutationResult<UpdateCounselMutation>;
export type UpdateCounselMutationOptions = Apollo.BaseMutationOptions<UpdateCounselMutation, UpdateCounselMutationVariables>;
export const DeleteCounselDocument = gql`
    mutation DeleteCounsel($counselIds: [Int!]!) {
  deleteCounsel(counselIds: $counselIds)
}
    `;
export type DeleteCounselMutationFn = Apollo.MutationFunction<DeleteCounselMutation, DeleteCounselMutationVariables>;

/**
 * __useDeleteCounselMutation__
 *
 * To run a mutation, you first call `useDeleteCounselMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCounselMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCounselMutation, { data, loading, error }] = useDeleteCounselMutation({
 *   variables: {
 *      counselIds: // value for 'counselIds'
 *   },
 * });
 */
export function useDeleteCounselMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCounselMutation, DeleteCounselMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCounselMutation, DeleteCounselMutationVariables>(DeleteCounselDocument, options);
      }
export type DeleteCounselMutationHookResult = ReturnType<typeof useDeleteCounselMutation>;
export type DeleteCounselMutationResult = Apollo.MutationResult<DeleteCounselMutation>;
export type DeleteCounselMutationOptions = Apollo.BaseMutationOptions<DeleteCounselMutation, DeleteCounselMutationVariables>;
export const CreateCustomerDocument = gql`
    mutation CreateCustomer($createCustomerDto: CreateCustomerDto!) {
  createCustomer(createCustomerDto: $createCustomerDto) {
    id
  }
}
    `;
export type CreateCustomerMutationFn = Apollo.MutationFunction<CreateCustomerMutation, CreateCustomerMutationVariables>;

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      createCustomerDto: // value for 'createCustomerDto'
 *   },
 * });
 */
export function useCreateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerMutation, CreateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument, options);
      }
export type CreateCustomerMutationHookResult = ReturnType<typeof useCreateCustomerMutation>;
export type CreateCustomerMutationResult = Apollo.MutationResult<CreateCustomerMutation>;
export type CreateCustomerMutationOptions = Apollo.BaseMutationOptions<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const UpdateCustomerDocument = gql`
    mutation UpdateCustomer($updateCustomerDto: UpdateCustomerDto!) {
  updateCustomer(updateCustomerDto: $updateCustomerDto) {
    id
  }
}
    `;
export type UpdateCustomerMutationFn = Apollo.MutationFunction<UpdateCustomerMutation, UpdateCustomerMutationVariables>;

/**
 * __useUpdateCustomerMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerMutation, { data, loading, error }] = useUpdateCustomerMutation({
 *   variables: {
 *      updateCustomerDto: // value for 'updateCustomerDto'
 *   },
 * });
 */
export function useUpdateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UpdateCustomerDocument, options);
      }
export type UpdateCustomerMutationHookResult = ReturnType<typeof useUpdateCustomerMutation>;
export type UpdateCustomerMutationResult = Apollo.MutationResult<UpdateCustomerMutation>;
export type UpdateCustomerMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const DeleteCustomerDocument = gql`
    mutation DeleteCustomer($customerIds: [Int!]!) {
  deleteCustomer(customerIds: $customerIds)
}
    `;
export type DeleteCustomerMutationFn = Apollo.MutationFunction<DeleteCustomerMutation, DeleteCustomerMutationVariables>;

/**
 * __useDeleteCustomerMutation__
 *
 * To run a mutation, you first call `useDeleteCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCustomerMutation, { data, loading, error }] = useDeleteCustomerMutation({
 *   variables: {
 *      customerIds: // value for 'customerIds'
 *   },
 * });
 */
export function useDeleteCustomerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCustomerMutation, DeleteCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCustomerMutation, DeleteCustomerMutationVariables>(DeleteCustomerDocument, options);
      }
export type DeleteCustomerMutationHookResult = ReturnType<typeof useDeleteCustomerMutation>;
export type DeleteCustomerMutationResult = Apollo.MutationResult<DeleteCustomerMutation>;
export type DeleteCustomerMutationOptions = Apollo.BaseMutationOptions<DeleteCustomerMutation, DeleteCustomerMutationVariables>;
export const UpdateCustomersDocument = gql`
    mutation UpdateCustomers($updateCustomersDto: UpdateCustomersDto!) {
  updateCustomers(updateCustomersDto: $updateCustomersDto)
}
    `;
export type UpdateCustomersMutationFn = Apollo.MutationFunction<UpdateCustomersMutation, UpdateCustomersMutationVariables>;

/**
 * __useUpdateCustomersMutation__
 *
 * To run a mutation, you first call `useUpdateCustomersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomersMutation, { data, loading, error }] = useUpdateCustomersMutation({
 *   variables: {
 *      updateCustomersDto: // value for 'updateCustomersDto'
 *   },
 * });
 */
export function useUpdateCustomersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomersMutation, UpdateCustomersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomersMutation, UpdateCustomersMutationVariables>(UpdateCustomersDocument, options);
      }
export type UpdateCustomersMutationHookResult = ReturnType<typeof useUpdateCustomersMutation>;
export type UpdateCustomersMutationResult = Apollo.MutationResult<UpdateCustomersMutation>;
export type UpdateCustomersMutationOptions = Apollo.BaseMutationOptions<UpdateCustomersMutation, UpdateCustomersMutationVariables>;
export const CreateCustomerGroupDocument = gql`
    mutation CreateCustomerGroup($createCustomerGroupDto: CreateCustomerGroupDto!) {
  createCustomerGroup(CreateCustomerGroupDto: $createCustomerGroupDto) {
    id
  }
}
    `;
export type CreateCustomerGroupMutationFn = Apollo.MutationFunction<CreateCustomerGroupMutation, CreateCustomerGroupMutationVariables>;

/**
 * __useCreateCustomerGroupMutation__
 *
 * To run a mutation, you first call `useCreateCustomerGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerGroupMutation, { data, loading, error }] = useCreateCustomerGroupMutation({
 *   variables: {
 *      createCustomerGroupDto: // value for 'createCustomerGroupDto'
 *   },
 * });
 */
export function useCreateCustomerGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerGroupMutation, CreateCustomerGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerGroupMutation, CreateCustomerGroupMutationVariables>(CreateCustomerGroupDocument, options);
      }
export type CreateCustomerGroupMutationHookResult = ReturnType<typeof useCreateCustomerGroupMutation>;
export type CreateCustomerGroupMutationResult = Apollo.MutationResult<CreateCustomerGroupMutation>;
export type CreateCustomerGroupMutationOptions = Apollo.BaseMutationOptions<CreateCustomerGroupMutation, CreateCustomerGroupMutationVariables>;
export const UpdateCustomerGroupDocument = gql`
    mutation UpdateCustomerGroup($updateCustomerGroupDto: UpdateCustomerGroupDto!) {
  updateCustomerGroup(UpdateCustomerGroupDto: $updateCustomerGroupDto) {
    id
  }
}
    `;
export type UpdateCustomerGroupMutationFn = Apollo.MutationFunction<UpdateCustomerGroupMutation, UpdateCustomerGroupMutationVariables>;

/**
 * __useUpdateCustomerGroupMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerGroupMutation, { data, loading, error }] = useUpdateCustomerGroupMutation({
 *   variables: {
 *      updateCustomerGroupDto: // value for 'updateCustomerGroupDto'
 *   },
 * });
 */
export function useUpdateCustomerGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerGroupMutation, UpdateCustomerGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerGroupMutation, UpdateCustomerGroupMutationVariables>(UpdateCustomerGroupDocument, options);
      }
export type UpdateCustomerGroupMutationHookResult = ReturnType<typeof useUpdateCustomerGroupMutation>;
export type UpdateCustomerGroupMutationResult = Apollo.MutationResult<UpdateCustomerGroupMutation>;
export type UpdateCustomerGroupMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerGroupMutation, UpdateCustomerGroupMutationVariables>;
export const DeleteCustomerGroupDocument = gql`
    mutation DeleteCustomerGroup($customerGroupId: Float!) {
  deleteCustomerGroup(customerGroupId: $customerGroupId)
}
    `;
export type DeleteCustomerGroupMutationFn = Apollo.MutationFunction<DeleteCustomerGroupMutation, DeleteCustomerGroupMutationVariables>;

/**
 * __useDeleteCustomerGroupMutation__
 *
 * To run a mutation, you first call `useDeleteCustomerGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCustomerGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCustomerGroupMutation, { data, loading, error }] = useDeleteCustomerGroupMutation({
 *   variables: {
 *      customerGroupId: // value for 'customerGroupId'
 *   },
 * });
 */
export function useDeleteCustomerGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCustomerGroupMutation, DeleteCustomerGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCustomerGroupMutation, DeleteCustomerGroupMutationVariables>(DeleteCustomerGroupDocument, options);
      }
export type DeleteCustomerGroupMutationHookResult = ReturnType<typeof useDeleteCustomerGroupMutation>;
export type DeleteCustomerGroupMutationResult = Apollo.MutationResult<DeleteCustomerGroupMutation>;
export type DeleteCustomerGroupMutationOptions = Apollo.BaseMutationOptions<DeleteCustomerGroupMutation, DeleteCustomerGroupMutationVariables>;
export const CreateCustomerGradeDocument = gql`
    mutation CreateCustomerGrade($createCustomerGradeDto: CreateCustomerGradeDto!) {
  createCustomerGrade(CreateCustomerGradeDto: $createCustomerGradeDto) {
    id
  }
}
    `;
export type CreateCustomerGradeMutationFn = Apollo.MutationFunction<CreateCustomerGradeMutation, CreateCustomerGradeMutationVariables>;

/**
 * __useCreateCustomerGradeMutation__
 *
 * To run a mutation, you first call `useCreateCustomerGradeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerGradeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerGradeMutation, { data, loading, error }] = useCreateCustomerGradeMutation({
 *   variables: {
 *      createCustomerGradeDto: // value for 'createCustomerGradeDto'
 *   },
 * });
 */
export function useCreateCustomerGradeMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerGradeMutation, CreateCustomerGradeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerGradeMutation, CreateCustomerGradeMutationVariables>(CreateCustomerGradeDocument, options);
      }
export type CreateCustomerGradeMutationHookResult = ReturnType<typeof useCreateCustomerGradeMutation>;
export type CreateCustomerGradeMutationResult = Apollo.MutationResult<CreateCustomerGradeMutation>;
export type CreateCustomerGradeMutationOptions = Apollo.BaseMutationOptions<CreateCustomerGradeMutation, CreateCustomerGradeMutationVariables>;
export const UpdateCustomerGradeDocument = gql`
    mutation UpdateCustomerGrade($updateCustomerGradeDto: UpdateCustomerGradeDto!) {
  updateCustomerGrade(UpdateCustomerGradeDto: $updateCustomerGradeDto) {
    id
  }
}
    `;
export type UpdateCustomerGradeMutationFn = Apollo.MutationFunction<UpdateCustomerGradeMutation, UpdateCustomerGradeMutationVariables>;

/**
 * __useUpdateCustomerGradeMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerGradeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerGradeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerGradeMutation, { data, loading, error }] = useUpdateCustomerGradeMutation({
 *   variables: {
 *      updateCustomerGradeDto: // value for 'updateCustomerGradeDto'
 *   },
 * });
 */
export function useUpdateCustomerGradeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerGradeMutation, UpdateCustomerGradeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerGradeMutation, UpdateCustomerGradeMutationVariables>(UpdateCustomerGradeDocument, options);
      }
export type UpdateCustomerGradeMutationHookResult = ReturnType<typeof useUpdateCustomerGradeMutation>;
export type UpdateCustomerGradeMutationResult = Apollo.MutationResult<UpdateCustomerGradeMutation>;
export type UpdateCustomerGradeMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerGradeMutation, UpdateCustomerGradeMutationVariables>;
export const DeleteCustomerGradeDocument = gql`
    mutation DeleteCustomerGrade($customerGradeId: Float!) {
  deleteCustomerGrade(customerGradeId: $customerGradeId)
}
    `;
export type DeleteCustomerGradeMutationFn = Apollo.MutationFunction<DeleteCustomerGradeMutation, DeleteCustomerGradeMutationVariables>;

/**
 * __useDeleteCustomerGradeMutation__
 *
 * To run a mutation, you first call `useDeleteCustomerGradeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCustomerGradeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCustomerGradeMutation, { data, loading, error }] = useDeleteCustomerGradeMutation({
 *   variables: {
 *      customerGradeId: // value for 'customerGradeId'
 *   },
 * });
 */
export function useDeleteCustomerGradeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCustomerGradeMutation, DeleteCustomerGradeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCustomerGradeMutation, DeleteCustomerGradeMutationVariables>(DeleteCustomerGradeDocument, options);
      }
export type DeleteCustomerGradeMutationHookResult = ReturnType<typeof useDeleteCustomerGradeMutation>;
export type DeleteCustomerGradeMutationResult = Apollo.MutationResult<DeleteCustomerGradeMutation>;
export type DeleteCustomerGradeMutationOptions = Apollo.BaseMutationOptions<DeleteCustomerGradeMutation, DeleteCustomerGradeMutationVariables>;
export const CreateNoticeDocument = gql`
    mutation CreateNotice($createNoticeDto: CreateNoticeDto!) {
  createNotice(createNoticeDto: $createNoticeDto) {
    id
  }
}
    `;
export type CreateNoticeMutationFn = Apollo.MutationFunction<CreateNoticeMutation, CreateNoticeMutationVariables>;

/**
 * __useCreateNoticeMutation__
 *
 * To run a mutation, you first call `useCreateNoticeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoticeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoticeMutation, { data, loading, error }] = useCreateNoticeMutation({
 *   variables: {
 *      createNoticeDto: // value for 'createNoticeDto'
 *   },
 * });
 */
export function useCreateNoticeMutation(baseOptions?: Apollo.MutationHookOptions<CreateNoticeMutation, CreateNoticeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNoticeMutation, CreateNoticeMutationVariables>(CreateNoticeDocument, options);
      }
export type CreateNoticeMutationHookResult = ReturnType<typeof useCreateNoticeMutation>;
export type CreateNoticeMutationResult = Apollo.MutationResult<CreateNoticeMutation>;
export type CreateNoticeMutationOptions = Apollo.BaseMutationOptions<CreateNoticeMutation, CreateNoticeMutationVariables>;
export const UpdateNoticeDocument = gql`
    mutation UpdateNotice($updateNoticeDto: UpdateNoticeDto!) {
  updateNotice(updateNoticeDto: $updateNoticeDto) {
    id
  }
}
    `;
export type UpdateNoticeMutationFn = Apollo.MutationFunction<UpdateNoticeMutation, UpdateNoticeMutationVariables>;

/**
 * __useUpdateNoticeMutation__
 *
 * To run a mutation, you first call `useUpdateNoticeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoticeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoticeMutation, { data, loading, error }] = useUpdateNoticeMutation({
 *   variables: {
 *      updateNoticeDto: // value for 'updateNoticeDto'
 *   },
 * });
 */
export function useUpdateNoticeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNoticeMutation, UpdateNoticeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNoticeMutation, UpdateNoticeMutationVariables>(UpdateNoticeDocument, options);
      }
export type UpdateNoticeMutationHookResult = ReturnType<typeof useUpdateNoticeMutation>;
export type UpdateNoticeMutationResult = Apollo.MutationResult<UpdateNoticeMutation>;
export type UpdateNoticeMutationOptions = Apollo.BaseMutationOptions<UpdateNoticeMutation, UpdateNoticeMutationVariables>;
export const DeleteNoticeDocument = gql`
    mutation DeleteNotice($noticeId: Float!) {
  deleteNotice(noticeId: $noticeId)
}
    `;
export type DeleteNoticeMutationFn = Apollo.MutationFunction<DeleteNoticeMutation, DeleteNoticeMutationVariables>;

/**
 * __useDeleteNoticeMutation__
 *
 * To run a mutation, you first call `useDeleteNoticeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoticeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoticeMutation, { data, loading, error }] = useDeleteNoticeMutation({
 *   variables: {
 *      noticeId: // value for 'noticeId'
 *   },
 * });
 */
export function useDeleteNoticeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNoticeMutation, DeleteNoticeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNoticeMutation, DeleteNoticeMutationVariables>(DeleteNoticeDocument, options);
      }
export type DeleteNoticeMutationHookResult = ReturnType<typeof useDeleteNoticeMutation>;
export type DeleteNoticeMutationResult = Apollo.MutationResult<DeleteNoticeMutation>;
export type DeleteNoticeMutationOptions = Apollo.BaseMutationOptions<DeleteNoticeMutation, DeleteNoticeMutationVariables>;
export const ReadNotificationDocument = gql`
    mutation ReadNotification($notificationId: Float!) {
  readNotification(notificationId: $notificationId) {
    id
  }
}
    `;
export type ReadNotificationMutationFn = Apollo.MutationFunction<ReadNotificationMutation, ReadNotificationMutationVariables>;

/**
 * __useReadNotificationMutation__
 *
 * To run a mutation, you first call `useReadNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readNotificationMutation, { data, loading, error }] = useReadNotificationMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useReadNotificationMutation(baseOptions?: Apollo.MutationHookOptions<ReadNotificationMutation, ReadNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadNotificationMutation, ReadNotificationMutationVariables>(ReadNotificationDocument, options);
      }
export type ReadNotificationMutationHookResult = ReturnType<typeof useReadNotificationMutation>;
export type ReadNotificationMutationResult = Apollo.MutationResult<ReadNotificationMutation>;
export type ReadNotificationMutationOptions = Apollo.BaseMutationOptions<ReadNotificationMutation, ReadNotificationMutationVariables>;
export const DeleteNotificationDocument = gql`
    mutation DeleteNotification($notificationId: Float!) {
  deleteNotification(notificationId: $notificationId)
}
    `;
export type DeleteNotificationMutationFn = Apollo.MutationFunction<DeleteNotificationMutation, DeleteNotificationMutationVariables>;

/**
 * __useDeleteNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationMutation, { data, loading, error }] = useDeleteNotificationMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useDeleteNotificationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(DeleteNotificationDocument, options);
      }
export type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>;
export type DeleteNotificationMutationResult = Apollo.MutationResult<DeleteNotificationMutation>;
export type DeleteNotificationMutationOptions = Apollo.BaseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const ReadAllNotificationDocument = gql`
    mutation ReadAllNotification {
  readAllNotification
}
    `;
export type ReadAllNotificationMutationFn = Apollo.MutationFunction<ReadAllNotificationMutation, ReadAllNotificationMutationVariables>;

/**
 * __useReadAllNotificationMutation__
 *
 * To run a mutation, you first call `useReadAllNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadAllNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readAllNotificationMutation, { data, loading, error }] = useReadAllNotificationMutation({
 *   variables: {
 *   },
 * });
 */
export function useReadAllNotificationMutation(baseOptions?: Apollo.MutationHookOptions<ReadAllNotificationMutation, ReadAllNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadAllNotificationMutation, ReadAllNotificationMutationVariables>(ReadAllNotificationDocument, options);
      }
export type ReadAllNotificationMutationHookResult = ReturnType<typeof useReadAllNotificationMutation>;
export type ReadAllNotificationMutationResult = Apollo.MutationResult<ReadAllNotificationMutation>;
export type ReadAllNotificationMutationOptions = Apollo.BaseMutationOptions<ReadAllNotificationMutation, ReadAllNotificationMutationVariables>;
export const DeleteAllNotificationDocument = gql`
    mutation DeleteAllNotification {
  deleteAllNotification
}
    `;
export type DeleteAllNotificationMutationFn = Apollo.MutationFunction<DeleteAllNotificationMutation, DeleteAllNotificationMutationVariables>;

/**
 * __useDeleteAllNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteAllNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAllNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAllNotificationMutation, { data, loading, error }] = useDeleteAllNotificationMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAllNotificationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAllNotificationMutation, DeleteAllNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAllNotificationMutation, DeleteAllNotificationMutationVariables>(DeleteAllNotificationDocument, options);
      }
export type DeleteAllNotificationMutationHookResult = ReturnType<typeof useDeleteAllNotificationMutation>;
export type DeleteAllNotificationMutationResult = Apollo.MutationResult<DeleteAllNotificationMutation>;
export type DeleteAllNotificationMutationOptions = Apollo.BaseMutationOptions<DeleteAllNotificationMutation, DeleteAllNotificationMutationVariables>;
export const CreatePayStubDocument = gql`
    mutation CreatePayStub($createPayStubDto: CreatePayStubDto!) {
  createPayStub(createPayStubDto: $createPayStubDto)
}
    `;
export type CreatePayStubMutationFn = Apollo.MutationFunction<CreatePayStubMutation, CreatePayStubMutationVariables>;

/**
 * __useCreatePayStubMutation__
 *
 * To run a mutation, you first call `useCreatePayStubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePayStubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPayStubMutation, { data, loading, error }] = useCreatePayStubMutation({
 *   variables: {
 *      createPayStubDto: // value for 'createPayStubDto'
 *   },
 * });
 */
export function useCreatePayStubMutation(baseOptions?: Apollo.MutationHookOptions<CreatePayStubMutation, CreatePayStubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePayStubMutation, CreatePayStubMutationVariables>(CreatePayStubDocument, options);
      }
export type CreatePayStubMutationHookResult = ReturnType<typeof useCreatePayStubMutation>;
export type CreatePayStubMutationResult = Apollo.MutationResult<CreatePayStubMutation>;
export type CreatePayStubMutationOptions = Apollo.BaseMutationOptions<CreatePayStubMutation, CreatePayStubMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($createTeamDto: CreateTeamDto!) {
  createTeam(createTeamDto: $createTeamDto) {
    id
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      createTeamDto: // value for 'createTeamDto'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($updateTeamDto: UpdateTeamDto!) {
  updateTeam(updateTeamDto: $updateTeamDto) {
    id
  }
}
    `;
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      updateTeamDto: // value for 'updateTeamDto'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($teamId: Float!) {
  deleteTeam(teamId: $teamId)
}
    `;
export type DeleteTeamMutationFn = Apollo.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserDto: CreateUserDto!) {
  createUser(createUserDto: $createUserDto) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserDto: // value for 'createUserDto'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserDto: UpdateUserDto!) {
  updateUser(updateUserDto: $updateUserDto) {
    id
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserDto: // value for 'updateUserDto'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($updatePasswordDto: UpdatePasswordDto!) {
  updatePassword(updatePasswordDto: $updatePasswordDto)
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      updatePasswordDto: // value for 'updatePasswordDto'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($deleteUserId: Float!, $targetUserId: Float) {
  deleteUser(deleteUserId: $deleteUserId, targetUserId: $targetUserId)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      deleteUserId: // value for 'deleteUserId'
 *      targetUserId: // value for 'targetUserId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetAdjustmentsDocument = gql`
    query GetAdjustments($getAdjustmentsDto: GetAdjustmentsDto!) {
  getAdjustments(getAdjustmentsDto: $getAdjustmentsDto) {
    year
    month
    user {
      id
      name
      position {
        id
        name
      }
    }
    totalCountContract
    totalFeeContract
    totalExpenditureContract
    totalNetIncomeContract
    totalIncentiveContract
    totalCountDelivery
    totalFeeDelivery
    totalExpenditureDelivery
    totalNetIncomeDelivery
    totalIncentiveDelivery
    etcIncentive
    additionalIncentive {
      id
      additionalIncentive
    }
    bonus {
      id
      bonus
    }
  }
}
    `;

/**
 * __useGetAdjustmentsQuery__
 *
 * To run a query within a React component, call `useGetAdjustmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdjustmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdjustmentsQuery({
 *   variables: {
 *      getAdjustmentsDto: // value for 'getAdjustmentsDto'
 *   },
 * });
 */
export function useGetAdjustmentsQuery(baseOptions: Apollo.QueryHookOptions<GetAdjustmentsQuery, GetAdjustmentsQueryVariables> & ({ variables: GetAdjustmentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdjustmentsQuery, GetAdjustmentsQueryVariables>(GetAdjustmentsDocument, options);
      }
export function useGetAdjustmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdjustmentsQuery, GetAdjustmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdjustmentsQuery, GetAdjustmentsQueryVariables>(GetAdjustmentsDocument, options);
        }
export function useGetAdjustmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdjustmentsQuery, GetAdjustmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdjustmentsQuery, GetAdjustmentsQueryVariables>(GetAdjustmentsDocument, options);
        }
export type GetAdjustmentsQueryHookResult = ReturnType<typeof useGetAdjustmentsQuery>;
export type GetAdjustmentsLazyQueryHookResult = ReturnType<typeof useGetAdjustmentsLazyQuery>;
export type GetAdjustmentsSuspenseQueryHookResult = ReturnType<typeof useGetAdjustmentsSuspenseQuery>;
export type GetAdjustmentsQueryResult = Apollo.QueryResult<GetAdjustmentsQuery, GetAdjustmentsQueryVariables>;
export const MakeExcelDocument = gql`
    query MakeExcel($year: String!, $month: String!, $email: String!) {
  makeExcel(year: $year, month: $month, email: $email)
}
    `;

/**
 * __useMakeExcelQuery__
 *
 * To run a query within a React component, call `useMakeExcelQuery` and pass it any options that fit your needs.
 * When your component renders, `useMakeExcelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMakeExcelQuery({
 *   variables: {
 *      year: // value for 'year'
 *      month: // value for 'month'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useMakeExcelQuery(baseOptions: Apollo.QueryHookOptions<MakeExcelQuery, MakeExcelQueryVariables> & ({ variables: MakeExcelQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MakeExcelQuery, MakeExcelQueryVariables>(MakeExcelDocument, options);
      }
export function useMakeExcelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MakeExcelQuery, MakeExcelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MakeExcelQuery, MakeExcelQueryVariables>(MakeExcelDocument, options);
        }
export function useMakeExcelSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MakeExcelQuery, MakeExcelQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MakeExcelQuery, MakeExcelQueryVariables>(MakeExcelDocument, options);
        }
export type MakeExcelQueryHookResult = ReturnType<typeof useMakeExcelQuery>;
export type MakeExcelLazyQueryHookResult = ReturnType<typeof useMakeExcelLazyQuery>;
export type MakeExcelSuspenseQueryHookResult = ReturnType<typeof useMakeExcelSuspenseQuery>;
export type MakeExcelQueryResult = Apollo.QueryResult<MakeExcelQuery, MakeExcelQueryVariables>;
export const GetAgencyContractsDocument = gql`
    query GetAgencyContracts($getAgencyContractsDto: GetAgencyContractsDto!) {
  getAgencyContracts(getAgencyContractsDto: $getAgencyContractsDto) {
    id
    status
    user {
      id
      name
    }
    city {
      id
      name
    }
    contractAt
    shippingDate
    customer {
      id
      name
      phone
      customerStatus {
        id
        status
      }
    }
    car {
      id
      name
      brand {
        id
        name
      }
    }
    carOption
    innerColor
    outerColor
    carPrice
    financialCompany {
      id
      name
    }
    feeRate
    fee
    promotion
    monthlyPayment
    shippingMethod {
      id
      name
    }
    isOrdering
    isVATSupport
    branch
    branchFee
    collateralRate
    contractPeriod
    agreedMileage
    insuranceAge
    object
    service1
    serviceBody1
    service2
    serviceBody2
    service3
    serviceBody3
    incomeEarner
    cashAssistance
    supportDetails
    businessExpenses
    businessExpensesDetail
    totalExpenditure
    totalFee
    netIncome
    company_name_nominee
    division {
      id
      name
    }
    advancePayment
    hasContractConfirmationLetter
    hasRegistrationCertificate
    note
    agencyPaymentDate
  }
}
    `;

/**
 * __useGetAgencyContractsQuery__
 *
 * To run a query within a React component, call `useGetAgencyContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAgencyContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAgencyContractsQuery({
 *   variables: {
 *      getAgencyContractsDto: // value for 'getAgencyContractsDto'
 *   },
 * });
 */
export function useGetAgencyContractsQuery(baseOptions: Apollo.QueryHookOptions<GetAgencyContractsQuery, GetAgencyContractsQueryVariables> & ({ variables: GetAgencyContractsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAgencyContractsQuery, GetAgencyContractsQueryVariables>(GetAgencyContractsDocument, options);
      }
export function useGetAgencyContractsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAgencyContractsQuery, GetAgencyContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAgencyContractsQuery, GetAgencyContractsQueryVariables>(GetAgencyContractsDocument, options);
        }
export function useGetAgencyContractsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAgencyContractsQuery, GetAgencyContractsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAgencyContractsQuery, GetAgencyContractsQueryVariables>(GetAgencyContractsDocument, options);
        }
export type GetAgencyContractsQueryHookResult = ReturnType<typeof useGetAgencyContractsQuery>;
export type GetAgencyContractsLazyQueryHookResult = ReturnType<typeof useGetAgencyContractsLazyQuery>;
export type GetAgencyContractsSuspenseQueryHookResult = ReturnType<typeof useGetAgencyContractsSuspenseQuery>;
export type GetAgencyContractsQueryResult = Apollo.QueryResult<GetAgencyContractsQuery, GetAgencyContractsQueryVariables>;
export const GetBrandsDocument = gql`
    query GetBrands($getBrandsDto: GetBrandsDto!) {
  getBrands(getBrandsDto: $getBrandsDto) {
    id
    name
    isDomestic
    cars {
      id
      name
      carFee
    }
    brandFee
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetBrandsQuery__
 *
 * To run a query within a React component, call `useGetBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandsQuery({
 *   variables: {
 *      getBrandsDto: // value for 'getBrandsDto'
 *   },
 * });
 */
export function useGetBrandsQuery(baseOptions: Apollo.QueryHookOptions<GetBrandsQuery, GetBrandsQueryVariables> & ({ variables: GetBrandsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBrandsQuery, GetBrandsQueryVariables>(GetBrandsDocument, options);
      }
export function useGetBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBrandsQuery, GetBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBrandsQuery, GetBrandsQueryVariables>(GetBrandsDocument, options);
        }
export function useGetBrandsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBrandsQuery, GetBrandsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBrandsQuery, GetBrandsQueryVariables>(GetBrandsDocument, options);
        }
export type GetBrandsQueryHookResult = ReturnType<typeof useGetBrandsQuery>;
export type GetBrandsLazyQueryHookResult = ReturnType<typeof useGetBrandsLazyQuery>;
export type GetBrandsSuspenseQueryHookResult = ReturnType<typeof useGetBrandsSuspenseQuery>;
export type GetBrandsQueryResult = Apollo.QueryResult<GetBrandsQuery, GetBrandsQueryVariables>;
export const GetBrandDocument = gql`
    query GetBrand($getBrandId: Float!) {
  getBrand(id: $getBrandId) {
    id
    name
    isDomestic
    cars {
      id
      name
      carFee
    }
    brandFee
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetBrandQuery__
 *
 * To run a query within a React component, call `useGetBrandQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandQuery({
 *   variables: {
 *      getBrandId: // value for 'getBrandId'
 *   },
 * });
 */
export function useGetBrandQuery(baseOptions: Apollo.QueryHookOptions<GetBrandQuery, GetBrandQueryVariables> & ({ variables: GetBrandQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBrandQuery, GetBrandQueryVariables>(GetBrandDocument, options);
      }
export function useGetBrandLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBrandQuery, GetBrandQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBrandQuery, GetBrandQueryVariables>(GetBrandDocument, options);
        }
export function useGetBrandSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBrandQuery, GetBrandQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBrandQuery, GetBrandQueryVariables>(GetBrandDocument, options);
        }
export type GetBrandQueryHookResult = ReturnType<typeof useGetBrandQuery>;
export type GetBrandLazyQueryHookResult = ReturnType<typeof useGetBrandLazyQuery>;
export type GetBrandSuspenseQueryHookResult = ReturnType<typeof useGetBrandSuspenseQuery>;
export type GetBrandQueryResult = Apollo.QueryResult<GetBrandQuery, GetBrandQueryVariables>;
export const GetCarsDocument = gql`
    query GetCars($getCarsDto: GetCarsDto!) {
  getCars(getCarsDto: $getCarsDto) {
    id
    name
    brand {
      id
      name
      isDomestic
      brandFee
    }
    carFee
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetCarsQuery__
 *
 * To run a query within a React component, call `useGetCarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarsQuery({
 *   variables: {
 *      getCarsDto: // value for 'getCarsDto'
 *   },
 * });
 */
export function useGetCarsQuery(baseOptions: Apollo.QueryHookOptions<GetCarsQuery, GetCarsQueryVariables> & ({ variables: GetCarsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarsQuery, GetCarsQueryVariables>(GetCarsDocument, options);
      }
export function useGetCarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarsQuery, GetCarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarsQuery, GetCarsQueryVariables>(GetCarsDocument, options);
        }
export function useGetCarsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCarsQuery, GetCarsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCarsQuery, GetCarsQueryVariables>(GetCarsDocument, options);
        }
export type GetCarsQueryHookResult = ReturnType<typeof useGetCarsQuery>;
export type GetCarsLazyQueryHookResult = ReturnType<typeof useGetCarsLazyQuery>;
export type GetCarsSuspenseQueryHookResult = ReturnType<typeof useGetCarsSuspenseQuery>;
export type GetCarsQueryResult = Apollo.QueryResult<GetCarsQuery, GetCarsQueryVariables>;
export const GetCarDocument = gql`
    query GetCar($getCarId: Float!) {
  getCar(id: $getCarId) {
    id
    name
    brand {
      id
      name
      isDomestic
      brandFee
    }
    carFee
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetCarQuery__
 *
 * To run a query within a React component, call `useGetCarQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarQuery({
 *   variables: {
 *      getCarId: // value for 'getCarId'
 *   },
 * });
 */
export function useGetCarQuery(baseOptions: Apollo.QueryHookOptions<GetCarQuery, GetCarQueryVariables> & ({ variables: GetCarQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarQuery, GetCarQueryVariables>(GetCarDocument, options);
      }
export function useGetCarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarQuery, GetCarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarQuery, GetCarQueryVariables>(GetCarDocument, options);
        }
export function useGetCarSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCarQuery, GetCarQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCarQuery, GetCarQueryVariables>(GetCarDocument, options);
        }
export type GetCarQueryHookResult = ReturnType<typeof useGetCarQuery>;
export type GetCarLazyQueryHookResult = ReturnType<typeof useGetCarLazyQuery>;
export type GetCarSuspenseQueryHookResult = ReturnType<typeof useGetCarSuspenseQuery>;
export type GetCarQueryResult = Apollo.QueryResult<GetCarQuery, GetCarQueryVariables>;
export const GetCitiesDocument = gql`
    query GetCities($getCitiesDto: GetCitiesDto!) {
  getCities(getCitiesDto: $getCitiesDto) {
    id
    name
  }
}
    `;

/**
 * __useGetCitiesQuery__
 *
 * To run a query within a React component, call `useGetCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitiesQuery({
 *   variables: {
 *      getCitiesDto: // value for 'getCitiesDto'
 *   },
 * });
 */
export function useGetCitiesQuery(baseOptions: Apollo.QueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables> & ({ variables: GetCitiesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
      }
export function useGetCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
        }
export function useGetCitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
        }
export type GetCitiesQueryHookResult = ReturnType<typeof useGetCitiesQuery>;
export type GetCitiesLazyQueryHookResult = ReturnType<typeof useGetCitiesLazyQuery>;
export type GetCitiesSuspenseQueryHookResult = ReturnType<typeof useGetCitiesSuspenseQuery>;
export type GetCitiesQueryResult = Apollo.QueryResult<GetCitiesQuery, GetCitiesQueryVariables>;
export const GetCityDocument = gql`
    query GetCity($cityId: Float!) {
  getCity(cityId: $cityId) {
    id
    name
  }
}
    `;

/**
 * __useGetCityQuery__
 *
 * To run a query within a React component, call `useGetCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCityQuery({
 *   variables: {
 *      cityId: // value for 'cityId'
 *   },
 * });
 */
export function useGetCityQuery(baseOptions: Apollo.QueryHookOptions<GetCityQuery, GetCityQueryVariables> & ({ variables: GetCityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCityQuery, GetCityQueryVariables>(GetCityDocument, options);
      }
export function useGetCityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCityQuery, GetCityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCityQuery, GetCityQueryVariables>(GetCityDocument, options);
        }
export function useGetCitySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCityQuery, GetCityQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCityQuery, GetCityQueryVariables>(GetCityDocument, options);
        }
export type GetCityQueryHookResult = ReturnType<typeof useGetCityQuery>;
export type GetCityLazyQueryHookResult = ReturnType<typeof useGetCityLazyQuery>;
export type GetCitySuspenseQueryHookResult = ReturnType<typeof useGetCitySuspenseQuery>;
export type GetCityQueryResult = Apollo.QueryResult<GetCityQuery, GetCityQueryVariables>;
export const GetContractsDocument = gql`
    query GetContracts($getContractsDto: GetContractsDto!) {
  getContracts(getContractsDto: $getContractsDto) {
    id
    status
    user {
      id
      name
    }
    city {
      id
      name
    }
    contractAt
    shippingDate
    customer {
      id
      name
      phone
      customerStatus {
        id
        status
      }
    }
    car {
      id
      name
      brand {
        id
        name
      }
    }
    carOption
    innerColor
    outerColor
    carPrice
    financialCompany {
      id
      name
    }
    feeRate
    fee
    promotion
    monthlyPayment
    shippingMethod {
      id
      name
    }
    isOrdering
    isVATSupport
    branch
    branchFee
    collateralRate
    contractPeriod
    agreedMileage
    insuranceAge
    object
    service1
    serviceBody1
    service2
    serviceBody2
    service3
    serviceBody3
    incomeEarner
    cashAssistance
    supportDetails
    businessExpenses
    businessExpensesDetail
    totalExpenditure
    totalFee
    netIncome
    company_name_nominee
    division {
      id
      name
    }
    advancePayment
    hasContractConfirmationLetter
    hasRegistrationCertificate
    note
    agencyPaymentDate
  }
}
    `;

/**
 * __useGetContractsQuery__
 *
 * To run a query within a React component, call `useGetContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractsQuery({
 *   variables: {
 *      getContractsDto: // value for 'getContractsDto'
 *   },
 * });
 */
export function useGetContractsQuery(baseOptions: Apollo.QueryHookOptions<GetContractsQuery, GetContractsQueryVariables> & ({ variables: GetContractsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContractsQuery, GetContractsQueryVariables>(GetContractsDocument, options);
      }
export function useGetContractsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContractsQuery, GetContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContractsQuery, GetContractsQueryVariables>(GetContractsDocument, options);
        }
export function useGetContractsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetContractsQuery, GetContractsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContractsQuery, GetContractsQueryVariables>(GetContractsDocument, options);
        }
export type GetContractsQueryHookResult = ReturnType<typeof useGetContractsQuery>;
export type GetContractsLazyQueryHookResult = ReturnType<typeof useGetContractsLazyQuery>;
export type GetContractsSuspenseQueryHookResult = ReturnType<typeof useGetContractsSuspenseQuery>;
export type GetContractsQueryResult = Apollo.QueryResult<GetContractsQuery, GetContractsQueryVariables>;
export const GetContractDocument = gql`
    query GetContract($contractId: Float!) {
  getContract(contractId: $contractId) {
    id
    status
    user {
      id
      name
    }
    city {
      id
      name
    }
    contractAt
    shippingDate
    customer {
      id
      name
      phone
    }
    car {
      id
      name
      carFee
      brand {
        id
        name
        brandFee
      }
    }
    carOption
    innerColor
    outerColor
    carPrice
    financialCompany {
      id
      name
    }
    feeRate
    fee
    promotion
    monthlyPayment
    shippingMethod {
      id
      name
    }
    isOrdering
    isVATSupport
    branch
    branchFee
    collateralRate
    contractPeriod
    agreedMileage
    insuranceAge
    object
    service1
    serviceBody1
    service2
    serviceBody2
    service3
    serviceBody3
    incomeEarner
    cashAssistance
    supportDetails
    businessExpenses
    businessExpensesDetail
    totalExpenditure
    totalFee
    netIncome
    company_name_nominee
    division {
      id
      name
    }
    advancePayment
    hasContractConfirmationLetter
    hasRegistrationCertificate
    note
    agencyPaymentDate
  }
}
    `;

/**
 * __useGetContractQuery__
 *
 * To run a query within a React component, call `useGetContractQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetContractQuery(baseOptions: Apollo.QueryHookOptions<GetContractQuery, GetContractQueryVariables> & ({ variables: GetContractQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContractQuery, GetContractQueryVariables>(GetContractDocument, options);
      }
export function useGetContractLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContractQuery, GetContractQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContractQuery, GetContractQueryVariables>(GetContractDocument, options);
        }
export function useGetContractSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetContractQuery, GetContractQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContractQuery, GetContractQueryVariables>(GetContractDocument, options);
        }
export type GetContractQueryHookResult = ReturnType<typeof useGetContractQuery>;
export type GetContractLazyQueryHookResult = ReturnType<typeof useGetContractLazyQuery>;
export type GetContractSuspenseQueryHookResult = ReturnType<typeof useGetContractSuspenseQuery>;
export type GetContractQueryResult = Apollo.QueryResult<GetContractQuery, GetContractQueryVariables>;
export const GetFinancialCompaniesDocument = gql`
    query GetFinancialCompanies {
  getFinancialCompanies {
    id
    name
  }
}
    `;

/**
 * __useGetFinancialCompaniesQuery__
 *
 * To run a query within a React component, call `useGetFinancialCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFinancialCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFinancialCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFinancialCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<GetFinancialCompaniesQuery, GetFinancialCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFinancialCompaniesQuery, GetFinancialCompaniesQueryVariables>(GetFinancialCompaniesDocument, options);
      }
export function useGetFinancialCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFinancialCompaniesQuery, GetFinancialCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFinancialCompaniesQuery, GetFinancialCompaniesQueryVariables>(GetFinancialCompaniesDocument, options);
        }
export function useGetFinancialCompaniesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFinancialCompaniesQuery, GetFinancialCompaniesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFinancialCompaniesQuery, GetFinancialCompaniesQueryVariables>(GetFinancialCompaniesDocument, options);
        }
export type GetFinancialCompaniesQueryHookResult = ReturnType<typeof useGetFinancialCompaniesQuery>;
export type GetFinancialCompaniesLazyQueryHookResult = ReturnType<typeof useGetFinancialCompaniesLazyQuery>;
export type GetFinancialCompaniesSuspenseQueryHookResult = ReturnType<typeof useGetFinancialCompaniesSuspenseQuery>;
export type GetFinancialCompaniesQueryResult = Apollo.QueryResult<GetFinancialCompaniesQuery, GetFinancialCompaniesQueryVariables>;
export const GetDivisionsDocument = gql`
    query GetDivisions {
  getDivisions {
    id
    name
  }
}
    `;

/**
 * __useGetDivisionsQuery__
 *
 * To run a query within a React component, call `useGetDivisionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDivisionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDivisionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDivisionsQuery(baseOptions?: Apollo.QueryHookOptions<GetDivisionsQuery, GetDivisionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDivisionsQuery, GetDivisionsQueryVariables>(GetDivisionsDocument, options);
      }
export function useGetDivisionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDivisionsQuery, GetDivisionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDivisionsQuery, GetDivisionsQueryVariables>(GetDivisionsDocument, options);
        }
export function useGetDivisionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDivisionsQuery, GetDivisionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDivisionsQuery, GetDivisionsQueryVariables>(GetDivisionsDocument, options);
        }
export type GetDivisionsQueryHookResult = ReturnType<typeof useGetDivisionsQuery>;
export type GetDivisionsLazyQueryHookResult = ReturnType<typeof useGetDivisionsLazyQuery>;
export type GetDivisionsSuspenseQueryHookResult = ReturnType<typeof useGetDivisionsSuspenseQuery>;
export type GetDivisionsQueryResult = Apollo.QueryResult<GetDivisionsQuery, GetDivisionsQueryVariables>;
export const GetShippingMethodsDocument = gql`
    query GetShippingMethods {
  getShippingMethods {
    id
    name
  }
}
    `;

/**
 * __useGetShippingMethodsQuery__
 *
 * To run a query within a React component, call `useGetShippingMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShippingMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShippingMethodsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetShippingMethodsQuery(baseOptions?: Apollo.QueryHookOptions<GetShippingMethodsQuery, GetShippingMethodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShippingMethodsQuery, GetShippingMethodsQueryVariables>(GetShippingMethodsDocument, options);
      }
export function useGetShippingMethodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShippingMethodsQuery, GetShippingMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShippingMethodsQuery, GetShippingMethodsQueryVariables>(GetShippingMethodsDocument, options);
        }
export function useGetShippingMethodsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetShippingMethodsQuery, GetShippingMethodsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetShippingMethodsQuery, GetShippingMethodsQueryVariables>(GetShippingMethodsDocument, options);
        }
export type GetShippingMethodsQueryHookResult = ReturnType<typeof useGetShippingMethodsQuery>;
export type GetShippingMethodsLazyQueryHookResult = ReturnType<typeof useGetShippingMethodsLazyQuery>;
export type GetShippingMethodsSuspenseQueryHookResult = ReturnType<typeof useGetShippingMethodsSuspenseQuery>;
export type GetShippingMethodsQueryResult = Apollo.QueryResult<GetShippingMethodsQuery, GetShippingMethodsQueryVariables>;
export const GetCounselsDocument = gql`
    query GetCounsels($getCounselsDto: GetCounselsDto!) {
  getCounsels(getCounselsDto: $getCounselsDto) {
    id
    status
    counselAt
    context
    customer {
      id
      name
      phone
      customerGroup {
        id
        name
      }
      customerGrade {
        id
        name
      }
      customerStatus {
        id
        status
      }
    }
    contract {
      id
      car {
        id
        name
        brand {
          id
          name
        }
      }
      division {
        id
        name
      }
    }
    user {
      id
      name
    }
  }
}
    `;

/**
 * __useGetCounselsQuery__
 *
 * To run a query within a React component, call `useGetCounselsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCounselsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCounselsQuery({
 *   variables: {
 *      getCounselsDto: // value for 'getCounselsDto'
 *   },
 * });
 */
export function useGetCounselsQuery(baseOptions: Apollo.QueryHookOptions<GetCounselsQuery, GetCounselsQueryVariables> & ({ variables: GetCounselsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCounselsQuery, GetCounselsQueryVariables>(GetCounselsDocument, options);
      }
export function useGetCounselsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCounselsQuery, GetCounselsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCounselsQuery, GetCounselsQueryVariables>(GetCounselsDocument, options);
        }
export function useGetCounselsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCounselsQuery, GetCounselsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCounselsQuery, GetCounselsQueryVariables>(GetCounselsDocument, options);
        }
export type GetCounselsQueryHookResult = ReturnType<typeof useGetCounselsQuery>;
export type GetCounselsLazyQueryHookResult = ReturnType<typeof useGetCounselsLazyQuery>;
export type GetCounselsSuspenseQueryHookResult = ReturnType<typeof useGetCounselsSuspenseQuery>;
export type GetCounselsQueryResult = Apollo.QueryResult<GetCounselsQuery, GetCounselsQueryVariables>;
export const GetCounselDocument = gql`
    query GetCounsel($counselId: Float!) {
  getCounsel(counselId: $counselId) {
    id
    status
    counselAt
    context
    customer {
      id
      name
      phone
      customerGroup {
        id
        name
      }
      customerGrade {
        id
        name
      }
      customerStatus {
        id
        status
      }
    }
    contract {
      id
      car {
        id
        name
        brand {
          id
          name
        }
      }
      division {
        id
        name
      }
    }
    user {
      id
      name
    }
  }
}
    `;

/**
 * __useGetCounselQuery__
 *
 * To run a query within a React component, call `useGetCounselQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCounselQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCounselQuery({
 *   variables: {
 *      counselId: // value for 'counselId'
 *   },
 * });
 */
export function useGetCounselQuery(baseOptions: Apollo.QueryHookOptions<GetCounselQuery, GetCounselQueryVariables> & ({ variables: GetCounselQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCounselQuery, GetCounselQueryVariables>(GetCounselDocument, options);
      }
export function useGetCounselLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCounselQuery, GetCounselQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCounselQuery, GetCounselQueryVariables>(GetCounselDocument, options);
        }
export function useGetCounselSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCounselQuery, GetCounselQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCounselQuery, GetCounselQueryVariables>(GetCounselDocument, options);
        }
export type GetCounselQueryHookResult = ReturnType<typeof useGetCounselQuery>;
export type GetCounselLazyQueryHookResult = ReturnType<typeof useGetCounselLazyQuery>;
export type GetCounselSuspenseQueryHookResult = ReturnType<typeof useGetCounselSuspenseQuery>;
export type GetCounselQueryResult = Apollo.QueryResult<GetCounselQuery, GetCounselQueryVariables>;
export const GetCustomersDocument = gql`
    query GetCustomers($getCustomersDto: GetCustomersDto!) {
  getCustomers(getCustomersDto: $getCustomersDto) {
    id
    created_at
    name
    phone
    memo
    note
    type
    company_name_nominee
    customerDivision {
      id
      name
    }
    origin
    carName
    carOption
    contractPeriod
    agreedMileage
    advancePayment
    contractList {
      car {
        id
        name
        brand {
          id
          name
        }
      }
      division {
        name
      }
    }
    counselList {
      counselAt
    }
    customerGrade {
      name
    }
    userList {
      name
    }
    customerStatus {
      status
    }
  }
}
    `;

/**
 * __useGetCustomersQuery__
 *
 * To run a query within a React component, call `useGetCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomersQuery({
 *   variables: {
 *      getCustomersDto: // value for 'getCustomersDto'
 *   },
 * });
 */
export function useGetCustomersQuery(baseOptions: Apollo.QueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables> & ({ variables: GetCustomersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
      }
export function useGetCustomersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export function useGetCustomersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export type GetCustomersQueryHookResult = ReturnType<typeof useGetCustomersQuery>;
export type GetCustomersLazyQueryHookResult = ReturnType<typeof useGetCustomersLazyQuery>;
export type GetCustomersSuspenseQueryHookResult = ReturnType<typeof useGetCustomersSuspenseQuery>;
export type GetCustomersQueryResult = Apollo.QueryResult<GetCustomersQuery, GetCustomersQueryVariables>;
export const GetCustomerDocument = gql`
    query GetCustomer($customerId: Float!) {
  getCustomer(customerId: $customerId) {
    id
    name
    phone
    sub_phone
    type
    created_at
    memo
    note
    company_name_nominee
    customerDivision {
      id
      name
    }
    origin
    carName
    carOption
    contractPeriod
    agreedMileage
    advancePayment
    userList {
      id
      name
    }
    customerGroup {
      id
      name
    }
    customerStatus {
      id
      status
    }
    contractList {
      id
      company_name_nominee
      advancePayment
      shippingMethod {
        id
        name
      }
      division {
        name
      }
      car {
        id
        name
        brand {
          id
          name
        }
      }
      carOption
      contractPeriod
      agreedMileage
    }
    customerGrade {
      id
      name
    }
    counselList {
      id
      counselAt
      customer {
        name
      }
      user {
        name
      }
      context
    }
  }
}
    `;

/**
 * __useGetCustomerQuery__
 *
 * To run a query within a React component, call `useGetCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerQuery({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useGetCustomerQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerQuery, GetCustomerQueryVariables> & ({ variables: GetCustomerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerQuery, GetCustomerQueryVariables>(GetCustomerDocument, options);
      }
export function useGetCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerQuery, GetCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerQuery, GetCustomerQueryVariables>(GetCustomerDocument, options);
        }
export function useGetCustomerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomerQuery, GetCustomerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomerQuery, GetCustomerQueryVariables>(GetCustomerDocument, options);
        }
export type GetCustomerQueryHookResult = ReturnType<typeof useGetCustomerQuery>;
export type GetCustomerLazyQueryHookResult = ReturnType<typeof useGetCustomerLazyQuery>;
export type GetCustomerSuspenseQueryHookResult = ReturnType<typeof useGetCustomerSuspenseQuery>;
export type GetCustomerQueryResult = Apollo.QueryResult<GetCustomerQuery, GetCustomerQueryVariables>;
export const GetCustomerGroupsDocument = gql`
    query GetCustomerGroups {
  getCustomerGroups {
    id
    name
    created_at
    updated_at
    deleted_at
  }
}
    `;

/**
 * __useGetCustomerGroupsQuery__
 *
 * To run a query within a React component, call `useGetCustomerGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomerGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomerGroupsQuery, GetCustomerGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerGroupsQuery, GetCustomerGroupsQueryVariables>(GetCustomerGroupsDocument, options);
      }
export function useGetCustomerGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerGroupsQuery, GetCustomerGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerGroupsQuery, GetCustomerGroupsQueryVariables>(GetCustomerGroupsDocument, options);
        }
export function useGetCustomerGroupsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomerGroupsQuery, GetCustomerGroupsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomerGroupsQuery, GetCustomerGroupsQueryVariables>(GetCustomerGroupsDocument, options);
        }
export type GetCustomerGroupsQueryHookResult = ReturnType<typeof useGetCustomerGroupsQuery>;
export type GetCustomerGroupsLazyQueryHookResult = ReturnType<typeof useGetCustomerGroupsLazyQuery>;
export type GetCustomerGroupsSuspenseQueryHookResult = ReturnType<typeof useGetCustomerGroupsSuspenseQuery>;
export type GetCustomerGroupsQueryResult = Apollo.QueryResult<GetCustomerGroupsQuery, GetCustomerGroupsQueryVariables>;
export const GetCustomerGroupDocument = gql`
    query GetCustomerGroup($customerGroupId: Float!) {
  getCustomerGroup(customerGroupId: $customerGroupId) {
    id
    name
    updated_at
    deleted_at
    created_at
  }
}
    `;

/**
 * __useGetCustomerGroupQuery__
 *
 * To run a query within a React component, call `useGetCustomerGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerGroupQuery({
 *   variables: {
 *      customerGroupId: // value for 'customerGroupId'
 *   },
 * });
 */
export function useGetCustomerGroupQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerGroupQuery, GetCustomerGroupQueryVariables> & ({ variables: GetCustomerGroupQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerGroupQuery, GetCustomerGroupQueryVariables>(GetCustomerGroupDocument, options);
      }
export function useGetCustomerGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerGroupQuery, GetCustomerGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerGroupQuery, GetCustomerGroupQueryVariables>(GetCustomerGroupDocument, options);
        }
export function useGetCustomerGroupSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomerGroupQuery, GetCustomerGroupQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomerGroupQuery, GetCustomerGroupQueryVariables>(GetCustomerGroupDocument, options);
        }
export type GetCustomerGroupQueryHookResult = ReturnType<typeof useGetCustomerGroupQuery>;
export type GetCustomerGroupLazyQueryHookResult = ReturnType<typeof useGetCustomerGroupLazyQuery>;
export type GetCustomerGroupSuspenseQueryHookResult = ReturnType<typeof useGetCustomerGroupSuspenseQuery>;
export type GetCustomerGroupQueryResult = Apollo.QueryResult<GetCustomerGroupQuery, GetCustomerGroupQueryVariables>;
export const GetCustomerGradesDocument = gql`
    query GetCustomerGrades {
  getCustomerGrades {
    id
    name
    created_at
    updated_at
    deleted_at
  }
}
    `;

/**
 * __useGetCustomerGradesQuery__
 *
 * To run a query within a React component, call `useGetCustomerGradesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerGradesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerGradesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomerGradesQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomerGradesQuery, GetCustomerGradesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerGradesQuery, GetCustomerGradesQueryVariables>(GetCustomerGradesDocument, options);
      }
export function useGetCustomerGradesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerGradesQuery, GetCustomerGradesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerGradesQuery, GetCustomerGradesQueryVariables>(GetCustomerGradesDocument, options);
        }
export function useGetCustomerGradesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomerGradesQuery, GetCustomerGradesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomerGradesQuery, GetCustomerGradesQueryVariables>(GetCustomerGradesDocument, options);
        }
export type GetCustomerGradesQueryHookResult = ReturnType<typeof useGetCustomerGradesQuery>;
export type GetCustomerGradesLazyQueryHookResult = ReturnType<typeof useGetCustomerGradesLazyQuery>;
export type GetCustomerGradesSuspenseQueryHookResult = ReturnType<typeof useGetCustomerGradesSuspenseQuery>;
export type GetCustomerGradesQueryResult = Apollo.QueryResult<GetCustomerGradesQuery, GetCustomerGradesQueryVariables>;
export const GetCustomerGradeDocument = gql`
    query GetCustomerGrade($customerGradeId: Float!) {
  getCustomerGrade(customerGradeId: $customerGradeId) {
    id
    name
    updated_at
    deleted_at
    created_at
  }
}
    `;

/**
 * __useGetCustomerGradeQuery__
 *
 * To run a query within a React component, call `useGetCustomerGradeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerGradeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerGradeQuery({
 *   variables: {
 *      customerGradeId: // value for 'customerGradeId'
 *   },
 * });
 */
export function useGetCustomerGradeQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerGradeQuery, GetCustomerGradeQueryVariables> & ({ variables: GetCustomerGradeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerGradeQuery, GetCustomerGradeQueryVariables>(GetCustomerGradeDocument, options);
      }
export function useGetCustomerGradeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerGradeQuery, GetCustomerGradeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerGradeQuery, GetCustomerGradeQueryVariables>(GetCustomerGradeDocument, options);
        }
export function useGetCustomerGradeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomerGradeQuery, GetCustomerGradeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomerGradeQuery, GetCustomerGradeQueryVariables>(GetCustomerGradeDocument, options);
        }
export type GetCustomerGradeQueryHookResult = ReturnType<typeof useGetCustomerGradeQuery>;
export type GetCustomerGradeLazyQueryHookResult = ReturnType<typeof useGetCustomerGradeLazyQuery>;
export type GetCustomerGradeSuspenseQueryHookResult = ReturnType<typeof useGetCustomerGradeSuspenseQuery>;
export type GetCustomerGradeQueryResult = Apollo.QueryResult<GetCustomerGradeQuery, GetCustomerGradeQueryVariables>;
export const GetCustomerStatusesDocument = gql`
    query GetCustomerStatuses {
  getCustomerStatuses {
    id
    status
  }
}
    `;

/**
 * __useGetCustomerStatusesQuery__
 *
 * To run a query within a React component, call `useGetCustomerStatusesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerStatusesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerStatusesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomerStatusesQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomerStatusesQuery, GetCustomerStatusesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerStatusesQuery, GetCustomerStatusesQueryVariables>(GetCustomerStatusesDocument, options);
      }
export function useGetCustomerStatusesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerStatusesQuery, GetCustomerStatusesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerStatusesQuery, GetCustomerStatusesQueryVariables>(GetCustomerStatusesDocument, options);
        }
export function useGetCustomerStatusesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomerStatusesQuery, GetCustomerStatusesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomerStatusesQuery, GetCustomerStatusesQueryVariables>(GetCustomerStatusesDocument, options);
        }
export type GetCustomerStatusesQueryHookResult = ReturnType<typeof useGetCustomerStatusesQuery>;
export type GetCustomerStatusesLazyQueryHookResult = ReturnType<typeof useGetCustomerStatusesLazyQuery>;
export type GetCustomerStatusesSuspenseQueryHookResult = ReturnType<typeof useGetCustomerStatusesSuspenseQuery>;
export type GetCustomerStatusesQueryResult = Apollo.QueryResult<GetCustomerStatusesQuery, GetCustomerStatusesQueryVariables>;
export const GetDeliveriesDocument = gql`
    query GetDeliveries($getDeliveriesDto: GetDeliveriesDto!) {
  getDeliveries(getDeliveriesDto: $getDeliveriesDto) {
    id
    contractAt
    shippingDate
    customer {
      id
      name
    }
    user {
      id
      name
    }
    financialCompany {
      id
      name
    }
    division {
      id
      name
    }
    car {
      id
      name
      brand {
        id
        name
      }
    }
    carPrice
    fee
    promotion
    shippingMethod {
      id
      name
    }
  }
}
    `;

/**
 * __useGetDeliveriesQuery__
 *
 * To run a query within a React component, call `useGetDeliveriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeliveriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeliveriesQuery({
 *   variables: {
 *      getDeliveriesDto: // value for 'getDeliveriesDto'
 *   },
 * });
 */
export function useGetDeliveriesQuery(baseOptions: Apollo.QueryHookOptions<GetDeliveriesQuery, GetDeliveriesQueryVariables> & ({ variables: GetDeliveriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeliveriesQuery, GetDeliveriesQueryVariables>(GetDeliveriesDocument, options);
      }
export function useGetDeliveriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeliveriesQuery, GetDeliveriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeliveriesQuery, GetDeliveriesQueryVariables>(GetDeliveriesDocument, options);
        }
export function useGetDeliveriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeliveriesQuery, GetDeliveriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeliveriesQuery, GetDeliveriesQueryVariables>(GetDeliveriesDocument, options);
        }
export type GetDeliveriesQueryHookResult = ReturnType<typeof useGetDeliveriesQuery>;
export type GetDeliveriesLazyQueryHookResult = ReturnType<typeof useGetDeliveriesLazyQuery>;
export type GetDeliveriesSuspenseQueryHookResult = ReturnType<typeof useGetDeliveriesSuspenseQuery>;
export type GetDeliveriesQueryResult = Apollo.QueryResult<GetDeliveriesQuery, GetDeliveriesQueryVariables>;
export const GetNoticesDocument = gql`
    query GetNotices {
  getNotices {
    id
    title
    body
    author {
      id
      name
    }
    created_at
    deleted_at
    updated_at
  }
}
    `;

/**
 * __useGetNoticesQuery__
 *
 * To run a query within a React component, call `useGetNoticesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoticesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoticesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNoticesQuery(baseOptions?: Apollo.QueryHookOptions<GetNoticesQuery, GetNoticesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoticesQuery, GetNoticesQueryVariables>(GetNoticesDocument, options);
      }
export function useGetNoticesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoticesQuery, GetNoticesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoticesQuery, GetNoticesQueryVariables>(GetNoticesDocument, options);
        }
export function useGetNoticesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetNoticesQuery, GetNoticesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNoticesQuery, GetNoticesQueryVariables>(GetNoticesDocument, options);
        }
export type GetNoticesQueryHookResult = ReturnType<typeof useGetNoticesQuery>;
export type GetNoticesLazyQueryHookResult = ReturnType<typeof useGetNoticesLazyQuery>;
export type GetNoticesSuspenseQueryHookResult = ReturnType<typeof useGetNoticesSuspenseQuery>;
export type GetNoticesQueryResult = Apollo.QueryResult<GetNoticesQuery, GetNoticesQueryVariables>;
export const GetNoticeDocument = gql`
    query GetNotice($noticeId: Float!) {
  getNotice(noticeId: $noticeId) {
    id
    title
    author {
      id
      name
    }
    body
    created_at
    deleted_at
    updated_at
  }
}
    `;

/**
 * __useGetNoticeQuery__
 *
 * To run a query within a React component, call `useGetNoticeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoticeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoticeQuery({
 *   variables: {
 *      noticeId: // value for 'noticeId'
 *   },
 * });
 */
export function useGetNoticeQuery(baseOptions: Apollo.QueryHookOptions<GetNoticeQuery, GetNoticeQueryVariables> & ({ variables: GetNoticeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoticeQuery, GetNoticeQueryVariables>(GetNoticeDocument, options);
      }
export function useGetNoticeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoticeQuery, GetNoticeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoticeQuery, GetNoticeQueryVariables>(GetNoticeDocument, options);
        }
export function useGetNoticeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetNoticeQuery, GetNoticeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNoticeQuery, GetNoticeQueryVariables>(GetNoticeDocument, options);
        }
export type GetNoticeQueryHookResult = ReturnType<typeof useGetNoticeQuery>;
export type GetNoticeLazyQueryHookResult = ReturnType<typeof useGetNoticeLazyQuery>;
export type GetNoticeSuspenseQueryHookResult = ReturnType<typeof useGetNoticeSuspenseQuery>;
export type GetNoticeQueryResult = Apollo.QueryResult<GetNoticeQuery, GetNoticeQueryVariables>;
export const GetLatestNoticeDocument = gql`
    query GetLatestNotice {
  getLatestNotice {
    id
    title
    body
    author {
      id
      name
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetLatestNoticeQuery__
 *
 * To run a query within a React component, call `useGetLatestNoticeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestNoticeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestNoticeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLatestNoticeQuery(baseOptions?: Apollo.QueryHookOptions<GetLatestNoticeQuery, GetLatestNoticeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLatestNoticeQuery, GetLatestNoticeQueryVariables>(GetLatestNoticeDocument, options);
      }
export function useGetLatestNoticeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLatestNoticeQuery, GetLatestNoticeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLatestNoticeQuery, GetLatestNoticeQueryVariables>(GetLatestNoticeDocument, options);
        }
export function useGetLatestNoticeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLatestNoticeQuery, GetLatestNoticeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLatestNoticeQuery, GetLatestNoticeQueryVariables>(GetLatestNoticeDocument, options);
        }
export type GetLatestNoticeQueryHookResult = ReturnType<typeof useGetLatestNoticeQuery>;
export type GetLatestNoticeLazyQueryHookResult = ReturnType<typeof useGetLatestNoticeLazyQuery>;
export type GetLatestNoticeSuspenseQueryHookResult = ReturnType<typeof useGetLatestNoticeSuspenseQuery>;
export type GetLatestNoticeQueryResult = Apollo.QueryResult<GetLatestNoticeQuery, GetLatestNoticeQueryVariables>;
export const GetNotificationsDocument = gql`
    query GetNotifications($offset: Float!, $limit: Float!) {
  getNotifications(offset: $offset, limit: $limit) {
    count
    isNewNotificationCount
    notifications {
      id
      title
      content
      isRead
      type
      created_at
    }
  }
}
    `;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables> & ({ variables: GetNotificationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export function useGetNotificationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsSuspenseQueryHookResult = ReturnType<typeof useGetNotificationsSuspenseQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const CheckNewNotificationsDocument = gql`
    query CheckNewNotifications {
  checkNewNotifications
}
    `;

/**
 * __useCheckNewNotificationsQuery__
 *
 * To run a query within a React component, call `useCheckNewNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckNewNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckNewNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckNewNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<CheckNewNotificationsQuery, CheckNewNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckNewNotificationsQuery, CheckNewNotificationsQueryVariables>(CheckNewNotificationsDocument, options);
      }
export function useCheckNewNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckNewNotificationsQuery, CheckNewNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckNewNotificationsQuery, CheckNewNotificationsQueryVariables>(CheckNewNotificationsDocument, options);
        }
export function useCheckNewNotificationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CheckNewNotificationsQuery, CheckNewNotificationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckNewNotificationsQuery, CheckNewNotificationsQueryVariables>(CheckNewNotificationsDocument, options);
        }
export type CheckNewNotificationsQueryHookResult = ReturnType<typeof useCheckNewNotificationsQuery>;
export type CheckNewNotificationsLazyQueryHookResult = ReturnType<typeof useCheckNewNotificationsLazyQuery>;
export type CheckNewNotificationsSuspenseQueryHookResult = ReturnType<typeof useCheckNewNotificationsSuspenseQuery>;
export type CheckNewNotificationsQueryResult = Apollo.QueryResult<CheckNewNotificationsQuery, CheckNewNotificationsQueryVariables>;
export const GetPayStubsDocument = gql`
    query GetPayStubs($getPayStubDto: GetPayStubDto!) {
  getPayStubs(getPayStubDto: $getPayStubDto) {
    id
    year
    month
    day
    user {
      id
      name
      team {
        id
        name
      }
      position {
        id
        name
      }
    }
    contracts {
      id
      shippingDate
      customer {
        id
        name
      }
      car {
        id
        name
        brand {
          id
          name
        }
      }
      carPrice
      fee
      promotion
      cashAssistance
      businessExpenses
      service1
      service2
      service3
      serviceBody1
      serviceBody2
      serviceBody3
      netIncome
      totalFee
    }
    totalFeeDelivery
    totalExpenditureDelivery
    totalNetIncomeDelivery
    totalAllowance
    etcIncentive
    incomeTax
    actualSalary
  }
}
    `;

/**
 * __useGetPayStubsQuery__
 *
 * To run a query within a React component, call `useGetPayStubsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPayStubsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPayStubsQuery({
 *   variables: {
 *      getPayStubDto: // value for 'getPayStubDto'
 *   },
 * });
 */
export function useGetPayStubsQuery(baseOptions: Apollo.QueryHookOptions<GetPayStubsQuery, GetPayStubsQueryVariables> & ({ variables: GetPayStubsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPayStubsQuery, GetPayStubsQueryVariables>(GetPayStubsDocument, options);
      }
export function useGetPayStubsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPayStubsQuery, GetPayStubsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPayStubsQuery, GetPayStubsQueryVariables>(GetPayStubsDocument, options);
        }
export function useGetPayStubsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPayStubsQuery, GetPayStubsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPayStubsQuery, GetPayStubsQueryVariables>(GetPayStubsDocument, options);
        }
export type GetPayStubsQueryHookResult = ReturnType<typeof useGetPayStubsQuery>;
export type GetPayStubsLazyQueryHookResult = ReturnType<typeof useGetPayStubsLazyQuery>;
export type GetPayStubsSuspenseQueryHookResult = ReturnType<typeof useGetPayStubsSuspenseQuery>;
export type GetPayStubsQueryResult = Apollo.QueryResult<GetPayStubsQuery, GetPayStubsQueryVariables>;
export const GetPayStubDocument = gql`
    query GetPayStub($payStubId: Float!) {
  getPayStub(payStubId: $payStubId) {
    id
    year
    month
    day
    user {
      id
      name
      team {
        id
        name
      }
      position {
        id
        name
      }
    }
    contracts {
      id
      shippingDate
      customer {
        id
        name
      }
      car {
        id
        name
        brand {
          id
          name
        }
      }
      carPrice
      fee
      promotion
      cashAssistance
      businessExpenses
      service1
      service2
      service3
      serviceBody1
      serviceBody2
      serviceBody3
      netIncome
      totalFee
    }
    totalFeeDelivery
    totalExpenditureDelivery
    totalNetIncomeDelivery
    totalAllowance
    etcIncentive
    incomeTax
    actualSalary
  }
}
    `;

/**
 * __useGetPayStubQuery__
 *
 * To run a query within a React component, call `useGetPayStubQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPayStubQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPayStubQuery({
 *   variables: {
 *      payStubId: // value for 'payStubId'
 *   },
 * });
 */
export function useGetPayStubQuery(baseOptions: Apollo.QueryHookOptions<GetPayStubQuery, GetPayStubQueryVariables> & ({ variables: GetPayStubQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPayStubQuery, GetPayStubQueryVariables>(GetPayStubDocument, options);
      }
export function useGetPayStubLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPayStubQuery, GetPayStubQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPayStubQuery, GetPayStubQueryVariables>(GetPayStubDocument, options);
        }
export function useGetPayStubSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPayStubQuery, GetPayStubQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPayStubQuery, GetPayStubQueryVariables>(GetPayStubDocument, options);
        }
export type GetPayStubQueryHookResult = ReturnType<typeof useGetPayStubQuery>;
export type GetPayStubLazyQueryHookResult = ReturnType<typeof useGetPayStubLazyQuery>;
export type GetPayStubSuspenseQueryHookResult = ReturnType<typeof useGetPayStubSuspenseQuery>;
export type GetPayStubQueryResult = Apollo.QueryResult<GetPayStubQuery, GetPayStubQueryVariables>;
export const CheckSettleContractDocument = gql`
    query CheckSettleContract($checkSettleContractDto: CheckSettleContractDto!) {
  checkSettleContract(checkSettleContractDto: $checkSettleContractDto)
}
    `;

/**
 * __useCheckSettleContractQuery__
 *
 * To run a query within a React component, call `useCheckSettleContractQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckSettleContractQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckSettleContractQuery({
 *   variables: {
 *      checkSettleContractDto: // value for 'checkSettleContractDto'
 *   },
 * });
 */
export function useCheckSettleContractQuery(baseOptions: Apollo.QueryHookOptions<CheckSettleContractQuery, CheckSettleContractQueryVariables> & ({ variables: CheckSettleContractQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckSettleContractQuery, CheckSettleContractQueryVariables>(CheckSettleContractDocument, options);
      }
export function useCheckSettleContractLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckSettleContractQuery, CheckSettleContractQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckSettleContractQuery, CheckSettleContractQueryVariables>(CheckSettleContractDocument, options);
        }
export function useCheckSettleContractSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CheckSettleContractQuery, CheckSettleContractQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckSettleContractQuery, CheckSettleContractQueryVariables>(CheckSettleContractDocument, options);
        }
export type CheckSettleContractQueryHookResult = ReturnType<typeof useCheckSettleContractQuery>;
export type CheckSettleContractLazyQueryHookResult = ReturnType<typeof useCheckSettleContractLazyQuery>;
export type CheckSettleContractSuspenseQueryHookResult = ReturnType<typeof useCheckSettleContractSuspenseQuery>;
export type CheckSettleContractQueryResult = Apollo.QueryResult<CheckSettleContractQuery, CheckSettleContractQueryVariables>;
export const GetUserIncentiveDeliveryTaxesDocument = gql`
    query GetUserIncentiveDeliveryTaxes($getUserIncentiveDeliveryTaxesDto: GetUserIncentiveDeliveryTaxesDto!) {
  getUserIncentiveDeliveryTaxes(
    getUserIncentiveDeliveryTaxesDto: $getUserIncentiveDeliveryTaxesDto
  ) {
    year
    month
    totalIncentiveDelivery
    additionalIncentive {
      id
      additionalIncentive
    }
    etcIncentive
    bonus {
      id
      bonus
    }
    totalBusinessExpenses
    user {
      id
      name
    }
  }
}
    `;

/**
 * __useGetUserIncentiveDeliveryTaxesQuery__
 *
 * To run a query within a React component, call `useGetUserIncentiveDeliveryTaxesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserIncentiveDeliveryTaxesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserIncentiveDeliveryTaxesQuery({
 *   variables: {
 *      getUserIncentiveDeliveryTaxesDto: // value for 'getUserIncentiveDeliveryTaxesDto'
 *   },
 * });
 */
export function useGetUserIncentiveDeliveryTaxesQuery(baseOptions: Apollo.QueryHookOptions<GetUserIncentiveDeliveryTaxesQuery, GetUserIncentiveDeliveryTaxesQueryVariables> & ({ variables: GetUserIncentiveDeliveryTaxesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserIncentiveDeliveryTaxesQuery, GetUserIncentiveDeliveryTaxesQueryVariables>(GetUserIncentiveDeliveryTaxesDocument, options);
      }
export function useGetUserIncentiveDeliveryTaxesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserIncentiveDeliveryTaxesQuery, GetUserIncentiveDeliveryTaxesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserIncentiveDeliveryTaxesQuery, GetUserIncentiveDeliveryTaxesQueryVariables>(GetUserIncentiveDeliveryTaxesDocument, options);
        }
export function useGetUserIncentiveDeliveryTaxesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserIncentiveDeliveryTaxesQuery, GetUserIncentiveDeliveryTaxesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserIncentiveDeliveryTaxesQuery, GetUserIncentiveDeliveryTaxesQueryVariables>(GetUserIncentiveDeliveryTaxesDocument, options);
        }
export type GetUserIncentiveDeliveryTaxesQueryHookResult = ReturnType<typeof useGetUserIncentiveDeliveryTaxesQuery>;
export type GetUserIncentiveDeliveryTaxesLazyQueryHookResult = ReturnType<typeof useGetUserIncentiveDeliveryTaxesLazyQuery>;
export type GetUserIncentiveDeliveryTaxesSuspenseQueryHookResult = ReturnType<typeof useGetUserIncentiveDeliveryTaxesSuspenseQuery>;
export type GetUserIncentiveDeliveryTaxesQueryResult = Apollo.QueryResult<GetUserIncentiveDeliveryTaxesQuery, GetUserIncentiveDeliveryTaxesQueryVariables>;
export const GetCustomerTaxesDocument = gql`
    query GetCustomerTaxes($getCustomerTaxesDto: GetCustomerTaxesDto!) {
  getCustomerTaxes(getCustomerTaxesDto: $getCustomerTaxesDto) {
    cashAssistance
    id
    incomeEarner
    user {
      id
      name
    }
  }
}
    `;

/**
 * __useGetCustomerTaxesQuery__
 *
 * To run a query within a React component, call `useGetCustomerTaxesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerTaxesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerTaxesQuery({
 *   variables: {
 *      getCustomerTaxesDto: // value for 'getCustomerTaxesDto'
 *   },
 * });
 */
export function useGetCustomerTaxesQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerTaxesQuery, GetCustomerTaxesQueryVariables> & ({ variables: GetCustomerTaxesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerTaxesQuery, GetCustomerTaxesQueryVariables>(GetCustomerTaxesDocument, options);
      }
export function useGetCustomerTaxesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerTaxesQuery, GetCustomerTaxesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerTaxesQuery, GetCustomerTaxesQueryVariables>(GetCustomerTaxesDocument, options);
        }
export function useGetCustomerTaxesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomerTaxesQuery, GetCustomerTaxesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomerTaxesQuery, GetCustomerTaxesQueryVariables>(GetCustomerTaxesDocument, options);
        }
export type GetCustomerTaxesQueryHookResult = ReturnType<typeof useGetCustomerTaxesQuery>;
export type GetCustomerTaxesLazyQueryHookResult = ReturnType<typeof useGetCustomerTaxesLazyQuery>;
export type GetCustomerTaxesSuspenseQueryHookResult = ReturnType<typeof useGetCustomerTaxesSuspenseQuery>;
export type GetCustomerTaxesQueryResult = Apollo.QueryResult<GetCustomerTaxesQuery, GetCustomerTaxesQueryVariables>;
export const GetTeamsDocument = gql`
    query GetTeams {
  getTeams {
    ...TeamWithSubTeams
    parentTeam {
      ...TeamFields
    }
  }
}
    ${TeamWithSubTeamsFragmentDoc}
${TeamFieldsFragmentDoc}`;

/**
 * __useGetTeamsQuery__
 *
 * To run a query within a React component, call `useGetTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamsQuery(baseOptions?: Apollo.QueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
      }
export function useGetTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
        }
export function useGetTeamsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
        }
export type GetTeamsQueryHookResult = ReturnType<typeof useGetTeamsQuery>;
export type GetTeamsLazyQueryHookResult = ReturnType<typeof useGetTeamsLazyQuery>;
export type GetTeamsSuspenseQueryHookResult = ReturnType<typeof useGetTeamsSuspenseQuery>;
export type GetTeamsQueryResult = Apollo.QueryResult<GetTeamsQuery, GetTeamsQueryVariables>;
export const GetTeamDocument = gql`
    query GetTeam($teamId: Float!) {
  getTeam(teamId: $teamId) {
    ...TeamWithSubTeams
    parentTeam {
      ...TeamFields
    }
  }
}
    ${TeamWithSubTeamsFragmentDoc}
${TeamFieldsFragmentDoc}`;

/**
 * __useGetTeamQuery__
 *
 * To run a query within a React component, call `useGetTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetTeamQuery(baseOptions: Apollo.QueryHookOptions<GetTeamQuery, GetTeamQueryVariables> & ({ variables: GetTeamQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
      }
export function useGetTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
        }
export function useGetTeamSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
        }
export type GetTeamQueryHookResult = ReturnType<typeof useGetTeamQuery>;
export type GetTeamLazyQueryHookResult = ReturnType<typeof useGetTeamLazyQuery>;
export type GetTeamSuspenseQueryHookResult = ReturnType<typeof useGetTeamSuspenseQuery>;
export type GetTeamQueryResult = Apollo.QueryResult<GetTeamQuery, GetTeamQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    name
    email
    password
    hireDate
    birthDate
    phone
    salesPhone
    fax
    englishName
    salaryAccount
    bank
    position {
      id
      name
    }
    role {
      id
      name
    }
    customers {
      id
      name
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: Float!) {
  getUser(userId: $userId) {
    id
    name
    email
    password
    hireDate
    birthDate
    phone
    salesPhone
    fax
    englishName
    salaryAccount
    bank
    position {
      id
      name
    }
    role {
      id
      name
    }
    team {
      id
      name
    }
    customers {
      id
      name
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetPositionsDocument = gql`
    query GetPositions {
  getPositions {
    id
    name
    created_at
    updated_at
    deleted_at
  }
}
    `;

/**
 * __useGetPositionsQuery__
 *
 * To run a query within a React component, call `useGetPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPositionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPositionsQuery(baseOptions?: Apollo.QueryHookOptions<GetPositionsQuery, GetPositionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPositionsQuery, GetPositionsQueryVariables>(GetPositionsDocument, options);
      }
export function useGetPositionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPositionsQuery, GetPositionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPositionsQuery, GetPositionsQueryVariables>(GetPositionsDocument, options);
        }
export function useGetPositionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPositionsQuery, GetPositionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPositionsQuery, GetPositionsQueryVariables>(GetPositionsDocument, options);
        }
export type GetPositionsQueryHookResult = ReturnType<typeof useGetPositionsQuery>;
export type GetPositionsLazyQueryHookResult = ReturnType<typeof useGetPositionsLazyQuery>;
export type GetPositionsSuspenseQueryHookResult = ReturnType<typeof useGetPositionsSuspenseQuery>;
export type GetPositionsQueryResult = Apollo.QueryResult<GetPositionsQuery, GetPositionsQueryVariables>;
export const GetTopFiveDeliveryUsersByMonthDocument = gql`
    query GetTopFiveDeliveryUsersByMonth($getTopFiveDeliveryUsersByMonthDto: GetDashBoardByUsersDto!) {
  getTopFiveDeliveryUsersByMonth(
    getTopFiveDeliveryUsersByMonthDto: $getTopFiveDeliveryUsersByMonthDto
  ) {
    user {
      id
      name
    }
    year
    month
    totalCountDelivery
    totalFeeDelivery
  }
}
    `;

/**
 * __useGetTopFiveDeliveryUsersByMonthQuery__
 *
 * To run a query within a React component, call `useGetTopFiveDeliveryUsersByMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopFiveDeliveryUsersByMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopFiveDeliveryUsersByMonthQuery({
 *   variables: {
 *      getTopFiveDeliveryUsersByMonthDto: // value for 'getTopFiveDeliveryUsersByMonthDto'
 *   },
 * });
 */
export function useGetTopFiveDeliveryUsersByMonthQuery(baseOptions: Apollo.QueryHookOptions<GetTopFiveDeliveryUsersByMonthQuery, GetTopFiveDeliveryUsersByMonthQueryVariables> & ({ variables: GetTopFiveDeliveryUsersByMonthQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopFiveDeliveryUsersByMonthQuery, GetTopFiveDeliveryUsersByMonthQueryVariables>(GetTopFiveDeliveryUsersByMonthDocument, options);
      }
export function useGetTopFiveDeliveryUsersByMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopFiveDeliveryUsersByMonthQuery, GetTopFiveDeliveryUsersByMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopFiveDeliveryUsersByMonthQuery, GetTopFiveDeliveryUsersByMonthQueryVariables>(GetTopFiveDeliveryUsersByMonthDocument, options);
        }
export function useGetTopFiveDeliveryUsersByMonthSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTopFiveDeliveryUsersByMonthQuery, GetTopFiveDeliveryUsersByMonthQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTopFiveDeliveryUsersByMonthQuery, GetTopFiveDeliveryUsersByMonthQueryVariables>(GetTopFiveDeliveryUsersByMonthDocument, options);
        }
export type GetTopFiveDeliveryUsersByMonthQueryHookResult = ReturnType<typeof useGetTopFiveDeliveryUsersByMonthQuery>;
export type GetTopFiveDeliveryUsersByMonthLazyQueryHookResult = ReturnType<typeof useGetTopFiveDeliveryUsersByMonthLazyQuery>;
export type GetTopFiveDeliveryUsersByMonthSuspenseQueryHookResult = ReturnType<typeof useGetTopFiveDeliveryUsersByMonthSuspenseQuery>;
export type GetTopFiveDeliveryUsersByMonthQueryResult = Apollo.QueryResult<GetTopFiveDeliveryUsersByMonthQuery, GetTopFiveDeliveryUsersByMonthQueryVariables>;
export const GetTopFiveTotalFeeDeliveryUsersByMonthDocument = gql`
    query GetTopFiveTotalFeeDeliveryUsersByMonth($getTopFiveTotalFeeDeliveryUsersByMonthDto: GetDashBoardByUsersDto!) {
  getTopFiveTotalFeeDeliveryUsersByMonth(
    getTopFiveTotalFeeDeliveryUsersByMonthDto: $getTopFiveTotalFeeDeliveryUsersByMonthDto
  ) {
    user {
      id
      name
    }
    year
    month
    totalFeeDelivery
    totalCountDelivery
  }
}
    `;

/**
 * __useGetTopFiveTotalFeeDeliveryUsersByMonthQuery__
 *
 * To run a query within a React component, call `useGetTopFiveTotalFeeDeliveryUsersByMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopFiveTotalFeeDeliveryUsersByMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopFiveTotalFeeDeliveryUsersByMonthQuery({
 *   variables: {
 *      getTopFiveTotalFeeDeliveryUsersByMonthDto: // value for 'getTopFiveTotalFeeDeliveryUsersByMonthDto'
 *   },
 * });
 */
export function useGetTopFiveTotalFeeDeliveryUsersByMonthQuery(baseOptions: Apollo.QueryHookOptions<GetTopFiveTotalFeeDeliveryUsersByMonthQuery, GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables> & ({ variables: GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopFiveTotalFeeDeliveryUsersByMonthQuery, GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables>(GetTopFiveTotalFeeDeliveryUsersByMonthDocument, options);
      }
export function useGetTopFiveTotalFeeDeliveryUsersByMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopFiveTotalFeeDeliveryUsersByMonthQuery, GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopFiveTotalFeeDeliveryUsersByMonthQuery, GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables>(GetTopFiveTotalFeeDeliveryUsersByMonthDocument, options);
        }
export function useGetTopFiveTotalFeeDeliveryUsersByMonthSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTopFiveTotalFeeDeliveryUsersByMonthQuery, GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTopFiveTotalFeeDeliveryUsersByMonthQuery, GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables>(GetTopFiveTotalFeeDeliveryUsersByMonthDocument, options);
        }
export type GetTopFiveTotalFeeDeliveryUsersByMonthQueryHookResult = ReturnType<typeof useGetTopFiveTotalFeeDeliveryUsersByMonthQuery>;
export type GetTopFiveTotalFeeDeliveryUsersByMonthLazyQueryHookResult = ReturnType<typeof useGetTopFiveTotalFeeDeliveryUsersByMonthLazyQuery>;
export type GetTopFiveTotalFeeDeliveryUsersByMonthSuspenseQueryHookResult = ReturnType<typeof useGetTopFiveTotalFeeDeliveryUsersByMonthSuspenseQuery>;
export type GetTopFiveTotalFeeDeliveryUsersByMonthQueryResult = Apollo.QueryResult<GetTopFiveTotalFeeDeliveryUsersByMonthQuery, GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables>;