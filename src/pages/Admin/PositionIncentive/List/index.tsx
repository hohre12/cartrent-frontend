import Button from '@/components/button/Button';
import { useGetPositionIncentives } from '@/services/positionIncentive';
import { useGetPositions } from '@/services/user';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import styled from 'styled-components';
import { useState } from 'react';
import PositionIncentiveListTable from './components/table';
import RegistPositionIncentiveModal from './components/registModal';
import EditPositionIncentiveModal from './components/editModal';
import Loading from '@/components/loading/Loading';

const AdminPositionIncentiveList = () => {
  const { data, loading, error } = useGetPositionIncentives({
    limit: 100,
    offset: 0,
  });
  const { data: positionsData } = useGetPositions();
  const [isOpenRegistModal, setIsOpenRegistModal] = useState<boolean>(false);
  const [editModalId, setEditModalId] = useState<number | null>(null);

  if (loading) return <Loading />;

  return (
    <>
      <ListWrapper>
        <Header>
          <h2>직급 인센티브 관리</h2>
          <ControlWrapper>
            <FunctionWrapper>
              <Button onClick={() => setIsOpenRegistModal(!isOpenRegistModal)}>
                <p>인센티브 생성</p>
              </Button>
            </FunctionWrapper>
          </ControlWrapper>
        </Header>
        <ListContent>
          {data && data.getPositionIncentives?.length > 0 ? (
            <>
              <PositionIncentiveListTable
                data={data.getPositionIncentives}
                onEdit={(id) => setEditModalId(id)}
              />
            </>
          ) : (
            <div className="noList">
              <h2>인센티브 없음</h2>
              <p>생성된 직급 인센티브가 없습니다.</p>
            </div>
          )}
        </ListContent>
      </ListWrapper>
      {isOpenRegistModal && (
        <RegistPositionIncentiveModal
          isOpen={isOpenRegistModal}
          onCancel={() => setIsOpenRegistModal(false)}
          onConfirm={() => setIsOpenRegistModal(false)}
          positions={positionsData?.getPositions || []}
        />
      )}
      {editModalId && (
        <EditPositionIncentiveModal
          id={editModalId}
          isOpen={!!editModalId}
          onCancel={() => setEditModalId(null)}
          onConfirm={() => setEditModalId(null)}
          positions={positionsData?.getPositions || []}
        />
      )}
    </>
  );
};

export default AdminPositionIncentiveList;

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
