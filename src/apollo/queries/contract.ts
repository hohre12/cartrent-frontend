import { gql } from '@apollo/client';

/* Query */
/**
 * 계약 목록 쿼리
 * - 계약 목록 호출
 */
export const GET_CONTRACTS_QUERY = gql`
  query GetContracts($getContractsDto: GetContractsDto!) {
    getContracts(getContractsDto: $getContractsDto) {
      id
      status
      user {
        name
      }
      city {
        name
      }
      contractAt
      shippingDate
      customer {
        name
        phone
      }
      carName
      carOption
      innerColor
      outerColor
      carPrice
      financialCompany {
        name
      }
      feeRate
      fee
      promotion
      monthlyPayment
      shippingMethod {
        name
      }
      isOrdering
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
        name
      }
    }
  }
`;

/**
 * 계약 상세 쿼리
 * - 계약 상세 호출
 */
export const GET_CONTRACT_QUERY = gql`
  query GetContract($contractId: Float!) {
    getContract(contractId: $contractId) {
      id
      status
      user {
        name
      }
      city {
        name
      }
      contractAt
      shippingDate
      customer {
        name
        phone
      }
      carName
      carOption
      innerColor
      outerColor
      carPrice
      financialCompany {
        name
      }
      feeRate
      fee
      promotion
      monthlyPayment
      shippingMethod {
        name
      }
      isOrdering
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
        name
      }
    }
  }
`;

export const GET_FINANCIAL_COMPANIES_QUERY = gql`
  query GetFinancialCompanies {
    getFinancialCompanies {
      id
      name
    }
  }
`;

export const GET_DIVISIONS_QUERY = gql`
  query GetDivisions {
    getDivisions {
      id
      name
    }
  }
`;

export const GET_SHIPPING_METHODS_QUERY = gql`
  query GetShippingMethods {
    getShippingMethods {
      id
      name
    }
  }
`;
/* Query */
