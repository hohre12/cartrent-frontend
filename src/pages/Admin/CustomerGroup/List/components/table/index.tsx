import Button from '@/components/button/Button';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { useDeleteCity } from '@/services/city';
import { useDeleteCustomerGroup } from '@/services/customer';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { City, CustomerGroup, Team } from '@/types/graphql';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type TTableProps = {
  data: CustomerGroup[];
};

const CustomerGroupListTable = ({ data }: TTableProps) => {
  const navigate = useNavigate();
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();
  const { deleteCustomerGroup } = useDeleteCustomerGroup();
  const handleDeleteCustomerGroup = async (idx: CustomerGroup['id']) => {
    try {
      const response = await deleteCustomerGroup(idx);
      if (response && response.data.deleteCustomerGroup === 'success') {
        hideConfirm();
        addToast({
          id: Date.now(),
          isImage: true,
          content: `고객그룹이 삭제되었습니다.`,
          type: 'success',
        });
      }
    } catch (e: any) {
      addToast({
        id: Date.now(),
        isImage: true,
        content: `${e.message}`,
        type: 'error',
      });
    }
  };
  return (
    <>
      <TableWrapper>
        <thead>
          <TableHeader>
            <th>고객그룹명</th>
            <th>삭제</th>
          </TableHeader>
        </thead>
        <tbody>
          {data.map((it, idx) => (
            <TableItem
              key={idx}
              //   onClick={() => navigate(`${it.id}`)}
            >
              <td className="name">{it.name}</td>
              <td>
                <Button
                  variant="black"
                  onClick={() =>
                    showConfirm({
                      isOpen: true,
                      title: '고객그룹 삭제',
                      content: `${it.name} 고객그룹을 삭제하시겠습니까?`,
                      cancelText: '취소',
                      confirmText: '삭제',
                      confirmVariant: 'primaryDanger',
                      onClose: hideConfirm,
                      onCancel: hideConfirm,
                      onConfirm: () => handleDeleteCustomerGroup(it.id),
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

export default CustomerGroupListTable;

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
  /* cursor: pointer; */
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
