import styled from 'styled-components';
import { SvgIcon } from '@/components/common/SvgIcon';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import Button from '@/components/button/Button';
import Pagination from '@/components/pagination/Pagination';
import { useCallback, useEffect, useState } from 'react';
import WatchOptionModal from './components/watchOptionModal';
import SearchBox from '@/components/searchBox/SearchBox';
import FilterGroup from './components/filter/group';
import useClickOutside from '@/hooks/useClickOutside';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { customerFiltersState } from '@/state/customer';
import { TFilterList } from '@/types/common';
import { Circle, FilterContent, FilterWrapper } from '@/styles/common';
import RegistModal from './components/registModal';
import CounselListTable from './components/table';
import {
  counselFiltersState,
  selectedCounselSortState,
  selectedCounselState,
} from '@/state/counsel';
import FloatingMenu from './components/floatingMenu';
import { useGetCounsels } from '@/services/counsel';
import FilterStatus from './components/filter/status';
import FilterUser from './components/filter/user';
import { userState } from '@/state/auth';
import { PermissionType, PositionType } from '@/types/graphql';
import { useNavigationType } from 'react-router-dom';
import Sort from './components/sort';
import Loading from '@/components/loading/Loading';

const CounselList = () => {
  const navigationType = useNavigationType();
  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const selectedCounsel = useRecoilValue(selectedCounselState);
  const resetCounsel = useResetRecoilState(selectedCounselState);
  const [isOpenWatchOptionModal, setIsOpenWatchOptionModal] =
    useState<boolean>(false);
  //   const [isOpenRegistModal, setIsOpenRegistModal] = useState<boolean>(false);
  const user = useRecoilValue(userState);

  // pagination
  const [length, setLength] = useState<number>(50);
  const [offset, setOffset] = useState<number>(0);

  // filters
  const [filters, setFilters] = useRecoilState(counselFiltersState);
  const resetFilters = useResetRecoilState(counselFiltersState);

  // sort
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const selectedSort = useRecoilValue(selectedCounselSortState);
  const sortRef = useClickOutside(() => setIsSortOpen(false));
  const resetSort = useResetRecoilState(selectedCounselSortState);

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
    sortKey: selectedSort.sortKey,
    sortDirection: selectedSort.sortDirection,
    limit: length,
    offset,
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
      setOffset(0);
    },
    [filters, setFilters, setIsFilterGroupOpen],
  );

  const handleSetFilterStatus = useCallback(
    (selectedFilters: TFilterList<number>[]) => {
      setFilters({ ...filters, statuses: selectedFilters });
      setIsFilterStatusOpen(false);
      setOffset(0);
    },
    [filters, setFilters, setIsFilterStatusOpen],
  );

  const handleSetFilterUser = useCallback(
    (selectedFilters: TFilterList<number>[]) => {
      setFilters({ ...filters, users: selectedFilters });
      setIsFilterUserOpen(false);
      setOffset(0);
    },
    [filters, setFilters, setIsFilterUserOpen],
  );

  useEffect(() => {
    if (navigationType !== 'POP') {
      resetFilters();
      resetCounsel();
      resetSort();
    }
  }, [navigationType, resetCounsel, resetFilters, resetSort]);

  // searchText 변경 시 offset 초기화
  useEffect(() => {
    setOffset(0);
  }, [searchText]);

  // sort 변경 시 offset 초기화
  useEffect(() => {
    setOffset(0);
  }, [selectedSort]);

  if (loading) return <Loading />;
  if (error) return <div className="error">{String(error)}</div>;

  return (
    <>
      <ListWrapper>
        <Header>
          <h2>상담목록</h2>
          <ControlWrapper>
            <SearchBoxWrapper>
              <SearchBox
                value={text}
                placeholder="검색"
                recentKey="counselRecent"
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
                {(user?.role.name === PermissionType.Admin ||
                  user?.position.name === PositionType.TeamLeader ||
                  user?.position.name === PositionType.GeneralManager) && (
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
                <FilterContent ref={sortRef}>
                  <Button
                    variant="white"
                    configuration="stroke"
                    style={{ border: '1px solid #ddd' }}
                    onClick={() => setIsSortOpen(!isSortOpen)}
                  >
                    {`정렬: 상담일시(${selectedSort.sortDirection === 'ASC' ? '과거순' : '최신순'})`}
                    <SvgIcon
                      iconName="icon-arrowButton"
                      style={{ fill: '#333' }}
                    />
                  </Button>
                  {isSortOpen && (
                    <div>
                      <Sort></Sort>
                    </div>
                  )}
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
          {data && data.getCounsels?.data.length > 0 ? (
            <>
              <CounselListTable data={data.getCounsels.data}></CounselListTable>
              {selectedCounsel.length > 0 && <FloatingMenu></FloatingMenu>}
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
        {data && data.getCounsels?.data.length > 0 && (
          <Pagination
            totalCount={data.getCounsels.totalCount}
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
      {/* {isOpenRegistModal && (
        <RegistModal
          isOpen={isOpenRegistModal}
          onCancel={() => setIsOpenRegistModal(false)}
          onConfirm={() => setIsOpenRegistModal(false)}
        ></RegistModal>
      )} */}
    </>
  );
};

export default CounselList;

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
