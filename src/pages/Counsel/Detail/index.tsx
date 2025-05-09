import Button from '@/components/button/Button';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { useDeleteCounsel, useGetCounsel } from '@/services/counsel';
import { textS14Medium, textS14Regular } from '@/styles/typography';
import { formatDate } from '@/utils/dateUtils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditModal from '../List/components/editModal';

const CounselDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();
  const counselIdx = Number(id);
  const { data, loading, error } = useGetCounsel(counselIdx);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const { deleteCounsel } = useDeleteCounsel();

  const handleDeleteCounsel = async () => {
    try {
      const response = await deleteCounsel([counselIdx]);
      if (response && response.data.deleteCounsel === 'success') {
        hideConfirm();
        addToast({
          id: Date.now(),
          isImage: true,
          content: `상담이 삭제되었습니다.`,
          type: 'success',
        });
        navigate(-1);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const detail = data?.getCounsel;
  if (!detail) return <></>;

  return (
    <>
      <DetailWrapper>
        <DetailHeaderWrapper>
          <div className="left">
            <h2>{`${detail.customer.name} 님의 상담`}</h2>
          </div>
          <div className="right">
            <Button
              onClick={() =>
                showConfirm({
                  isOpen: true,
                  title: '상담 삭제',
                  content: `${detail?.customer.name} 고객의 상담을 삭제하시겠습니까?`,
                  cancelText: '취소',
                  confirmText: '삭제',
                  confirmVariant: 'primaryDanger',
                  onClose: hideConfirm,
                  onCancel: hideConfirm,
                  onConfirm: handleDeleteCounsel,
                })
              }
            >
              삭제
            </Button>
            <Button onClick={() => setIsOpenEditModal(!isOpenEditModal)}>
              수정
            </Button>
          </div>
        </DetailHeaderWrapper>
        <InfoWrapper>
          <div>
            <div>
              <p>상담자</p>
              <div>{detail.user.name ?? '-'}</div>
            </div>
            <div>
              <p>상담상태</p>
              <div>{detail.customer?.customerStatus?.status ?? '-'}</div>
            </div>
            <div>
              <p>차종</p>
              <div>{detail.contract?.car?.name ?? '-'}</div>
            </div>
            <div>
              <p>상담일시</p>
              <div>{formatDate(detail.counselAt, 'YYYY.MM.DD HH:mm')}</div>
            </div>
            <div>
              <p>고객등급</p>
              <div>{detail.customer.customerGrade?.name ?? '-'}</div>
            </div>
          </div>
          <div>
            <div>
              <p>고객명</p>
              <div>{detail.customer.name ?? '-'}</div>
            </div>
            <div>
              <p>연락처</p>
              <div>{detail.customer.phone ?? '-'}</div>
            </div>
            <div>
              <p>구분</p>
              <div>{detail.contract?.division?.name ?? '-'}</div>
            </div>
            <div>
              <p>상담내용</p>
              <div>{detail.context}</div>
            </div>
            <div>
              <p>고객그룹</p>
              <div>{detail.customer.customerGroup?.name ?? '-'}</div>
            </div>
          </div>
        </InfoWrapper>
      </DetailWrapper>
      {isOpenEditModal && (
        <EditModal
          idx={counselIdx}
          isOpen={isOpenEditModal}
          onCancel={() => setIsOpenEditModal(false)}
          onConfirm={() => setIsOpenEditModal(false)}
        ></EditModal>
      )}
    </>
  );
};

export default CounselDetail;

export const DetailWrapper = styled.div`
  /* width: 600px; */
  display: flex;
  flex-direction: column;
  gap: 10px;
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

export const InfoWrapper = styled.div`
  display: flex;
  padding: 20px;
  text-align: left;
  gap: 10px;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 50%;
    & > div {
      display: flex;
      flex-direction: column;
      gap: 10px;
      border: 1px solid #ddd;
      padding: 10px;
      border-radius: 10px;
      p {
        font-size: 16px;
        border-bottom: 1px solid #ddd;
      }
      & > div {
        min-height: 20px;
        word-break: break-word;
        max-height: 300px;
        overflow-y: auto;
      }
    }
  }
`;

export const HistoryWrapper = styled.div`
  background: #fff;
  border-radius: 5px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
  & > div {
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    .DateTimeWrapper {
      text-align: right;
      width: 100px;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
      span {
        font-weight: 600;
      }
      p {
        ${textS14Regular}
        color: #666;
      }
    }
    .HistoryText {
      ${textS14Medium}
      background: #eee;
      width: 100%;
      padding: 10px;
      text-align: left;
    }
  }
`;
