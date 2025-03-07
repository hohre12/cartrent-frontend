import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { City, Team } from '@/types/graphql';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type TTableProps = {
  data: City[];
};

const CityListTable = ({ data }: TTableProps) => {
  const navigate = useNavigate();
  return (
    <>
      <TableWrapper>
        <thead>
          <TableHeader>
            <th>지역명</th>
          </TableHeader>
        </thead>
        <tbody>
          {data.map((it, idx) => (
            <TableItem
              key={idx}
              onClick={() => navigate(`${it.id}`)}
            >
              <td className="name">{it.name}</td>
            </TableItem>
          ))}
        </tbody>
      </TableWrapper>
    </>
  );
};

export default CityListTable;

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
