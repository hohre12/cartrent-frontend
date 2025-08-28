import { gql } from '@apollo/client';

/* Query */
/**
 * 계약 목록 쿼리
 * - 계약 목록 호출
 */
export const GET_CONTRACTS_QUERY = gql`
  query GetContracts($getContractsDto: GetContractsDto!) {
    getContracts(getContractsDto: $getContractsDto) {
      data {
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
        agencyDiscount
        cashAssistance2
        supportDetails2
      }
      totalCount
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
      agencyDiscount
      cashAssistance2
      supportDetails2
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
