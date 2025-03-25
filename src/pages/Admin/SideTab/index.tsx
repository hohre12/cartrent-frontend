import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AdminSideTab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/admin') {
      navigate('user');
    }
  }, [location.pathname]);
  return (
    <>
      <AdminSideTabWrapper>
        <SideTabMenu>
          <SideTabItem
            $isActive={location.pathname.includes('/admin/user').toString()}
            onClick={() => navigate('user')}
          >
            <p>직원관리</p>
          </SideTabItem>
          <SideTabItem
            $isActive={location.pathname.includes('/admin/team').toString()}
            onClick={() => navigate('team')}
          >
            <p>팀관리</p>
          </SideTabItem>
          <SideTabItem
            $isActive={location.pathname.includes('/admin/city').toString()}
            onClick={() => navigate('city')}
          >
            <p>지역관리</p>
          </SideTabItem>
          <SideTabItem
            $isActive={location.pathname.includes('/admin/group').toString()}
            onClick={() => navigate('group')}
          >
            <p>고객그룹관리</p>
          </SideTabItem>
          <SideTabItem
            $isActive={location.pathname.includes('/admin/grade').toString()}
            onClick={() => navigate('grade')}
          >
            <p>고객등급관리</p>
          </SideTabItem>
        </SideTabMenu>
      </AdminSideTabWrapper>
    </>
  );
};

export default AdminSideTab;

const AdminSideTabWrapper = styled.div`
  background: #eee;
  width: 100px;
  height: calc(100vh - 60px);
  margin-right: auto;
  border-right: 1px solid #ddd;
`;
const SideTabMenu = styled.ul`
  display: flex;
  flex-direction: column;
`;
const SideTabItem = styled.li<{ $isActive: string }>`
  border-bottom: 1px solid #ddd;
  padding: 18px;
  text-align: left;
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  background: ${(props) => (props.$isActive === 'true' ? '#fff' : '')};
  p {
    font-weight: ${(props) => (props.$isActive === 'true' ? '700' : '500')};
  }
`;
