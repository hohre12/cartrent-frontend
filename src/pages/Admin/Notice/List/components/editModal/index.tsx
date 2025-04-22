import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useToast } from '@/hooks/useToast';
import { useGetNotice, useUpdateNotice } from '@/services/notice';
import { TModal } from '@/types/common';
import { UpdateNoticeDto } from '@/types/graphql';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const EditModal = (props: TModal & { idx: number }) => {
  const { idx, ...modalProps } = props;

  const { data } = useGetNotice(idx);

  const [title, setTitle] = useState<UpdateNoticeDto['title']>();
  const [body, setBody] = useState<UpdateNoticeDto['body']>();

  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { updateNotice } = useUpdateNotice();

  const handleNoticeEdit = async () => {
    setSubmit(true);
    if (!title) return;
    if (!body) return;
    try {
      const response = await updateNotice({
        noticeId: idx,
        title,
        body,
      });

      if (response && response.data.updateNotice.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `공지사항이 수정되었습니다.`,
          type: 'success',
        });
        modalProps.onConfirm?.();
      }
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

  useEffect(() => {
    const detail = data?.getNotice;
    if (detail) {
      setTitle(detail.title);
      setBody(detail.body);
    }
  }, [data]);

  return (
    <>
      <SModal
        {...modalProps}
        title="공지사항 수정"
        size="small"
        onConfirm={handleNoticeEdit}
      >
        <UpdateNoticeWrapper>
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
        </UpdateNoticeWrapper>
      </SModal>
    </>
  );
};

export default EditModal;

export const SModal = styled(Modal)``;
const UpdateNoticeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
