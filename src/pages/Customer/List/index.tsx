import styled from 'styled-components';
import CustomerListTable from './components/table';
import Input from '@/components/input/Input';
import { SvgIcon } from '@/components/common/SvgIcon';
import { textS14Regular } from '@/styles/typography';
import { useQuery } from '@apollo/client';
import { GetCustomersDto, TCustomer } from '@/types/customer';
import { GET_CUSTOMERS_QUERY } from '@/apollo/queries/customer';
import { useCallback, useState } from 'react';
import SearchBox from '@/components/searchBox/SearchBox';

const CustomerList = () => {
  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  const { data, loading, error } = useQuery<
    { getCustomers: TCustomer[] },
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
  return (
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
  );
};

export default CustomerList;

export const ListWrapper = styled.div`
  background: #fff;
  width: 100%;
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
