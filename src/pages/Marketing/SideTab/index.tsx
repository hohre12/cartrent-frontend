import { SvgIcon } from '@/components/common/SvgIcon';
import { useState } from 'react';
import styled from 'styled-components';

const MarketingSideTab = () => {
  const [activeMenu, setActiveMenu] = useState<'marketing' | 'sendText'>(
    'marketing',
  );
  return (
    <MarketingSideTabWrapper>
      <SideTabMenu>
        <li
          className={activeMenu === 'marketing' ? 'active' : ''}
          onClick={() => setActiveMenu('marketing')}
        >
          <SvgIcon iconName="icon-arrow_up_s" />
          고객마케팅
        </li>
        <li
          className={activeMenu === 'sendText' ? 'active' : ''}
          onClick={() => setActiveMenu('sendText')}
        >
          <SvgIcon iconName="icon-arrow_up_s" />
          자동문자전송
        </li>
      </SideTabMenu>
    </MarketingSideTabWrapper>
  );
};

export default MarketingSideTab;

const MarketingSideTabWrapper = styled.div`
  background: #eee;
  width: 200px;
  height: calc(100vh - 60px);
  margin-right: auto;
  border-right: 1px solid #ddd;
`;
const SideTabMenu = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    border-bottom: 1px solid #ddd;
    padding: 10px;
    text-align: left;
    display: flex;
    gap: 5px;
    align-items: center;
    cursor: pointer;
    &.active {
      background: #fff;
      font-weight: 600;
    }
  }
`;
