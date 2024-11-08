import styled from 'styled-components';
import CustomerListTable from './components/table';
import Input from '@/components/input/Input';
import { SvgIcon } from '@/components/common/SvgIcon';
import { textS14Regular } from '@/styles/typography';
import Button from '@/components/button/Button';

const CustomerList = () => {
  return (
    <ListWrapper>
      <Header>
        <h2>고객목록</h2>
        <ControlWrapper>
          <SearchBoxWrapper>
            <Input
              style={{ width: '250px' }}
              placeholder="고객명, 고객번호로 검색해주세요."
            ></Input>
            <Button>
              <SvgIcon iconName="icon-search" />
            </Button>
            <Button style={{ marginLeft: '20px' }}>필터</Button>
          </SearchBoxWrapper>
          <FunctionWrapper>
            <Button>보기옵션</Button>
            <Button>고객등록</Button>
          </FunctionWrapper>
        </ControlWrapper>
      </Header>
      <CustomerListTable></CustomerListTable>
      {/* <TableWrapper>
        <CustomerListTable></CustomerListTable>
      </TableWrapper> */}
    </ListWrapper>
  );
};

export default CustomerList;

const ListWrapper = styled.div`
  background: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
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
`;

const SearchBoxWrapper = styled.div`
  display: flex;
`;

const FunctionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
