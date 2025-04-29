import styled from 'styled-components';
import { SvgIcon } from '@/components/common/SvgIcon';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import Button from '@/components/button/Button';
import Pagination from '@/components/pagination/Pagination';
import { useCallback, useEffect, useState } from 'react';
import WatchOptionModal from './components/watchOptionModal';
import SearchBox from '@/components/searchBox/SearchBox';
import useClickOutside from '@/hooks/useClickOutside';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { contractFiltersState, selectedContractState } from '@/state/contract';
import { TFilterList } from '@/types/common';
import { Circle, FilterContent, FilterWrapper } from '@/styles/common';
import FloatingMenu from './components/floatingMenu';
import ContractListTable from './components/table';
import { useGetContracts } from '@/services/contract';
import { useNavigate, useNavigationType } from 'react-router-dom';
import FilterUser from './components/filter/user';
import FilterShippingMethod from './components/filter/shippingMethod';
import Input from '@/components/input/Input';
import { userState } from '@/state/auth';
import { PermissionType } from '@/types/graphql';

const ContractList = () => {
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const selectedContract = useRecoilValue(selectedContractState);
  const [isOpenWatchOptionModal, setIsOpenWatchOptionModal] =
    useState<boolean>(false);
  const my = useRecoilValue(userState);

  // filters
  const [filters, setFilters] = useRecoilState(contractFiltersState);
  const resetFilters = useResetRecoilState(contractFiltersState);

  const { data, loading, error } = useGetContracts({
    search: searchText ? searchText : null,
    shippingMethodIds:
      filters?.shippingMethods?.length > 0
        ? filters.shippingMethods.map((it) => it.value)
        : null,
    userId:
      filters?.users?.length > 0 ? filters.users.map((it) => it.value) : null,
    startContractAtYearMonth: filters?.startContractAtYearMonth
      ? filters.startContractAtYearMonth
      : null,
    endContractAtYearMonth: filters?.endContractAtYearMonth
      ? filters.endContractAtYearMonth
      : null,
  });

  // filter - shippingMethod
  const [isFilterShippingMethodOpen, setIsFilterShippingMethodOpen] =
    useState<boolean>(false);
  const filterShippingMethodRef = useClickOutside(() =>
    setIsFilterShippingMethodOpen(false),
  );

  // filter - user
  const [isFilterUserOpen, setIsFilterUserOpen] = useState<boolean>(false);
  const filterUserRef = useClickOutside(() => setIsFilterUserOpen(false));

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
    },
    [filters, setFilters, setIsFilterUserOpen],
  );

  const handleSetFilterShippingMethod = useCallback(
    (selectedFilters: TFilterList<number>[]) => {
      setFilters({ ...filters, shippingMethods: selectedFilters });
      setIsFilterShippingMethodOpen(false);
    },
    [filters, setFilters, setIsFilterShippingMethodOpen],
  );

  useEffect(() => {
    if (navigationType !== 'POP') {
      resetFilters();
    }
  }, [navigationType, resetFilters]);

  return (
    <>
      <ListWrapper>
        <Header>
          <h2>계약목록</h2>
          <ControlWrapper>
            <SearchBoxWrapper>
              <SearchBox
                value={text}
                placeholder="검색"
                recentKey="contractRecent"
                onTextChange={(text) => setText(text)}
                onRemoveClick={handleSearchTextDelete}
                onKeyDown={handleSearch}
                onRecentClick={handleSearch}
                keyword="고객명, 담당자, 연락처, 차종, 금융사"
              ></SearchBox>
              <FilterWrapper>
                <FilterContent ref={filterShippingMethodRef}>
                  <Button
                    variant="white"
                    configuration="stroke"
                    style={{
                      borderColor:
                        filters.shippingMethods.length > 0 ? '#333' : '#ddd',
                    }}
                    onClick={() =>
                      setIsFilterShippingMethodOpen(!isFilterShippingMethodOpen)
                    }
                  >
                    출고방식
                    {filters.shippingMethods.length > 0 && (
                      <Circle>{filters.shippingMethods.length}</Circle>
                    )}
                    <SvgIcon
                      iconName="icon-arrowButton"
                      style={{ fill: '#333' }}
                    />
                  </Button>
                  {isFilterShippingMethodOpen && (
                    <FilterShippingMethod
                      handleApply={handleSetFilterShippingMethod}
                    ></FilterShippingMethod>
                  )}
                </FilterContent>
                {my?.role?.name === PermissionType.Admin && (
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
                      <FilterUser
                        handleApply={handleSetFilterUser}
                      ></FilterUser>
                    )}
                  </FilterContent>
                )}
                <div className="verticalLine"></div>
                <DateWrapper>
                  {!filters?.startContractAtYearMonth && (
                    <label htmlFor="startDate">계약일(언제부터)</label>
                  )}
                  <Input
                    type="date"
                    inputId="startDate"
                    style={{ cursor: 'pointer' }}
                    value={filters?.startContractAtYearMonth ?? ''}
                    onTextChange={(text) =>
                      setFilters((prevState) => ({
                        ...prevState,
                        startContractAtYearMonth: text,
                      }))
                    }
                  />
                </DateWrapper>
                ~
                <DateWrapper>
                  {!filters?.endContractAtYearMonth && (
                    <label htmlFor="endDate">계약일(언제까지)</label>
                  )}
                  <Input
                    type="date"
                    inputId="endDate"
                    style={{ cursor: 'pointer' }}
                    value={filters?.endContractAtYearMonth ?? ''}
                    onTextChange={(text) =>
                      setFilters((prevState) => ({
                        ...prevState,
                        endContractAtYearMonth: text,
                      }))
                    }
                  />
                </DateWrapper>
              </FilterWrapper>
            </SearchBoxWrapper>
            <FunctionWrapper>
              {my?.role?.name === PermissionType.Admin && (
                <>
                  <Button
                    onClick={() =>
                      setIsOpenWatchOptionModal(!isOpenWatchOptionModal)
                    }
                  >
                    <SvgIcon iconName="icon-eye-show" />
                    <p>보기옵션</p>
                  </Button>
                </>
              )}
              <Button onClick={() => navigate('regist')}>
                <SvgIcon iconName="icon-plus" />
                <p>계약등록</p>
              </Button>
            </FunctionWrapper>
          </ControlWrapper>
        </Header>
        <ListContent>
          {data && data.getContracts?.length > 0 ? (
            <>
              <ContractListTable data={data.getContracts}></ContractListTable>
              {selectedContract.length > 0 && <FloatingMenu></FloatingMenu>}
            </>
          ) : searchText ? (
            <div className="noList">
              <h2>검색결과 없음</h2>
              <p>고객명, 담당자, 연락처, 차종, 금융사로 검색해주세요.</p>
            </div>
          ) : (
            <div className="noList">
              <h2>계약 없음</h2>
              <p>등록된 계약이 없습니다.</p>
            </div>
          )}
        </ListContent>
        {/* {dummyContractList.length > 0 && (
          <Pagination
            totalCount={dummyContractList.length}
            length={dummyContractList.length}
          ></Pagination>
        )} */}
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

export default ContractList;

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
