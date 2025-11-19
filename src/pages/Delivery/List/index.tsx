import styled from 'styled-components';
import { SvgIcon } from '@/components/common/SvgIcon';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import Button from '@/components/button/Button';
import { useCallback, useEffect, useState } from 'react';
import WatchOptionModal from './components/watchOptionModal';
import SearchBox from '@/components/searchBox/SearchBox';
import useClickOutside from '@/hooks/useClickOutside';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { TFilterList } from '@/types/common';
import { Circle, FilterContent, FilterWrapper } from '@/styles/common';
import ContractListTable from './components/table';
import { useNavigate, useNavigationType } from 'react-router-dom';
import FilterUser from './components/filter/user';
import Input from '@/components/input/Input';
import { userState } from '@/state/auth';
import { deliveryFiltersState } from '@/state/delivery';
import { useGetDeliveries } from '@/services/delivery';
import FilterFinancialCompany from './components/filter/financialCompany';
import FilterDivision from './components/filter/division';
import Pagination from '@/components/pagination/Pagination';
import Loading from '@/components/loading/Loading';

const DeliveryList = () => {
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [isOpenWatchOptionModal, setIsOpenWatchOptionModal] =
    useState<boolean>(false);
  const my = useRecoilValue(userState);

  // pagination
  const [length, setLength] = useState<number>(50);
  const [offset, setOffset] = useState<number>(0);

  // filters
  const [filters, setFilters] = useRecoilState(deliveryFiltersState);
  const resetFilters = useResetRecoilState(deliveryFiltersState);

  const { data, loading, error } = useGetDeliveries({
    search: searchText ? searchText : null,
    userIds:
      filters?.users?.length > 0 ? filters.users.map((it) => it.value) : null,
    financialCompanyIds:
      filters?.financialCompanies?.length > 0
        ? filters.financialCompanies.map((it) => it.value)
        : null,
    divisionIds:
      filters?.divisions?.length > 0
        ? filters.divisions.map((it) => it.value)
        : null,
    startDeliveryAtYearMonth: filters?.startDeliveryAtYearMonth
      ? filters.startDeliveryAtYearMonth
      : null,
    endDeliveryAtYearMonth: filters?.endDeliveryAtYearMonth
      ? filters.endDeliveryAtYearMonth
      : null,
    limit: length,
    offset,
  });

  // filter - user
  const [isFilterUserOpen, setIsFilterUserOpen] = useState<boolean>(false);
  const filterUserRef = useClickOutside(() => setIsFilterUserOpen(false));

  // filter - financialCompany
  const [isFilterFinancialCompanyOpen, setIsFilterFinancialCompanyOpen] =
    useState<boolean>(false);
  const filterFinancialCompanyRef = useClickOutside(() =>
    setIsFilterFinancialCompanyOpen(false),
  );

  // filter - division
  const [isFilterDivisionOpen, setIsFilterDivisionOpen] =
    useState<boolean>(false);
  const filterDivisionRef = useClickOutside(() =>
    setIsFilterDivisionOpen(false),
  );

  const handleSearchTextDelete = useCallback(() => {
    setSearchText('');
  }, [setSearchText]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value);
    },
    [setSearchText],
  );

  const handleSetFilterUser = useCallback(
    (selectedFilters: TFilterList<number>[]) => {
      setFilters({ ...filters, users: selectedFilters });
      setIsFilterUserOpen(false);
      setOffset(0);
    },
    [filters, setFilters, setIsFilterUserOpen],
  );

  const handleSetFilterFinancialCompany = useCallback(
    (selectedFilters: TFilterList<number>[]) => {
      setFilters({ ...filters, financialCompanies: selectedFilters });
      setIsFilterFinancialCompanyOpen(false);
      setOffset(0);
    },
    [filters, setFilters, setIsFilterFinancialCompanyOpen],
  );

  const handleSetFilterDivision = useCallback(
    (selectedFilters: TFilterList<number>[]) => {
      setFilters({ ...filters, divisions: selectedFilters });
      setIsFilterDivisionOpen(false);
      setOffset(0);
    },
    [filters, setFilters, setIsFilterDivisionOpen],
  );

  useEffect(() => {
    if (navigationType !== 'POP') {
      resetFilters();
    }
  }, [navigationType, resetFilters]);

  // searchText 변경 시 offset 초기화
  useEffect(() => {
    setOffset(0);
  }, [searchText]);

  if (loading) return <Loading />;
  if (error) return <div className="error">{String(error)}</div>;

  return (
    <>
      <ListWrapper>
        <Header>
          <h2>출고목록</h2>
          <ControlWrapper>
            <SearchBoxWrapper>
              <SearchBox
                value={text}
                placeholder="검색"
                recentKey="deliveryRecent"
                onTextChange={(text) => setText(text)}
                onRemoveClick={handleSearchTextDelete}
                onKeyDown={handleSearch}
                onRecentClick={handleSearch}
                keyword="담당자"
              ></SearchBox>
              <FilterWrapper>
                <FilterContent ref={filterFinancialCompanyRef}>
                  <Button
                    variant="white"
                    configuration="stroke"
                    style={{
                      borderColor:
                        filters.financialCompanies.length > 0 ? '#333' : '#ddd',
                    }}
                    onClick={() =>
                      setIsFilterFinancialCompanyOpen(
                        !isFilterFinancialCompanyOpen,
                      )
                    }
                  >
                    금융사
                    {filters.financialCompanies.length > 0 && (
                      <Circle>{filters.financialCompanies.length}</Circle>
                    )}
                    <SvgIcon
                      iconName="icon-arrowButton"
                      style={{ fill: '#333' }}
                    />
                  </Button>
                  {isFilterFinancialCompanyOpen && (
                    <FilterFinancialCompany
                      handleApply={handleSetFilterFinancialCompany}
                    ></FilterFinancialCompany>
                  )}
                </FilterContent>
                <FilterContent ref={filterDivisionRef}>
                  <Button
                    variant="white"
                    configuration="stroke"
                    style={{
                      borderColor:
                        filters.divisions.length > 0 ? '#333' : '#ddd',
                    }}
                    onClick={() =>
                      setIsFilterDivisionOpen(!isFilterDivisionOpen)
                    }
                  >
                    구분
                    {filters.divisions.length > 0 && (
                      <Circle>{filters.divisions.length}</Circle>
                    )}
                    <SvgIcon
                      iconName="icon-arrowButton"
                      style={{ fill: '#333' }}
                    />
                  </Button>
                  {isFilterDivisionOpen && (
                    <FilterDivision
                      handleApply={handleSetFilterDivision}
                    ></FilterDivision>
                  )}
                </FilterContent>
                <FilterContent ref={filterUserRef}>
                  <Button
                    variant="white"
                    configuration="stroke"
                    style={{
                      borderColor: filters.users.length > 0 ? '#333' : '#ddd',
                    }}
                    onClick={() => setIsFilterUserOpen(!isFilterUserOpen)}
                  >
                    담당자
                    {filters.users.length > 0 && (
                      <Circle>{filters.users.length}</Circle>
                    )}
                    <SvgIcon
                      iconName="icon-arrowButton"
                      style={{ fill: '#333' }}
                    />
                  </Button>
                  {isFilterUserOpen && (
                    <FilterUser handleApply={handleSetFilterUser}></FilterUser>
                  )}
                </FilterContent>
                <div className="verticalLine"></div>
                <DateWrapper>
                  {!filters?.startDeliveryAtYearMonth && (
                    <label htmlFor="startDate">출고일(언제부터)</label>
                  )}
                  <Input
                    type="date"
                    inputId="startDate"
                    style={{ cursor: 'pointer' }}
                    value={filters?.startDeliveryAtYearMonth ?? ''}
                    onTextChange={(text) => {
                      setFilters((prevState) => ({
                        ...prevState,
                        startDeliveryAtYearMonth: text,
                      }));
                      setOffset(0);
                    }}
                  />
                </DateWrapper>
                ~
                <DateWrapper>
                  {!filters?.endDeliveryAtYearMonth && (
                    <label htmlFor="endDate">출고일(언제까지)</label>
                  )}
                  <Input
                    type="date"
                    inputId="endDate"
                    style={{ cursor: 'pointer' }}
                    value={filters?.endDeliveryAtYearMonth ?? ''}
                    onTextChange={(text) => {
                      setFilters((prevState) => ({
                        ...prevState,
                        endDeliveryAtYearMonth: text,
                      }));
                      setOffset(0);
                    }}
                  />
                </DateWrapper>
              </FilterWrapper>
            </SearchBoxWrapper>
            <FunctionWrapper>
              <Button
                onClick={() =>
                  setIsOpenWatchOptionModal(!isOpenWatchOptionModal)
                }
              >
                <SvgIcon iconName="icon-eye-show" />
                <p>보기옵션</p>
              </Button>
            </FunctionWrapper>
          </ControlWrapper>
        </Header>
        <ListContent>
          {data && data.getDeliveries?.data.length > 0 ? (
            <>
              <ContractListTable
                data={data.getDeliveries.data}
              ></ContractListTable>
            </>
          ) : searchText ? (
            <div className="noList">
              <h2>검색결과 없음</h2>
              <p>담당자명으로 검색해주세요.</p>
            </div>
          ) : (
            <div className="noList">
              <h2>출고 없음</h2>
              <p>등록된 출고가 없습니다.</p>
            </div>
          )}
        </ListContent>
        {data && data.getDeliveries?.data.length > 0 && (
          <Pagination
            totalCount={data.getDeliveries.totalCount}
            length={length}
            currentPage={offset + 1}
            getPage={(offset, length) => {
              setOffset(offset);
              setLength(length);
            }}
          ></Pagination>
        )}
      </ListWrapper>
      {isOpenWatchOptionModal && (
        <WatchOptionModal
          isOpen={isOpenWatchOptionModal}
          onCancel={() => setIsOpenWatchOptionModal(false)}
          onConfirm={() => {
            setIsOpenWatchOptionModal(false);
          }}
        />
      )}
    </>
  );
};

export default DeliveryList;

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
  padding: 17px 20px;
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

export const ListContent = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  position: relative;
  .noList {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    h2 {
      ${titleXxl24Bold}
    }
    p {
      ${textS14Regular}
    }
  }
`;

export const DateWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  border: 1px solid #ddd;
  & > label {
    z-index: 1;
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: #111;
    pointer-events: none;
    transition: 0.2s ease-out;
    background: #fff;
    width: 75%;
    height: 100%;
    padding: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .inputBox {
    border: none;
  }
`;
