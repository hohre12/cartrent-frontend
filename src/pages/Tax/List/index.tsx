import { useGetBrands } from '@/services/brand';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import styled from 'styled-components';
import TaxListTable from './components/table';
import SecondTaxListTable from './components/secondTable';
import {
  useGetCustomerTaxes,
  useGetUserIncentiveDeliveryTaxes,
} from '@/services/tax';
import { taxFiltersState } from '@/state/tax';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { FilterContent, FilterWrapper } from '@/styles/common';
import Select from '@/components/select/Select';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigationType } from 'react-router-dom';

const TaxList = () => {
  const navigationType = useNavigationType();
  const currentYear = moment().format('YYYY');
  const currentMonth = moment().format('M');
  const [months, setMonths] = useState<string[]>([]);

  // filters
  const [filters, setFilters] = useRecoilState(taxFiltersState);
  const resetFilters = useResetRecoilState(taxFiltersState);

  const { data: userIncentiveDeliveryTaxes } = useGetUserIncentiveDeliveryTaxes(
    { year: filters.year, month: filters.month },
  );
  const { data: customerTaxes } = useGetCustomerTaxes({
    year: filters.year,
    month: filters.month,
  });
  useEffect(() => {
    if (navigationType !== 'POP') {
      resetFilters();
    }
  }, [navigationType, resetFilters]);
  useEffect(() => {
    const allMonths = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
    if (filters.year === currentYear) {
      setMonths(allMonths.slice(0, Number(currentMonth)).reverse());
    } else {
      setMonths(allMonths.reverse());
    }
  }, [filters, setMonths, currentYear, currentMonth]);
  return (
    <>
      <ListWrapper>
        <Header>
          <h2>세금계산</h2>
          <ControlWrapper>
            <FilterWrapper>
              <FilterContent>
                <Select
                  size="medium"
                  value={`${filters.year}년`}
                  onChange={(value) => {
                    setFilters({
                      ...filters,
                      year: value.value.replace('년', ''),
                    });
                  }}
                  list={[
                    `${currentYear}년`,
                    `${Number(currentYear) - 1}년`,
                    `${Number(currentYear) - 2}년`,
                  ]}
                  placeholder="세무확인 년도를 선택해주세요"
                />
              </FilterContent>
              <FilterContent>
                <Select
                  size="medium"
                  value={`${filters.month}월`}
                  onChange={(value) => {
                    setFilters({
                      ...filters,
                      month: value.value.replace('월', ''),
                    });
                  }}
                  list={months}
                  placeholder="세무확인 달을 선택해주세요"
                />
              </FilterContent>
            </FilterWrapper>
          </ControlWrapper>
        </Header>
        <TempTableHeader>
          <h2>인건비 내역서</h2>
          <h2>추가 인건비 내역서</h2>
        </TempTableHeader>
        <ListContent>
          <>
            {userIncentiveDeliveryTaxes &&
            userIncentiveDeliveryTaxes.getUserIncentiveDeliveryTaxes?.length >
              0 ? (
              <TaxListTable
                data={userIncentiveDeliveryTaxes.getUserIncentiveDeliveryTaxes}
              ></TaxListTable>
            ) : (
              <div className="noList">
                <h2>인건비내역서 목록 없음</h2>
                <p>생성된 인건비내역서 목록이 없습니다.</p>
              </div>
            )}
            {customerTaxes && customerTaxes.getCustomerTaxes?.length > 0 ? (
              <SecondTaxListTable
                data={customerTaxes.getCustomerTaxes}
              ></SecondTaxListTable>
            ) : (
              <div className="noList">
                <h2>추가 인건비내역서 목록 없음</h2>
                <p>생성된 추가 인건비내역서 목록이 없습니다.</p>
              </div>
            )}
          </>
        </ListContent>
      </ListWrapper>
    </>
  );
};

export default TaxList;

const ListWrapper = styled.div`
  background: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17.5px 20px;
  border-bottom: 1px solid #eee;
  & > h2 {
    text-align: left;
    font-weight: 700;
    font-size: 24px;
  }
`;
const ControlWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    p {
      line-height: 15px;
      font-weight: 700;
    }
  }
`;
const SearchBoxWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const FunctionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const TempTableHeader = styled.div`
  height: 60px;
  display: flex;
  & > h2 {
    width: 50%;
    ${titleXxl24Bold}
  }
`;
export const ListContent = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  position: relative;
  display: flex;
  gap: 20px;
  .noList {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
    h2 {
      ${titleXxl24Bold}
    }
    p {
      ${textS14Regular}
    }
  }
`;
