import Button from '@/components/button/Button';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { formatDate } from '@/utils/dateUtils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditModal from '../List/components/editCarModal';
import { useDeleteCar, useGetCar } from '@/services/car';

const AdminCarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();
  const carIdx = Number(id);
  const { data, loading, error } = useGetCar(carIdx);
  const [isOpenCarEditModal, setIsOpenCarEditModal] = useState<boolean>(false);
  const { deleteCar } = useDeleteCar();

  const handleDeleteCar = async () => {
    try {
      const response = await deleteCar(carIdx);
      if (response && response.data.deleteCar) {
        hideConfirm();
        addToast({
          id: Date.now(),
          isImage: true,
          content: `차량이 삭제되었습니다.`,
          type: 'success',
        });
        navigate(-1);
      } else {
        hideConfirm();
        addToast({
          id: Date.now(),
          isImage: true,
          content: `삭제가 불가능합니다.`,
          type: 'error',
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const detail = data?.getCar;
  if (!detail) return <></>;
  return (
    <>
      <DetailWrapper>
        <DetailHeaderWrapper>
          <div className="left">
            <h2>{detail.name}</h2>
          </div>
          <div className="right">
            <Button
              onClick={() =>
                showConfirm({
                  isOpen: true,
                  title: '차량 삭제',
                  content: `${detail.name} 차량을 삭제하시겠습니까?`,
                  cancelText: '취소',
                  confirmText: '삭제',
                  confirmVariant: 'primaryDanger',
                  onClose: hideConfirm,
                  onCancel: hideConfirm,
                  onConfirm: handleDeleteCar,
                })
              }
            >
              삭제
            </Button>
            <Button onClick={() => setIsOpenCarEditModal(!isOpenCarEditModal)}>
              수정
            </Button>
          </div>
        </DetailHeaderWrapper>
        <DetailContentWrapper>
          <CarBoxWrapper>
            <h3>차량 명</h3>
            <div>{detail.name ?? '-'}</div>
          </CarBoxWrapper>
          <CarBoxWrapper>
            <h3>생성일시</h3>
            <div>
              {formatDate(detail.created_at, 'YYYY.MM.DD HH:mm:ss') ?? '-'}
            </div>
          </CarBoxWrapper>
          <CarBoxWrapper>
            <h3>차량 수수료</h3>
            <div>{detail.carFee ? `${detail.carFee}%` : '-'}</div>
          </CarBoxWrapper>
          <CarBoxWrapper>
            <h3>국산/수입</h3>
            <div>{detail.brand.isDomestic ? '국산' : '수입'}</div>
          </CarBoxWrapper>
          <CarBoxWrapper>
            <h3>브랜드</h3>
            <div>{detail.brand ? detail.brand.name : '-'}</div>
          </CarBoxWrapper>
        </DetailContentWrapper>
      </DetailWrapper>
      {isOpenCarEditModal && (
        <EditModal
          id={carIdx}
          isOpen={isOpenCarEditModal}
          onCancel={() => setIsOpenCarEditModal(false)}
          onConfirm={() => setIsOpenCarEditModal(false)}
        ></EditModal>
      )}
    </>
  );
};

export default AdminCarDetail;

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

const CarBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  h3 {
    font-size: 20px;
    font-weight: 700;
  }
`;
