import Button from '@/components/button/Button';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import styled from 'styled-components';
import { useState } from 'react';
import { useGetCustomerGrades } from '@/services/customer';
import CustomerGradeListTable from './components/table';
import RegistCustomerGradeModal from './components/registCustomerGradeModal';

const AdminCustomerGradeList = () => {
  const { data, loading, error } = useGetCustomerGrades();
  const [isOpenRegistCustomerGradeModal, setIsOpenRegistCustomerGradeModal] =
    useState<boolean>(false);
  return (
    <>
      <ListWrapper>
        <Header>
          <h2>고객등급목록</h2>
          <ControlWrapper>
            <FunctionWrapper>
              <Button
                onClick={() =>
                  setIsOpenRegistCustomerGradeModal(
                    !isOpenRegistCustomerGradeModal,
                  )
                }
              >
                <p>고객등급생성</p>
              </Button>
            </FunctionWrapper>
          </ControlWrapper>
        </Header>
        <ListContent>
          {data && data.getCustomerGrades?.length > 0 ? (
            <>
              <CustomerGradeListTable
                data={data.getCustomerGrades}
              ></CustomerGradeListTable>
            </>
          ) : (
            <div className="noList">
              <h2>고객등급 없음</h2>
              <p>생성된 고객등급이 없습니다.</p>
            </div>
          )}
        </ListContent>
      </ListWrapper>
      {isOpenRegistCustomerGradeModal && (
        <RegistCustomerGradeModal
          isOpen={isOpenRegistCustomerGradeModal}
          onCancel={() => setIsOpenRegistCustomerGradeModal(false)}
          onConfirm={() => setIsOpenRegistCustomerGradeModal(false)}
        ></RegistCustomerGradeModal>
      )}
    </>
  );
};

export default AdminCustomerGradeList;

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
