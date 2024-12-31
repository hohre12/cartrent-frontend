import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import TextArea from '@/components/textArea/TextArea';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { TModal } from '@/types/common';
import { useState } from 'react';
import styled from 'styled-components';

const RegistModal = (props: TModal) => {
  const { ...modalProps } = props;
  const [title, setTitle] = useState<string>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();
  //   const { showConfirm, hideConfirm } = useConfirm();

  const handleCounselRegist = async () => {
    setSubmit(true);
    if (!title) return;
    try {
      //   const { data } = await postMemberTemp({
      //     userName: userName,
      //     empNo: empNo,
      //     authId: authId,
      //     email: email,
      //     teamIdxs: teams?.map((it) => it.teamIdx),
      //     institutePermIdx: permission?.institutePermIdx,
      //   });
      addToast({
        id: Date.now(),
        isImage: true,
        content: `상담이 등록되었습니다.`,
        type: 'success',
      });
      modalProps.onConfirm?.();
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <>
      <Modal
        {...modalProps}
        title="상담정보등록"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '등록',
        }}
        onConfirm={handleCounselRegist}
      >
        <CounselModalContentWrapper>
          <div className="InputWrapper">
            <div>
              <span>상담제목</span>
              <Input
                placeholder="상담제목을 입력해 주세요."
                value={title}
                onTextChange={(text) => setTitle(text)}
              ></Input>
            </div>
            <div>
              <span>고객명(셀렉트박스)</span>
              <Input></Input>
            </div>
            <div>
              <span>상담일시(캘린더)</span>
              <Input></Input>
            </div>
            <div>
              <span>상담자(셀렉트박스)</span>
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
    </>
  );
};

export default RegistModal;

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
