import Button from '@/components/button/Button';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { formatDate } from '@/utils/dateUtils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditModal from '../List/components/editModal';
import { useDeleteNotice, useGetNotice } from '@/services/notice';

const AdminNoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();
  const noticeIdx = Number(id);
  const { data, loading, error } = useGetNotice(noticeIdx);
  const [isOpenNoticeEditModal, setIsOpenNoticeEditModal] =
    useState<boolean>(false);
  const { deleteNotice } = useDeleteNotice();

  const handleDeleteNotice = async () => {
    try {
      const response = await deleteNotice({
        noticeId: noticeIdx,
      });
      console.log(response);
      if (response && response.data.deleteNotice) {
        hideConfirm();
        addToast({
          id: Date.now(),
          isImage: true,
          content: `공지사항이 삭제되었습니다.`,
          type: 'success',
        });
        navigate(-1);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const detail = data?.getNotice;
  if (!detail) return <></>;
  return (
    <>
      <DetailWrapper>
        <DetailHeaderWrapper>
          <div className="left">
            <h2>{detail.title}</h2>
          </div>
          <div className="right">
            <Button
              onClick={() =>
                showConfirm({
                  isOpen: true,
                  title: '공지사항 삭제',
                  content: `공지사항을 삭제하시겠습니까?`,
                  cancelText: '취소',
                  confirmText: '삭제',
                  confirmVariant: 'primaryDanger',
                  onClose: hideConfirm,
                  onCancel: hideConfirm,
                  onConfirm: handleDeleteNotice,
                })
              }
            >
              삭제
            </Button>
            <Button
              onClick={() => setIsOpenNoticeEditModal(!isOpenNoticeEditModal)}
            >
              수정
            </Button>
          </div>
        </DetailHeaderWrapper>
        <DetailContentWrapper>
          <NoticeBoxWrapper>
            <h3>제목</h3>
            <div>{detail.title ?? '-'}</div>
          </NoticeBoxWrapper>
          <NoticeBoxWrapper>
            <h3>생성일시</h3>
            <div>
              {formatDate(detail.created_at, 'YYYY.MM.DD HH:mm:ss') ?? '-'}
            </div>
          </NoticeBoxWrapper>
          <NoticeBoxWrapper>
            <h3>수정일시</h3>
            <div>
              {formatDate(detail.updated_at, 'YYYY.MM.DD HH:mm:ss') ?? '-'}
            </div>
          </NoticeBoxWrapper>
          <NoticeBoxWrapper>
            <h3>내용</h3>
            <div>{detail.body ?? '-'}</div>
          </NoticeBoxWrapper>
        </DetailContentWrapper>
      </DetailWrapper>
      {isOpenNoticeEditModal && (
        <EditModal
          idx={noticeIdx}
          isOpen={isOpenNoticeEditModal}
          onCancel={() => setIsOpenNoticeEditModal(false)}
          onConfirm={() => setIsOpenNoticeEditModal(false)}
        ></EditModal>
      )}
    </>
  );
};

export default AdminNoticeDetail;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > h6 {
    font-size: 20px;
  }
`;

const DetailHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 30px;
  border-bottom: 1px solid #eeeeee;
  .left {
    h2 {
      font-size: 24px;
      font-weight: 700;
    }
  }
  .right {
    font-weight: 700;
    display: flex;
    gap: 10px;
    button {
      width: 100px;
    }
  }
`;

const DetailContentWrapper = styled.div`
  padding: 20px 30px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 50px;
  overflow-y: auto;
  height: calc(100vh - 130px);
`;

const NoticeBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  h3 {
    font-size: 20px;
    font-weight: 700;
  }
`;
