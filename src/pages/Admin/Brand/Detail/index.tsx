import Button from '@/components/button/Button';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { formatDate } from '@/utils/dateUtils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditModal from '../List/components/editBrandModal';
import { useDeleteBrand, useGetBrand } from '@/services/brand';

const AdminBrandDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();
  const brandIdx = Number(id);
  const { data, loading, error } = useGetBrand(brandIdx);
  const [isOpenBrandEditModal, setIsOpenBrandEditModal] =
    useState<boolean>(false);
  const { deleteBrand } = useDeleteBrand();

  const handleDeleteBrand = async () => {
    try {
      const response = await deleteBrand(brandIdx);
      if (response && response.data.deleteBrand) {
        hideConfirm();
        addToast({
          id: Date.now(),
          isImage: true,
          content: `브랜드가 삭제되었습니다.`,
          type: 'success',
        });
        navigate(-1);
      } else {
        hideConfirm();
        addToast({
          id: Date.now(),
          isImage: true,
          content: `브랜드에 소속된 차량이 존재하여 삭제가 불가능합니다.`,
          type: 'error',
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const detail = data?.getBrand;
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
                  title: '브랜드 삭제',
                  content: `${detail.name} 브랜드를 삭제하시겠습니까?`,
                  cancelText: '취소',
                  confirmText: '삭제',
                  confirmVariant: 'primaryDanger',
                  onClose: hideConfirm,
                  onCancel: hideConfirm,
                  onConfirm: handleDeleteBrand,
                })
              }
            >
              삭제
            </Button>
            <Button
              onClick={() => setIsOpenBrandEditModal(!isOpenBrandEditModal)}
            >
              수정
            </Button>
          </div>
        </DetailHeaderWrapper>
        <DetailContentWrapper>
          <BrandBoxWrapper>
            <h3>브랜드 명</h3>
            <div>{detail.name ?? '-'}</div>
          </BrandBoxWrapper>
          <BrandBoxWrapper>
            <h3>생성일시</h3>
            <div>
              {formatDate(detail.created_at, 'YYYY.MM.DD HH:mm:ss') ?? '-'}
            </div>
          </BrandBoxWrapper>
          <BrandBoxWrapper>
            <h3>국산/수입</h3>
            <div>{detail.isDomestic ? '국산' : '수입'}</div>
          </BrandBoxWrapper>
          <BrandBoxWrapper>
            <h3>브랜드 수수료</h3>
            <div>{detail.brandFee ? `${detail.brandFee}%` : '-'}</div>
          </BrandBoxWrapper>
          <BrandBoxWrapper>
            <h3>소속 차량</h3>
            <div>
              {detail.cars
                ? detail.cars.map((car) => car.name).join(' / ')
                : '-'}
            </div>
          </BrandBoxWrapper>
        </DetailContentWrapper>
      </DetailWrapper>
      {isOpenBrandEditModal && (
        <EditModal
          id={brandIdx}
          isOpen={isOpenBrandEditModal}
          onCancel={() => setIsOpenBrandEditModal(false)}
          onConfirm={() => setIsOpenBrandEditModal(false)}
        ></EditModal>
      )}
    </>
  );
};

export default AdminBrandDetail;

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

const BrandBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  h3 {
    font-size: 20px;
    font-weight: 700;
  }
`;
