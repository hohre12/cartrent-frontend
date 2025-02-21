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
import { TFilterList } from '@/types/common';
import { Circle, FilterContent, FilterWrapper } from '@/styles/common';
import RegistModal from './components/registModal';
import AdjustmentListTable from './components/table';
import { adjustmentFiltersState } from '@/state/adjustment';
import { useGetAdjustments } from '@/services/adjustment';
import FilterUser from './components/filter/user';
import { userState } from '@/state/auth';
import { PermissionType } from '@/types/graphql';
import { useNavigationType } from 'react-router-dom';

const AdjustmentList = () => {
  const navigationType = useNavigationType();
  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [isOpenWatchOptionModal, setIsOpenWatchOptionModal] =
    useState<boolean>(false);
  //   const [isOpenRegistModal, setIsOpenRegistModal] = useState<boolean>(false);
  const user = useRecoilValue(userState);

  // filters
  const [filters, setFilters] = useRecoilState(adjustmentFiltersState);
  const resetFilters = useResetRecoilState(adjustmentFiltersState);

  const { data, loading, error } = useGetAdjustments({
    search: searchText ? searchText : null,
    userId:
      filters?.users?.length > 0 ? filters.users.map((it) => it.value) : null,
  });

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

  useEffect(() => {
    if (navigationType !== 'POP') {
      resetFilters();
    }
  }, [navigationType, resetFilters]);

  return (
    <>
      <ListWrapper>
        <Header>
          <h2>정산목록</h2>
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
                keyword="담당자"
              ></SearchBox>
              <FilterWrapper>
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
            </FunctionWrapper>
          </ControlWrapper>
        </Header>
        <ListContent>
          {data && data.getAdjustments?.length > 0 ? (
            <>
              <AdjustmentListTable
                data={data.getAdjustments}
              ></AdjustmentListTable>
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
        {/* {dummyCustomerList.length > 0 && (
          <Pagination
            totalCount={dummyAdjustmentList.length}
            length={dummyAdjustmentList.length}
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

export default AdjustmentList;

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
