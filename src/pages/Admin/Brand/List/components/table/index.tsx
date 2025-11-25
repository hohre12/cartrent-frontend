import Button from '@/components/button/Button';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { useDeleteBrand } from '@/services/brand';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { Brand, Team } from '@/types/graphql';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type TTableProps = {
  data: Brand[];
};

const BrandListTable = ({ data }: TTableProps) => {
  const navigate = useNavigate();
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();
  const { deleteBrand } = useDeleteBrand();
  const handleDeleteBrand = async (idx: Brand['id']) => {
    try {
      const response = await deleteBrand(idx);
      if (response && response.data.deleteBrand) {
        hideConfirm();
        addToast({
          id: Date.now(),
          isImage: true,
          content: `브랜드가 삭제되었습니다.`,
          type: 'success',
        });
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
  return (
    <>
      <TableWrapper>
        <thead>
          <TableHeader>
            <th>브랜드명</th>
            <th>국산/수입</th>
            <th>브랜드 수수료</th>
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
              <td>{it.isDomestic ? '국산' : '수입'}</td>
              <td>{it.brandFee ? `${it.brandFee}%` : '-'}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="black"
                  onClick={() =>
                    showConfirm({
                      isOpen: true,
                      title: '브랜드 삭제',
                      content: `${it.name} 브랜드를 삭제하시겠습니까?`,
                      cancelText: '취소',
                      confirmText: '삭제',
                      confirmVariant: 'primaryDanger',
                      onClose: hideConfirm,
                      onCancel: hideConfirm,
                      onConfirm: () => handleDeleteBrand(it.id),
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

export default BrandListTable;

export const TableWrapper = styled.table`
  position: relative;
  width: 100%;
  text-align: left;
  white-space: nowrap;
  border-spacing: 0;
  border-collapse: collapse;
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
