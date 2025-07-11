import { gql } from '@apollo/client';

export const GET_AGENCY_CONTRACTS_QUERY = gql`
  query GetAgencyContracts($getAgencyContractsDto: GetAgencyContractsDto!) {
    getAgencyContracts(getAgencyContractsDto: $getAgencyContractsDto) {
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
      }
      totalCount
    }
  }
`;
