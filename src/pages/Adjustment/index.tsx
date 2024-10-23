import styled from 'styled-components';
import AdjustmentSideTab from './SideTab';
import AdjustmentList from './List';

const Adjustment = () => {
  return (
    <AdjustmentWrapper>
      <AdjustmentSideTab></AdjustmentSideTab>
      <AdjustmentList></AdjustmentList>
    </AdjustmentWrapper>
  );
};

export default Adjustment;

export const AdjustmentWrapper = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  background-color: #f5f7fa;
`;
