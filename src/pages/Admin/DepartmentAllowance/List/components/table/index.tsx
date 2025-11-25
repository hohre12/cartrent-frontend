import Button from '@/components/button/Button';
import { UserPositionHangleEnum } from '@/constants/user';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
// TODO: 백엔드 스키마 완성 후 실제 서비스로 교체
// import { useDeleteDepartmentAllowance } from '@/services/departmentAllowance';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
// TODO: 백엔드 스키마 완성 후 DepartmentAllowance 타입으로 교체
import { PositionIncentive } from '@/types/graphql';
import styled from 'styled-components';

type TTableProps = {
  // TODO: 백엔드 스키마 완성 후 DepartmentAllowance[] 타입으로 교체
  data: PositionIncentive[];
  onEdit: (id: number) => void;
};

const DepartmentAllowanceListTable = ({ data, onEdit }: TTableProps) => {
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();
  // TODO: 백엔드 스키마 완성 후 주석 해제
  // const { deleteDepartmentAllowance } = useDeleteDepartmentAllowance();

  const handleDelete = async (id: number, positionName: string) => {
    try {
      // TODO: 백엔드 스키마 완성 후 주석 해제
      // const response = await deleteDepartmentAllowance(id);
      // if (response && response.data.deleteDepartmentAllowance) {
      //   hideConfirm();
      //   addToast({
      //     id: Date.now(),
      //     isImage: true,
      //     content: `본부별 수당이 삭제되었습니다.`,
      //     type: 'success',
      //   });
      // }

      // 임시 처리
      hideConfirm();
      addToast({
        id: Date.now(),
        isImage: true,
        content: `본부별 수당 삭제 기능은 백엔드 스키마 완성 후 사용 가능합니다.`,
        type: 'warning',
      });
    } catch (e) {
      hideConfirm();
      addToast({
        id: Date.now(),
        isImage: true,
        content: `삭제에 실패했습니다.`,
        type: 'error',
      });
      console.warn(e);
    }
  };

  const formatAmount = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) return '상한 없음';
    return `${amount.toLocaleString()}원`;
  };

  return (
    <>
      <TableWrapper>
        <thead>
          <TableHeader>
            <th>직급명</th>
            <th>하한값(이상)</th>
            <th>상한값(미만)</th>
            <th>수당율</th>
            <th>수정</th>
            <th>삭제</th>
          </TableHeader>
        </thead>
        <tbody>
          {data.map((it, idx) => (
            <TableItem key={idx}>
              <td className="name">
                {it.position?.name
                  ? UserPositionHangleEnum[it.position.name]
                  : '-'}
              </td>
              <td>{formatAmount(it.minThreshold)}</td>
              <td>{formatAmount(it.maxThreshold)}</td>
              {/* TODO: 백엔드 스키마 완성 후 departmentAllowanceRate로 교체 */}
              <td>{it.positionIncentiveRate}%</td>
              <td onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="primary"
                  onClick={() => onEdit(it.id)}
                >
                  수정
                </Button>
              </td>
              <td onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="black"
                  onClick={() =>
                    showConfirm({
                      isOpen: true,
                      title: '본부별 수당 삭제',
                      content: `${it.position?.name ? UserPositionHangleEnum[it.position.name] : '해당'} 직급의 수당을 삭제하시겠습니까?`,
                      cancelText: '취소',
                      confirmText: '삭제',
                      confirmVariant: 'primaryDanger',
                      onClose: hideConfirm,
                      onCancel: hideConfirm,
                      onConfirm: () =>
                        handleDelete(
                          it.id,
                          it.position?.name
                            ? UserPositionHangleEnum[it.position.name]
                            : '',
                        ),
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

export default DepartmentAllowanceListTable;

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
