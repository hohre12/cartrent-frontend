import styled from 'styled-components';
import CustomerListTable from './components/table';
import Input from '@/components/input/Input';
import { SvgIcon } from '@/components/common/SvgIcon';
import { textS14Regular } from '@/styles/typography';

const CustomerList = () => {
  return (
    <ListWrapper>
      <SearchBoxWrapper>
        <Input placeholder="고객명, 고객번호로 검색해주세요."></Input>
        <SvgIcon iconName="icon-search" />
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
        <CustomerListTable></CustomerListTable>
      </TableWrapper>
    </ListWrapper>
  );
};

export default CustomerList;

export const ListWrapper = styled.div`
  background: #fff;
  width: calc(100% - 750px);
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
