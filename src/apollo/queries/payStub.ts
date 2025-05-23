import { gql } from '@apollo/client';

/* Query */
export const GET_PAYSTUBS_QUERY = gql`
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

export const GET_PAYSTUB_QUERY = gql`
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

export const CHECK_SETTLE_CONTRACT_QUERY = gql`
  query CheckSettleContract($checkSettleContractDto: CheckSettleContractDto!) {
    checkSettleContract(checkSettleContractDto: $checkSettleContractDto)
  }
`;
/* Query */
