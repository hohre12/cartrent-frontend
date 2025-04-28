import Button from '@/components/button/Button';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { useDeleteCar } from '@/services/car';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { Car, Team } from '@/types/graphql';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type TTableProps = {
  data: Car[];
};

const CarListTable = ({ data }: TTableProps) => {
  const navigate = useNavigate();
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();
  const { deleteCar } = useDeleteCar();
  const handleDeleteCar = async (idx: Car['id']) => {
    try {
      const response = await deleteCar(idx);
      if (response && response.data.deleteCar) {
        hideConfirm();
        addToast({
          id: Date.now(),
          isImage: true,
          content: `차량이 삭제되었습니다.`,
          type: 'success',
        });
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
  return (
    <>
      <TableWrapper>
        <thead>
          <TableHeader>
            <th>차량명</th>
            <th>국산/수입</th>
            <th>차량 수수료</th>
            <th>브랜드</th>
            <th>삭제</th>
          </TableHeader>
        </thead>
        <tbody>
          {data.map((it, idx) => (
            <TableItem
              key={idx}
              onClick={() => navigate(`${it.id}`)}
            >
              <td className="name">{it.name}</td>
              <td>{it.brand.isDomestic ? '국산' : '수입'}</td>
              <td>{it.carFee ? `${it.carFee}%` : '-'}</td>
              <td>{it.brand.name ? it.brand.name : '-'}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="black"
                  onClick={() =>
                    showConfirm({
                      isOpen: true,
                      title: '차량 삭제',
                      content: `${it.name} 차량을 삭제하시겠습니까?`,
                      cancelText: '취소',
                      confirmText: '삭제',
                      confirmVariant: 'primaryDanger',
                      onClose: hideConfirm,
                      onCancel: hideConfirm,
                      onConfirm: () => handleDeleteCar(it.id),
                    })
                  }
                >
                  삭제
                </Button>
              </td>
            </TableItem>
          ))}
        </tbody>
      </TableWrapper>
    </>
  );
};

export default CarListTable;

export const TableWrapper = styled.table`
  position: relative;
  height: 100%;
  text-align: left;
  display: block;
  overflow: overlay;
  white-space: nowrap;
  border-spacing: 0;
  border-collapse: separate;
`;

export const TableHeader = styled.tr`
  height: 40px;
  position: sticky;
  top: 0;
  background-color: ${palette['$white']};
  z-index: 10;
  th {
    ${titleS14Semibold}
    color: ${palette['$gray-700']};
    text-align: left;
    padding: 0px 15px;
    border-bottom: 1px solid ${palette['$gray-200']};
    width: 100vw;
  }
`;

export const TableItem = styled.tr`
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
  td {
    ${textS14Regular}
    border-bottom: 1px solid ${'gray-200'};
    height: 60px;
    text-align: left;
    padding: 0px 15px;
    max-width: 220px;
    border-bottom: 1px solid #eee;
    &.name {
      font-weight: 600;
    }
    &.textHidden {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }
`;
