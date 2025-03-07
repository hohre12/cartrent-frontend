import Button from '@/components/button/Button';
import { useGetUsers } from '@/services/user';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import styled from 'styled-components';
import UserListTable from './components/table';

const AdminUserList = () => {
  const { data, loading, error } = useGetUsers();
  return (
    <>
      <ListWrapper>
        <Header>
          <h2>직원목록</h2>
          <ControlWrapper>
            <FunctionWrapper>
              <Button>
                <p>직원생성</p>
              </Button>
            </FunctionWrapper>
          </ControlWrapper>
        </Header>
        <ListContent>
          {data && data.getUsers?.length > 0 ? (
            <>
              <UserListTable data={data.getUsers}></UserListTable>
            </>
          ) : (
            <div className="noList">
              <h2>직원 없음</h2>
              <p>생성된 직원이 없습니다.</p>
            </div>
          )}
        </ListContent>
      </ListWrapper>
    </>
  );
};

export default AdminUserList;

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
  padding: 17.5px 20px;
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
