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
import FilterUser from './components/filter/user';
import { userState } from '@/state/auth';
import { PermissionType } from '@/types/graphql';
import { useNavigationType } from 'react-router-dom';
import PayStubListTable from './components/table';
import { payStubFiltersState } from '@/state/payStub';
import { useGetPayStubs } from '@/services/payStub';
import FilterPosition from './components/filter/position';
import Select from '@/components/select/Select';
import moment from 'moment';

const PayStubList = () => {
  const navigationType = useNavigationType();
  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [isOpenWatchOptionModal, setIsOpenWatchOptionModal] =
    useState<boolean>(false);
  const user = useRecoilValue(userState);
  const currentYear = moment().format('YYYY');
  const currentMonth = moment().format('MM');
  const [months, setMonths] = useState<string[]>([]);

  // filters
  const [filters, setFilters] = useRecoilState(payStubFiltersState);
  const resetFilters = useResetRecoilState(payStubFiltersState);

  const { data, loading, error } = useGetPayStubs({
    search: searchText ? searchText : null,
    year: filters.year,
    month: filters.month,
    userIds:
      filters?.userIds?.length > 0
        ? filters.userIds.map((it) => it.value)
        : null,
    positionIds:
      filters?.positionIds?.length > 0
        ? filters.positionIds.map((it) => it.value)
        : null,
  });

  // filter - user
  const [isFilterUserOpen, setIsFilterUserOpen] = useState<boolean>(false);
  const filterUserRef = useClickOutside(() => setIsFilterUserOpen(false));

  // filter - position
  const [isFilterPositionOpen, setIsFilterPositionOpen] =
    useState<boolean>(false);
  const filterPositionRef = useClickOutside(() =>
    setIsFilterPositionOpen(false),
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
      setFilters({ ...filters, userIds: selectedFilters });
      setIsFilterUserOpen(false);
    },
    [filters, setFilters, setIsFilterUserOpen],
  );

  const handleSetFilterPosition = useCallback(
    (selectedFilters: TFilterList<number>[]) => {
      setFilters({ ...filters, positionIds: selectedFilters });
      setIsFilterPositionOpen(false);
    },
    [filters, setFilters, setIsFilterPositionOpen],
  );

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
          <h2>급여명세서 목록</h2>
          <ControlWrapper>
            <SearchBoxWrapper>
              <SearchBox
                value={text}
                placeholder="검색"
                recentKey="payStubRecent"
                onTextChange={(text) => setText(text)}
                onRemoveClick={handleSearchTextDelete}
                onKeyDown={handleSearch}
                onRecentClick={handleSearch}
                keyword="담당자, 소속, 직책"
              ></SearchBox>
              <FilterWrapper>
                {user?.role.name === PermissionType.Admin && (
                  <>
                    <FilterContent ref={filterUserRef}>
                      <Button
                        variant="white"
                        configuration="stroke"
                        style={{
                          borderColor:
                            filters.userIds.length > 0 ? '#333' : '#ddd',
                        }}
                        onClick={() => setIsFilterUserOpen(!isFilterUserOpen)}
                      >
                        담당자
                        {filters.userIds.length > 0 && (
                          <Circle>{filters.userIds.length}</Circle>
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
                    <FilterContent ref={filterPositionRef}>
                      <Button
                        variant="white"
                        configuration="stroke"
                        style={{
                          borderColor:
                            filters.positionIds.length > 0 ? '#333' : '#ddd',
                        }}
                        onClick={() =>
                          setIsFilterPositionOpen(!isFilterPositionOpen)
                        }
                      >
                        직책
                        {filters.positionIds.length > 0 && (
                          <Circle>{filters.positionIds.length}</Circle>
                        )}
                        <SvgIcon
                          iconName="icon-arrowButton"
                          style={{ fill: '#333' }}
                        />
                      </Button>
                      {isFilterPositionOpen && (
                        <FilterPosition
                          handleApply={handleSetFilterPosition}
                        ></FilterPosition>
                      )}
                    </FilterContent>
                  </>
                )}
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
                    placeholder="급여명세서 년도를 선택해주세요"
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
                    placeholder="급여명세서 년도를 선택해주세요"
                  />
                </FilterContent>
              </FilterWrapper>
            </SearchBoxWrapper>
            <FunctionWrapper>
              {user?.role.name === PermissionType.Admin && (
                <Button
                  onClick={() =>
                    setIsOpenWatchOptionModal(!isOpenWatchOptionModal)
                  }
                >
                  <SvgIcon iconName="icon-eye-show" />
                  <p>보기옵션</p>
                </Button>
              )}
            </FunctionWrapper>
          </ControlWrapper>
        </Header>
        <ListContent>
          {data && data.getPayStubs?.length > 0 ? (
            <>
              <PayStubListTable data={data.getPayStubs}></PayStubListTable>
            </>
          ) : searchText ? (
            <div className="noList">
              <h2>검색결과 없음</h2>
              <p>담당자, 소속, 직책으로 검색해주세요.</p>
            </div>
          ) : (
            <div className="noList">
              <h2>급여명세서 없음</h2>
              <p>해당 년월에 등록된 급여명세서가 없습니다.</p>
            </div>
          )}
        </ListContent>
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

export default PayStubList;

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
