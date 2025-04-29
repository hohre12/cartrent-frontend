import Button from '@/components/button/Button';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { useDeleteCar } from '@/services/car';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { Brand, Car, Team } from '@/types/graphql';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type TTableProps = {
  data: Brand[];
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
            {/* <th>국산/수입</th>
            <th>차량 수수료</th>
            <th>삭제</th> */}
          </TableHeader>
        </thead>
        <tbody>
          {data.map((it, idx) => (
            <React.Fragment key={idx}>
              <TableItem style={{ cursor: 'default' }}>
                <td className="name">{it.name}</td>
              </TableItem>
              {it.cars &&
                it.cars.length > 0 &&
                it.cars.map((car, carIdx) => (
                  <TableItem
                    key={carIdx}
                    onClick={() => navigate(`${car.id}`)}
                  >
                    <td
                      className="name"
                      style={{ paddingLeft: `40px` }}
                    >
                      {car.name}
                    </td>
                  </TableItem>
                ))}
            </React.Fragment>
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
