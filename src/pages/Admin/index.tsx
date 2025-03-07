import styled from 'styled-components';
import AdminSideTab from './SideTab';
import { Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <>
      <AdminWrapper>
        <AdminSideTab></AdminSideTab>
        <AdminContentWrapper>
          <Outlet />
        </AdminContentWrapper>
      </AdminWrapper>
    </>
  );
};

export default AdminPage;

const AdminWrapper = styled.div`
  display: flex;
`;
const AdminContentWrapper = styled.div`
  width: calc(100% - 100px);
`;
