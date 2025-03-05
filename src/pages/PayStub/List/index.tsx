import styled from 'styled-components';
import { SvgIcon } from '@/components/common/SvgIcon';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import Button from '@/components/button/Button';
import { useCallback, useEffect, useState } from 'react';
import WatchOptionModal from './components/watchOptionModal';
import SearchBox from '@/components/searchBox/SearchBox';
import FilterGroup from './components/filter/group';
import useClickOutside from '@/hooks/useClickOutside';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { TFilterList } from '@/types/common';
import { Circle, FilterContent, FilterWrapper } from '@/styles/common';
import { counselFiltersState, selectedCounselState } from '@/state/counsel';
import { useGetCounsels } from '@/services/counsel';
import FilterStatus from './components/filter/status';
import FilterUser from './components/filter/user';
import { userState } from '@/state/auth';
import { PermissionType } from '@/types/graphql';
import { useNavigationType } from 'react-router-dom';
import PayStubListTable from './components/table';

const PayStubList = () => {
  const navigationType = useNavigationType();
  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const selectedCounsel = useRecoilValue(selectedCounselState);
  const [isOpenWatchOptionModal, setIsOpenWatchOptionModal] =
    useState<boolean>(false);
  //   const [isOpenRegistModal, setIsOpenRegistModal] = useState<boolean>(false);
  const user = useRecoilValue(userState);

  // filters
  const [filters, setFilters] = useRecoilState(counselFiltersState);
  const resetFilters = useResetRecoilState(counselFiltersState);

  const { data, loading, error } = useGetCounsels({
    search: searchText ? searchText : null,
    customerStatusId:
      filters?.statuses?.length > 0
        ? filters.statuses.map((it) => it.value)
        : null,
    customerGroupId:
      filters?.groups?.length > 0 ? filters.groups.map((it) => it.value) : null,
    userId:
      filters?.users?.length > 0 ? filters.users.map((it) => it.value) : null,
  });

  // filter - group
  const [isFilterGroupOpen, setIsFilterGroupOpen] = useState<boolean>(false);
  const filterGroupRef = useClickOutside(() => setIsFilterGroupOpen(false));

  // filter - status
  const [isFilterStatusOpen, setIsFilterStatusOpen] = useState<boolean>(false);
  const filterStatusRef = useClickOutside(() => setIsFilterStatusOpen(false));

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

  const handleSetFilterGroup = useCallback(
    (selectedFilters: TFilterList<number>[]) => {
      setFilters({ ...filters, groups: selectedFilters });
      setIsFilterGroupOpen(false);
    },
    [filters, setFilters, setIsFilterGroupOpen],
  );

  const handleSetFilterStatus = useCallback(
    (selectedFilters: TFilterList<number>[]) => {
      setFilters({ ...filters, statuses: selectedFilters });
      setIsFilterStatusOpen(false);
    },
    [filters, setFilters, setIsFilterStatusOpen],
  );

  const handleSetFilterUser = useCallback(
    (selectedFilters: TFilterList<number>[]) => {
      setFilters({ ...filters, users: selectedFilters });
      setIsFilterUserOpen(false);
    },
    [filters, setFilters, setIsFilterUserOpen],
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
          <h2>급여명세서 목록</h2>
          <ControlWrapper>
            <SearchBoxWrapper>
              <SearchBox
                value={text}
                placeholder="검색"
                recentKey="customerRecent"
                onTextChange={(text) => setText(text)}
                onRemoveClick={handleSearchTextDelete}
                onKeyDown={handleSearch}
                onRecentClick={handleSearch}
                keyword="고객명, 상담자, 연락처, 차종, 상담내용, 고객등급, 비고"
              ></SearchBox>
              <FilterWrapper>
                <FilterContent ref={filterStatusRef}>
                  <Button
                    variant="white"
                    configuration="stroke"
                    style={{
                      borderColor:
                        filters.statuses.length > 0 ? '#333' : '#ddd',
                    }}
                    onClick={() => setIsFilterStatusOpen(!isFilterStatusOpen)}
                  >
                    고객상태
                    {filters.statuses.length > 0 && (
                      <Circle>{filters.statuses.length}</Circle>
                    )}
                    <SvgIcon
                      iconName="icon-arrowButton"
                      style={{ fill: '#333' }}
                    />
                  </Button>
                  {isFilterStatusOpen && (
                    <FilterStatus
                      handleApply={handleSetFilterStatus}
                    ></FilterStatus>
                  )}
                </FilterContent>
                <FilterContent ref={filterGroupRef}>
                  <Button
                    variant="white"
                    configuration="stroke"
                    style={{
                      borderColor: filters.groups.length > 0 ? '#333' : '#ddd',
                    }}
                    onClick={() => setIsFilterGroupOpen(!isFilterGroupOpen)}
                  >
                    고객그룹
                    {filters.groups.length > 0 && (
                      <Circle>{filters.groups.length}</Circle>
                    )}
                    <SvgIcon
                      iconName="icon-arrowButton"
                      style={{ fill: '#333' }}
                    />
                  </Button>
                  {isFilterGroupOpen && (
                    <FilterGroup
                      handleApply={handleSetFilterGroup}
                    ></FilterGroup>
                  )}
                </FilterContent>
                {user?.role.name === PermissionType.Admin && (
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
              {/* <Button onClick={() => setIsOpenRegistModal(!isOpenRegistModal)}>
                <SvgIcon iconName="icon-plus" />
                <p>상담등록</p>
              </Button> */}
            </FunctionWrapper>
          </ControlWrapper>
        </Header>
        <ListContent>
          {data && data.getCounsels?.length > 0 ? (
            <>
              <PayStubListTable data={data.getCounsels}></PayStubListTable>
            </>
          ) : searchText ? (
            <div className="noList">
              <h2>검색결과 없음</h2>
              <p>상담내용, 상담자로 검색해주세요.</p>
            </div>
          ) : (
            <div className="noList">
              <h2>상담 없음</h2>
              <p>등록된 상담이 없습니다.</p>
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
  padding: 15px 20px;
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
