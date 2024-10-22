import { COUNSEL_LIST_WATCH_OPTIONS } from '@/constants/counsel';
import { dummyCounselList } from '@/dummy/counsel';
import {
  selectedCounselHideWatchOptionsState,
  selectedCounselIdxState,
} from '@/state/counsel';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import { isColumnsViewHide } from '@/utils/common';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

const CounselListTable = () => {
  const selectedCounselHideWatchOptions = useRecoilValue(
    selectedCounselHideWatchOptionsState,
  );
  const [selectedCounselIdx, setSelectedCounselIdx] = useRecoilState(
    selectedCounselIdxState,
  );
  const handleCounselClick = useCallback(
    (idx: number) => {
      setSelectedCounselIdx(idx);
    },
    [setSelectedCounselIdx],
  );
  return (
    <CounselListTableWrapper>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          {Object.entries(COUNSEL_LIST_WATCH_OPTIONS).map(([key, value]) => {
            return (
              !isColumnsViewHide(selectedCounselHideWatchOptions, key) && (
                <th key={key}>{value}</th>
              )
            );
          })}
        </tr>
      </thead>
      <tbody>
        {dummyCounselList.map((it, idx) => (
          <tr
            key={idx}
            className={selectedCounselIdx === it.id ? 'active' : ''}
            onClick={() => handleCounselClick(it.id)}
          >
            <td>{idx}</td>
            <td>수정</td>
            <td>삭제</td>
            <td>{it.created_at}</td>
            <td>{it.name}</td>
            <td>{it.phone}</td>
            <td>{it.counselType}</td>
            <td>{it.result}</td>
            <td>{it.counselCustomer}</td>
            <td>{it.counselName}</td>
            <td>{it.counselContent}</td>
            <td>{it.address}</td>
            <td>{it.customerGroup}</td>
            <td>{it.product}</td>
            <td>{it.anotherPhone}</td>
            <td>{it.carType}</td>
            <td>{it.type}</td>
            <td>{it.date}</td>
            <td>{it.percent}</td>
            <td>{it.customerType}</td>
            <td>{it.option}</td>
            <td>{it.isIng}</td>
            <td>{it.etc}</td>
            <td>{it.company}</td>
          </tr>
        ))}
      </tbody>
    </CounselListTableWrapper>
  );
};

export default CounselListTable;

export const CounselListTableWrapper = styled.table`
  height: calc(100% - 40px);
  display: block;
  text-align: center;
  thead {
    position: sticky;
    top: -1px;
    z-index: 10;
    background: #ddd;
    th {
      height: 40px;
      ${titleS14Semibold}
      width: 100vw;
      border: 1px solid #eee;
    }
  }
  tbody {
    tr {
      cursor: pointer;
      &.active {
        background: #ccf0ff;
      }
      &:hover {
        background: #f5f5f5;
      }
      td {
        height: 40px;
        overflow: hidden;
        padding: 0px 15px;
        max-width: 150px;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
        border: 1px solid #eee;
        ${textS14Regular}
      }
    }
  }
`;
