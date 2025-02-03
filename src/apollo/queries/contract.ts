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
      context
      status
      totalPrice
      innerColor
      outerColor
      extraPrice
      bank
      carName
      carPrice
      carOption
      product
      financialCompany
      surtax
      promotion
      monthlyPayment
      shippingMethod
      branch
      branchFee
      collateralType
      collateralRate
      contractPeriod
      agreedMileage
      insuranceAge
      object
      service1
      service2
      service3
      serviceBody1
      serviceBody2
      serviceBody3
      incomeEarner
      cashAssistance
      supportDetails
      totalExpenditure
      totalFee
      netIncome
      contractType
      isVATSupport
      isOrdering
      interChangeFee
      feeRate
      fee
      city_id
      user_id
      customer_id
      contract_at
      shippingDate
      created_at
      updated_at
      deleted_at
      user {
        id
        email
        name
        password
        created_at
        updated_at
        deleted_at
      }
      customer {
        id
        name
      }
      city {
        id
        name
      }
      supportAmounts {
        id
        amount
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
      context
      status
      totalPrice
      innerColor
      outerColor
      extraPrice
      bank
      carName
      carPrice
      carOption
      product
      financialCompany
      surtax
      promotion
      monthlyPayment
      shippingMethod
      branch
      branchFee
      collateralType
      collateralRate
      contractPeriod
      agreedMileage
      insuranceAge
      object
      service1
      service2
      service3
      serviceBody1
      serviceBody2
      serviceBody3
      incomeEarner
      cashAssistance
      supportDetails
      totalExpenditure
      totalFee
      netIncome
      contractType
      isVATSupport
      isOrdering
      interChangeFee
      feeRate
      fee
      city_id
      user_id
      customer_id
      contract_at
      shippingDate
      created_at
      updated_at
      deleted_at
      user {
        id
        name
      }
      customer {
        id
        name
      }
      city {
        id
        name
      }
      supportAmounts {
        id
        amount
      }
    }
  }
`;
/* Query */
