import Button from '@/components/button/Button';
// TODO: 백엔드 스키마 완성 후 실제 서비스로 교체
// import { useGetDepartmentAllowances } from '@/services/departmentAllowance';
import { useGetPositions } from '@/services/user';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import styled from 'styled-components';
import { useState } from 'react';
import DepartmentAllowanceListTable from './components/table';
import RegistDepartmentAllowanceModal from './components/registModal';
import EditDepartmentAllowanceModal from './components/editModal';
import Loading from '@/components/loading/Loading';

const AdminDepartmentAllowanceList = () => {
  // TODO: 백엔드 스키마 완성 후 주석 해제
  // const { data, loading, error } = useGetDepartmentAllowances({
  //   limit: 100,
  //   offset: 0,
  // });

  // 임시 데이터 (백엔드 스키마 완성 전까지)
  const data = null;
  const loading = false;

  const { data: positionsData } = useGetPositions();
  const [isOpenRegistModal, setIsOpenRegistModal] = useState<boolean>(false);
  const [editModalId, setEditModalId] = useState<number | null>(null);

  if (loading) return <Loading />;

  return (
    <>
      <ListWrapper>
        <Header>
          <h2>본부별 수당 관리</h2>
          <ControlWrapper>
            <FunctionWrapper>
              <Button onClick={() => setIsOpenRegistModal(!isOpenRegistModal)}>
                <p>수당 생성</p>
              </Button>
            </FunctionWrapper>
          </ControlWrapper>
        </Header>
        <ListContent>
          {/* TODO: 백엔드 스키마 완성 후 data.getDepartmentAllowances로 교체 */}
          {data && (data as any).getDepartmentAllowances?.length > 0 ? (
            <>
              <DepartmentAllowanceListTable
                data={(data as any).getDepartmentAllowances}
                onEdit={(id) => setEditModalId(id)}
              />
            </>
          ) : (
            <div className="noList">
              <h2>수당 없음</h2>
              <p>생성된 본부별 수당이 없습니다.</p>
            </div>
          )}
        </ListContent>
      </ListWrapper>
      {isOpenRegistModal && (
        <RegistDepartmentAllowanceModal
          isOpen={isOpenRegistModal}
          onCancel={() => setIsOpenRegistModal(false)}
          onConfirm={() => setIsOpenRegistModal(false)}
          positions={positionsData?.getPositions || []}
        />
      )}
      {editModalId && (
        <EditDepartmentAllowanceModal
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

export default AdminDepartmentAllowanceList;

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
