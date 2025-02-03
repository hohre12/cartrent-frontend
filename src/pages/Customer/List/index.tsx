import styled from 'styled-components';
import CustomerListTable from './components/table';
import Input from '@/components/input/Input';
import { SvgIcon } from '@/components/common/SvgIcon';
import { textS14Regular } from '@/styles/typography';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS_QUERY } from '@/apollo/queries/customer';
import { useCallback, useEffect, useState } from 'react';
import SearchBox from '@/components/searchBox/SearchBox';
import { useRecoilState } from 'recoil';
import { selectedCustomerIdxState } from '@/state/customer';
import { Customer, GetCustomersDto } from '@/types/graphql';
import Button from '@/components/button/Button';
import RegistModal from '../components/registModal';
import WatchOptionModal from '../components/watchOptionModal';

const CustomerList = () => {
  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useRecoilState(
    selectedCustomerIdxState,
  );
  const [isOpenWatchOptionModal, setIsOpenWatchOptionModal] =
    useState<boolean>(false);
  const [isOpenRegistModal, setIsOpenRegistModal] = useState<boolean>(false);

  const { data, loading, error } = useQuery<
    { getCustomers: Customer[] },
    { getCustomersDto: GetCustomersDto }
  >(GET_CUSTOMERS_QUERY, {
    variables: { getCustomersDto: { search: searchText } },
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
    console.log('씨발 안바뀌나');
    if (data?.getCustomers && data?.getCustomers?.length > 0) {
      setSelectedCustomer(data.getCustomers[0].id);
    }
  }, [data]);

  if (error) return <></>;

  return (
    <>
      <ListWrapper>
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
          <FunctionWrapper>
            <Button
              onClick={() => setIsOpenWatchOptionModal(!isOpenWatchOptionModal)}
            >
              <SvgIcon iconName="icon-eye-show" />
              <p>보기옵션</p>
            </Button>
            <Button onClick={() => setIsOpenRegistModal(!isOpenRegistModal)}>
              <SvgIcon iconName="icon-plus" />
              <p>고객등록</p>
            </Button>
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
            {/* <div>
            <SvgIcon iconName="icon-setting" />
          </div> */}
          </div>
          {data && (
            <CustomerListTable data={data.getCustomers}></CustomerListTable>
          )}
        </TableWrapper>
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
          onConfirm={() => setIsOpenRegistModal(false)}
        ></RegistModal>
      )}
    </>
  );
};

export default CustomerList;

export const ListWrapper = styled.div`
  background: #fff;
  width: calc(100% - 825px);
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SearchBoxWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const TableWrapper = styled.div`
  border: 1px solid #eee;
  height: 100%;
  width: 100%;
  overflow: auto;
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
