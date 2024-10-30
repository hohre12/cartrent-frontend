import { SvgIcon } from '@/components/common/SvgIcon';
import { useState } from 'react';
import styled from 'styled-components';

const InquirySideTab = () => {
  const [activeMenu, setActiveMenu] = useState<'Inquiry' | 'sendText'>(
    'Inquiry',
  );
  return (
    <InquirySideTabWrapper>
      <SideTabMenu>
        <li
          className={activeMenu === 'Inquiry' ? 'active' : ''}
          onClick={() => setActiveMenu('Inquiry')}
        >
          <SvgIcon iconName="icon-arrow_up_s" />
          로그인내역
        </li>
        <li
          className={activeMenu === 'sendText' ? 'active' : ''}
          onClick={() => setActiveMenu('sendText')}
        >
          <SvgIcon iconName="icon-arrow_up_s" />
          삭제내역
        </li>
      </SideTabMenu>
    </InquirySideTabWrapper>
  );
};

export default InquirySideTab;

const InquirySideTabWrapper = styled.div`
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
