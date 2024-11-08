import { titleL18Bold, titleM16Semibold } from '@/styles/typography';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Modal } from '../modal/Modal';
import { useState } from 'react';
import Input from '../input/Input';
import TextArea from '../textArea/TextArea';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { tokenState, userState } from '@/state/auth';
import LocalStorage from '@/utils/localStorage';
import { TOKEN_KEY } from '@/constants/common';

const GlobalNavigationBar = () => {
  const navigate = useNavigate();
  const [isCounselModal, setIsCounselModal] = useState<boolean>(false);
  const resetToken = useResetRecoilState(tokenState);
  const user = useRecoilValue(userState);

  const handleLogout = async () => {
    try {
      resetToken();
      LocalStorage.removeItem(TOKEN_KEY);
      LocalStorage.removeItem('institute');
      // TODO: api 연동후 주석 해제
      //   const { data } = await authSignout();
      //   if (data.data) {
      //     resetToken();
      //     LocalStorage.removeItem(TOKEN_KEY);
      //     LocalStorage.removeItem('institute');
      //   }
    } catch (e) {
      console.warn('로그아웃 에러', e);
    }
  };
  return (
    <>
      <GlobalNavigationBarWrapper>
        <GlobalFunctionWrapper>
          <span>고객등록</span>
          <span onClick={() => setIsCounselModal(!isCounselModal)}>
            상담등록
          </span>
          <div
            className="userInfo"
            onClick={handleLogout}
          >
            <div className="userInfoText">
              <h3>{user?.name ?? '-'}</h3>
            </div>
          </div>
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
  width: calc(100% - 250px);
  height: 60px;
  padding: 0 30px;
  background: #fff;
  color: #000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  left: 250px;
  border-bottom: 1px solid #e1e0dd;
`;

export const GlobalFunctionWrapper = styled.div`
  display: flex;
  gap: 15px;
  & > span {
    padding: 10px;
    cursor: pointer;
  }
  .userInfo {
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
