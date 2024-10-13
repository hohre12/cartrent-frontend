import { titleL18Bold, titleM16Semibold } from '@/styles/typography';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Modal } from '../modal/Modal';
import { useState } from 'react';
import Input from '../input/Input';
import TextArea from '../textArea/TextArea';

const GlobalNavigationBar = () => {
  const navigate = useNavigate();
  const [isCounselModal, setIsCounselModal] = useState<boolean>(false);
  return (
    <>
      <GlobalNavigationBarWrapper>
        <InstituteWrapper onClick={() => navigate('/dashboard')}>
          <div className="logo">카트렌트카</div>
          <div className="instituteName">SMART 고객관리</div>
        </InstituteWrapper>
        <GlobalFunctionWrapper>
          <span>고객등록</span>
          <span onClick={() => setIsCounselModal(!isCounselModal)}>
            상담등록
          </span>
        </GlobalFunctionWrapper>
      </GlobalNavigationBarWrapper>
      {isCounselModal && (
        <Modal
          isOpen={isCounselModal}
          title="상담정보등록"
          size={'small'}
          footerOption={{
            cancelText: '취소',
            confirmText: '등록',
          }}
          onCancel={() => setIsCounselModal(false)}
        >
          <CounselModalContentWrapper>
            <div className="InputWrapper">
              <div>
                <span>고객명</span>
                <Input></Input>
              </div>
              <div>
                <span>상담일시</span>
                <Input></Input>
              </div>
              <div>
                <span>상담자</span>
                <Input disabled></Input>
              </div>
            </div>
            <div className="TextAreaWrapper">
              <span>상담내용</span>
              <TextArea
                value={''}
                style={{ width: '500px' }}
              ></TextArea>
            </div>
          </CounselModalContentWrapper>
        </Modal>
      )}
    </>
  );
};

export default GlobalNavigationBar;

export const GlobalNavigationBarWrapper = styled.div`
  width: 100vw;
  height: 60px;
  padding: 0 30px;
  background: #1aa18f;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InstituteWrapper = styled.div`
  width: 300px;
  display: flex;
  gap: 10px;
  cursor: pointer;
  align-items: center;
  .logo {
    ${titleL18Bold}
  }
  .instituteName {
    ${titleM16Semibold}
  }
`;

export const GlobalFunctionWrapper = styled.div`
  display: flex;
  gap: 15px;
  & > span {
    padding: 10px;
    cursor: pointer;
  }
`;

const CounselModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .InputWrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    & > div {
      display: flex;
      width: 49%;
      gap: 5px;
      & > span {
        width: 50px;
      }
    }
  }
  .TextAreaWrapper {
    display: flex;
    gap: 5px;
    & > span {
      width: 50px;
    }
  }
`;
