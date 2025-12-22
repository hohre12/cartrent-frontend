import Button from '@/components/button/Button';
import { useGetUsers } from '@/services/user';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import styled from 'styled-components';
import UserListTable from './components/table';
import { useState } from 'react';
import RegistModal from './components/registModal';
import { useGetNotices } from '@/services/notice';
import Loading from '@/components/loading/Loading';

const AdminNoticeList = () => {
  const { data, loading, error } = useGetNotices();
  const [isOpenRegistNoticeModal, setIsOpenRegistNoticeModal] =
    useState<boolean>(false);

  if (loading) return <Loading />;

  return (
    <>
      <ListWrapper>
        <Header>
          <h2>공지사항목록</h2>
          <ControlWrapper>
            <FunctionWrapper>
              <Button
                onClick={() =>
                  setIsOpenRegistNoticeModal(!isOpenRegistNoticeModal)
                }
              >
                <p>공지사항생성</p>
              </Button>
            </FunctionWrapper>
          </ControlWrapper>
        </Header>
        <ListContent>
          {data && data.getNotices?.length > 0 ? (
            <>
              <UserListTable data={data.getNotices}></UserListTable>
            </>
          ) : (
            <div className="noList">
              <h2>공지사항 없음</h2>
              <p>생성된 공지사항이 없습니다.</p>
            </div>
          )}
        </ListContent>
      </ListWrapper>
      {isOpenRegistNoticeModal && (
        <RegistModal
          isOpen={isOpenRegistNoticeModal}
          onCancel={() => setIsOpenRegistNoticeModal(false)}
          onConfirm={() => setIsOpenRegistNoticeModal(false)}
        ></RegistModal>
      )}
    </>
  );
};

export default AdminNoticeList;

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
