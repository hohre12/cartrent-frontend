import Button from '@/components/button/Button';
import { useGetCars } from '@/services/car';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import styled from 'styled-components';
import { useState } from 'react';
import CarListTable from './components/table';
import RegistCarModal from './components/registCarModal';

const AdminCarList = () => {
  const { data, loading, error } = useGetCars({});
  const [isOpenRegistCarModal, setIsOpenRegistCarModal] =
    useState<boolean>(false);
  return (
    <>
      <ListWrapper>
        <Header>
          <h2>차량 목록</h2>
          <ControlWrapper>
            <FunctionWrapper>
              <Button
                onClick={() => setIsOpenRegistCarModal(!isOpenRegistCarModal)}
              >
                <p>차량 생성</p>
              </Button>
            </FunctionWrapper>
          </ControlWrapper>
        </Header>
        <ListContent>
          {data && data.getCars?.length > 0 ? (
            <>
              <CarListTable data={data.getCars}></CarListTable>
            </>
          ) : (
            <div className="noList">
              <h2>차량 없음</h2>
              <p>등록된 차량이 없습니다.</p>
            </div>
          )}
        </ListContent>
      </ListWrapper>
      {isOpenRegistCarModal && (
        <RegistCarModal
          isOpen={isOpenRegistCarModal}
          onCancel={() => setIsOpenRegistCarModal(false)}
          onConfirm={() => setIsOpenRegistCarModal(false)}
        ></RegistCarModal>
      )}
    </>
  );
};

export default AdminCarList;

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
