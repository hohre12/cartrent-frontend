import styled from 'styled-components';
import CustomerListTable from './components/table';
import Input from '@/components/input/Input';
import { SvgIcon } from '@/components/common/SvgIcon';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import Button from '@/components/button/Button';
import { dummyCustomerList } from '@/dummy/customer';
import Pagination from '@/components/pagination/Pagination';

const CustomerList = () => {
  return (
    <ListWrapper>
      <Header>
        <h2>고객목록</h2>
        <ControlWrapper>
          <SearchBoxWrapper>
            <div className="search">
              <Input
                className="input"
                style={{ width: '250px' }}
                placeholder="고객명, 고객번호로 검색해주세요."
              ></Input>
              <Button
                style={{
                  padding: '5px',
                  paddingBottom: '7px',
                  borderRadius: '0px',
                  height: '34px',
                }}
              >
                <SvgIcon iconName="icon-search" />
              </Button>
            </div>

            <Button style={{ marginLeft: '20px' }}>
              <SvgIcon iconName="icon-filter" />
              <p>필터</p>
            </Button>
          </SearchBoxWrapper>
          <FunctionWrapper>
            <Button>
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
        <CustomerListTable></CustomerListTable>
      </ListContent>
      {dummyCustomerList.length > 0 && (
        <Pagination
          totalCount={dummyCustomerList.length}
          length={dummyCustomerList.length}
        ></Pagination>
      )}
    </ListWrapper>
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
  .search {
    display: flex;
    border: 1px solid #eee;
    height: 36px;
    .input {
      .inputBox {
        border: none;
        border-radius: 0;
      }
    }
  }
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
