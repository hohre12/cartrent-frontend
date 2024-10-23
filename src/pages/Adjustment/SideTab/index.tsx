import { useState } from 'react';
import styled from 'styled-components';

const AdjustmentSideTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('monthly');
  return (
    <AdjustmentSideTabWrapper>
      <MenuItem
        active={selectedPeriod === 'daily'}
        onClick={() => setSelectedPeriod('daily')}
      >
        메뉴
      </MenuItem>
      <MenuItem
        active={selectedPeriod === 'weekly'}
        onClick={() => setSelectedPeriod('weekly')}
      >
        구성
      </MenuItem>
      <MenuItem
        active={selectedPeriod === 'monthly'}
        onClick={() => setSelectedPeriod('monthly')}
      >
        하면
      </MenuItem>
      <MenuItem
        active={selectedPeriod === 'yearly'}
        onClick={() => setSelectedPeriod('yearly')}
      >
        됩니다.
      </MenuItem>
    </AdjustmentSideTabWrapper>
  );
};

export default AdjustmentSideTab;

const AdjustmentSideTabWrapper = styled.div`
  width: 200px;
  background-color: #2c3e50;
  padding: 20px;
`;

export const MenuItem = styled.div<{ active: boolean }>`
  color: ${(props) => (props.active ? '#3498db' : '#ecf0f1')};
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #34495e;
  }
`;
