import styled from 'styled-components';
import { textXxs10Medium } from './typography';

export const FilterContent = styled.div`
  position: relative;
`;
export const Circle = styled.div`
  ${textXxs10Medium}
  display: flex;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: #333;
  color: #fff;
  text-align: center;
  line-height: 16px;
`;
