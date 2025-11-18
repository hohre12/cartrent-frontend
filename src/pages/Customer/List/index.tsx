import styled from 'styled-components';
import CustomerListTable from './components/table';
import { SvgIcon } from '@/components/common/SvgIcon';
import { textS14Regular } from '@/styles/typography';
import { useCallback, useEffect, useState } from 'react';
import SearchBox from '@/components/searchBox/SearchBox';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  customerFiltersState,
  selectedCustomerIdxState,
  selectedCustomerSortState,
  selectedCustomerState,
} from '@/state/customer';
import Button from '@/components/button/Button';
import RegistModal from '../components/registModal';
import WatchOptionModal from '../components/watchOptionModal';
import { useGetCustomers } from '@/services/customer';
import { userState } from '@/state/auth';
import { PermissionType } from '@/types/graphql';
import { useNavigationType } from 'react-router-dom';
import { useConfirm } from '@/hooks/useConfirm';
import FloatingMenu from '../components/floatingMenu';
import useClickOutside from '@/hooks/useClickOutside';
import Sort from '../components/sort';
import { FilterContent } from '@/styles/common';
import Pagination from '@/components/pagination/Pagination';
import Loading from '@/components/loading/Loading';

const CustomerList = () => {
  const navigationType = useNavigationType();
  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCustomerIdx, setSelectedCustomerIdx] = useRecoilState(
    selectedCustomerIdxState,
  );
  const resetSelectedCustomerIdx = useResetRecoilState(
    selectedCustomerIdxState,
  );
  const selectedCustomer = useRecoilValue(selectedCustomerState);
  const resetCustomer = useResetRecoilState(selectedCustomerState);
  const [isOpenWatchOptionModal, setIsOpenWatchOptionModal] =
    useState<boolean>(false);
  const [isOpenRegistModal, setIsOpenRegistModal] = useState<boolean>(false);

  const filters = useRecoilValue(customerFiltersState);
  const resetFilters = useResetRecoilState(customerFiltersState);
  const user = useRecoilValue(userState);
  const { showConfirm, hideConfirm } = useConfirm();

  // pagination
  const [length, setLength] = useState<number>(50);
  const [offset, setOffset] = useState<number>(0);

  // sort
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const selectedSort = useRecoilValue(selectedCustomerSortState);
  const sortRef = useClickOutside(() => setIsSortOpen(false));
  const resetSort = useResetRecoilState(selectedCustomerSortState);

  const { data, loading, error } = useGetCustomers({
    search: searchText ? searchText : null,
    customerGroupId:
      filters?.groups?.length > 0 ? filters.groups.map((it) => it.value) : null,
    customerGradeId:
      filters?.grades?.length > 0 ? filters.grades.map((it) => it.value) : null,
    userId:
      filters?.users?.length > 0 ? filters.users.map((it) => it.value) : null,
    sortKey: selectedSort.sortKey,
    sortDirection: selectedSort.sortDirection,
    limit: length,
    offset,
  });

  const handleSearchTextDelete = useCallback(() => {
    setSearchText('');
  }, [setSearchText]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value);
    },
    [setSearchText],
  );
  useEffect(() => {
    if (
      // !selectedCustomerIdx &&
      data?.getCustomers &&
      data.getCustomers.data.length > 0
    )
      setSelectedCustomerIdx(data.getCustomers.data[0].id);
  }, [data, setSelectedCustomerIdx]);

  useEffect(() => {
    resetFilters();
    resetCustomer();
    resetSort();
  }, [resetCustomer, resetFilters, resetSort]);

  useEffect(() => {
    setOffset(0);
  }, [filters]);

  if (loading) return <Loading />;
  if (error) return <div className="error">{String(error)}</div>;

  return (
    <>
      <ListWrapper>
        <SearchBoxWrapper>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <SearchBox
              value={text}
              placeholder="검색"
              recentKey="customerRecent"
              onTextChange={(text) => setText(text)}
              onRemoveClick={handleSearchTextDelete}
              onKeyDown={handleSearch}
              onRecentClick={handleSearch}
              keyword="고객명, 연락처, 상태, 메모, 차종, 구분, 고객등급, 고객유형, 비고"
            ></SearchBox>
            <FilterContent ref={sortRef}>
              <Button
                variant="white"
                configuration="stroke"
                style={{ border: '1px solid #ddd' }}
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                {`정렬: ${selectedSort.sortKey === 'memo' ? '메모' : selectedSort.sortKey === 'created_at' ? '등록일' : '최근상담일시'}(${selectedSort.sortDirection === 'ASC' ? '오름차순' : '내림차순'})`}
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
          </div>

          <FunctionWrapper>
            {user?.role.name === PermissionType.Admin && (
              <>
                <Button
                  onClick={() =>
                    setIsOpenWatchOptionModal(!isOpenWatchOptionModal)
                  }
                >
                  <SvgIcon iconName="icon-eye-show" />
                  <p>보기옵션</p>
                </Button>
                <Button
                  onClick={() => setIsOpenRegistModal(!isOpenRegistModal)}
                >
                  <SvgIcon iconName="icon-plus" />
                  <p>고객등록</p>
                </Button>
              </>
            )}
          </FunctionWrapper>
        </SearchBoxWrapper>
        <TableWrapper>
          <div className="TableControlWrapper">
            <div>
              <SvgIcon
                iconName="icon-arrow_up_s"
                style={{
                  width: '20px',
                }}
              />
              <p>고객목록</p>
            </div>
          </div>
          {data && (
            <>
              <CustomerListTable
                data={data.getCustomers.data}
              ></CustomerListTable>
              {selectedCustomer.length > 0 && <FloatingMenu></FloatingMenu>}
            </>
          )}
        </TableWrapper>
        {data && data.getCustomers?.data.length > 0 && (
          <Pagination
            totalCount={data.getCustomers.totalCount}
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
      {isOpenRegistModal && (
        <RegistModal
          isOpen={isOpenRegistModal}
          onCancel={() => setIsOpenRegistModal(false)}
          onConfirm={() => {
            setIsOpenRegistModal(false);
            showConfirm({
              isOpen: true,
              title: '고객 추가 등록',
              content: `고객을 추가로 등록하시겠습니까?`,
              cancelText: '닫기',
              confirmText: '등록',
              confirmVariant: 'primaryInfo',
              onClose: hideConfirm,
              onCancel: hideConfirm,
              onConfirm: () => {
                hideConfirm();
                setIsOpenRegistModal(true);
              },
            });
          }}
        ></RegistModal>
      )}
    </>
  );
};

export default CustomerList;

export const ListWrapper = styled.div`
  background: #fff;
  width: calc(100% - 595px);
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 5px;
`;

export const SearchBoxWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const TableWrapper = styled.div`
  border: 1px solid #ddd;
  height: 100%;
  width: 100%;
  overflow: auto;
  border-radius: 5px;
  .TableControlWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    height: 40px;
    & > div {
      display: flex;
      align-items: center;
      p {
        ${textS14Regular}
      }
    }
  }
`;

const FunctionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
`;
