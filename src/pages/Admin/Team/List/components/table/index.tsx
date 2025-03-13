import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { Team } from '@/types/graphql';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type TTableProps = {
  data: Team[];
};

const TeamListTable = ({ data }: TTableProps) => {
  const navigate = useNavigate();
  const renderRows = (items: Team[], level = 0) => {
    return items.map((it, idx) => (
      <React.Fragment key={it.id}>
        <TableItem onClick={() => navigate(`${it.id}`)}>
          <td
            className="name"
            style={{ paddingLeft: `${level * 20 + 15}px` }}
          >
            {it.name}
          </td>
        </TableItem>
        {it.subTeams &&
          it.subTeams.length > 0 &&
          renderRows(it.subTeams, level + 1)}
      </React.Fragment>
    ));
  };
  return (
    <>
      <TableWrapper>
        <thead>
          <TableHeader>
            <th>팀명</th>
          </TableHeader>
        </thead>
        <tbody>
          {renderRows(data)}
          {/* {data.map((it, idx) => (
            <TableItem
              key={idx}
              onClick={() => navigate(`${it.id}`)}
            >
              <td className="name">{it.name}</td>
            </TableItem>
          ))} */}
        </tbody>
      </TableWrapper>
    </>
  );
};

export default TeamListTable;

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
