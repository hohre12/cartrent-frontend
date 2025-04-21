import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useToast } from '@/hooks/useToast';
import { useCreateNotice } from '@/services/notice';
import { TModal } from '@/types/common';
import { CreateNoticeDto } from '@/types/graphql';
import { useState } from 'react';
import styled from 'styled-components';

const RegistModal = (props: TModal) => {
  const { ...modalProps } = props;

  const [title, setTitle] = useState<CreateNoticeDto['title']>();
  const [body, setBody] = useState<CreateNoticeDto['body']>();

  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { createNotice } = useCreateNotice();

  const handleNoticeRegist = async () => {
    setSubmit(true);
    if (!title) return;
    if (!body) return;
    try {
      const response = await createNotice({
        title,
        body,
      });

      if (response && response.data.createNotice.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `공지사항이 등록되었습니다.`,
          type: 'success',
        });
      }

      modalProps.onConfirm?.();
    } catch (e: any) {
      addToast({
        id: Date.now(),
        isImage: true,
        content: `${e.message}`,
        type: 'error',
      });
      modalProps.onCancel?.();
    }
  };

  return (
    <>
      <SModal
        {...modalProps}
        title="공지사항 등록"
        size="small"
        onConfirm={handleNoticeRegist}
      >
        <RegistNoticeWrapper>
          <div>
            <span>
              제목 <p className="required">*</p>
            </span>
            <Input
              placeholder="공지사항 제목을 입력해 주세요."
              value={title}
              onTextChange={(text) => setTitle(text)}
              isError={submit && !title}
              errorMessage="공지사항 제목은 필수입니다."
            />
          </div>
          <div>
            <span>
              내용 <p className="required">*</p>
            </span>
            <Input
              placeholder="내용을 입력해 주세요."
              value={body ?? ''}
              onTextChange={(text) => setBody(text)}
            />
          </div>
        </RegistNoticeWrapper>
      </SModal>
    </>
  );
};

export default RegistModal;

export const SModal = styled(Modal)``;
const RegistNoticeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
