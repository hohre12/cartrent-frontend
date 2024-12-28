import styled from 'styled-components';
import CustomerListTable from './components/table';
import Input from '@/components/input/Input';
import { SvgIcon } from '@/components/common/SvgIcon';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import Button from '@/components/button/Button';
import { dummyCustomerList } from '@/dummy/customer';
import Pagination from '@/components/pagination/Pagination';
import { useCallback, useState } from 'react';
import WatchOptionModal from './components/watchOptionModal';
import SearchBox from '@/components/searchBox/SearchBox';
import FilterGroup from './components/filter/group';
import useClickOutside from '@/hooks/useClickOutside';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { customerFiltersState } from '@/state/customer';
import { TFilterList } from '@/types/common';
import { Circle, FilterContent } from '@/styles/common';

const CustomerList = () => {
  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [isOpenWatchOptionModal, setIsOpenWatchOptionModal] =
    useState<boolean>(false);

  // filters
  const [filters, setFilters] = useRecoilState(customerFiltersState);
  const resetFilters = useResetRecoilState(customerFiltersState);

  // filter - group
  const [isFilterGroupOpen, setIsFilterGroupOpen] = useState<boolean>(false);
  const filterGroupRef = useClickOutside(() => setIsFilterGroupOpen(false));

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
      setFilters({ ...filters, group: selectedFilters });
      setIsFilterGroupOpen(false);
    },
    [filters, setFilters, setIsFilterGroupOpen],
  );

  return (
    <>
      <ListWrapper>
        <Header>
          <h2>고객목록</h2>
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
                keyword="고객명"
              ></SearchBox>
              <FilterContent ref={filterGroupRef}>
                <Button
                  variant="white"
                  configuration="stroke"
                  style={{
                    borderColor: filters.group.length > 0 ? '#333' : '#ddd',
                  }}
                  onClick={() => setIsFilterGroupOpen(!isFilterGroupOpen)}
                >
                  그룹
                  {filters.group.length > 0 && (
                    <Circle>{filters.group.length}</Circle>
                  )}
                  <SvgIcon
                    iconName="icon-arrowButton"
                    style={{ fill: '#333' }}
                  />
                </Button>
                {isFilterGroupOpen && (
                  <FilterGroup handleApply={handleSetFilterGroup}></FilterGroup>
                )}
              </FilterContent>
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
              <Button>
                <SvgIcon iconName="icon-plus" />
                <p>고객등록</p>
              </Button>
            </FunctionWrapper>
          </ControlWrapper>
        </Header>
        <ListContent>
          <CustomerListTable data={dummyCustomerList}></CustomerListTable>
        </ListContent>
        {dummyCustomerList.length > 0 && (
          <Pagination
            totalCount={dummyCustomerList.length}
            length={dummyCustomerList.length}
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

export default CustomerList;

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
