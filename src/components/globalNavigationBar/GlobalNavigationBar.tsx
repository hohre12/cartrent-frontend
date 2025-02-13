import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { tokenState, userState } from '@/state/auth';
import LocalStorage from '@/utils/localStorage';
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '@/constants/common';
import { SIDE_MENU } from '@/constants/menu';
import { SvgIcon } from '../common/SvgIcon';
import Button from '../button/Button';
import { useSignOut } from '@/services/auth';

const GlobalNavigationBar = () => {
  const location = useLocation();
  const resetToken = useResetRecoilState(tokenState);
  const resetUser = useResetRecoilState(userState);
  const user = useRecoilValue(userState);
  const { signOut } = useSignOut();

  const handleLogout = async () => {
    try {
      const response = await signOut();
      if (response && response.data?.signOut === 'success') {
        resetToken();
        resetUser();
        LocalStorage.removeItem(TOKEN_KEY);
        LocalStorage.removeItem(REFRESH_TOKEN_KEY);
        LocalStorage.removeItem('institute');
      }
    } catch (e) {
      console.warn('로그아웃 에러', e);
    }
  };
  const pageName =
    SIDE_MENU.find((it) => it.path === location.pathname)?.title ?? '대시보드';

  return (
    <>
      <GlobalNavigationBarWrapper>
        <RouteWrapper>
          <p>카트렌트카 /</p>
          <b>{pageName}</b>
        </RouteWrapper>
        <GlobalFunctionWrapper>
          <Button
            variant="white"
            configuration="stroke"
            onClick={handleLogout}
          >
            로그아웃
          </Button>
          <div className="userInfo">
            <SvgIcon iconName="icon-memberDefault" />
            <h3>{user?.name ? `${user.name}님` : '-'}</h3>
          </div>
        </GlobalFunctionWrapper>
      </GlobalNavigationBarWrapper>
    </>
  );
};

export default GlobalNavigationBar;

export const GlobalNavigationBarWrapper = styled.div`
  width: calc(100% - 150px);
  height: 60px;
  padding: 0 30px;
  background: #fff;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 150px;
  border-bottom: 1px solid #e1e0dd;
`;

const RouteWrapper = styled.div`
  display: flex;
  gap: 5px;
  p,
  b {
    font-size: 14px;
  }
`;

export const GlobalFunctionWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  & > span {
    padding: 10px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    height: 24px;
    display: flex;
    align-items: center;
  }
  .userInfo {
    padding: 10px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    gap: 5px;
    height: 24px;
    align-items: center;
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const CounselModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .InputWrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    & > div {
      display: flex;
      width: 49%;
      gap: 5px;
      & > span {
        width: 50px;
      }
    }
  }
  .TextAreaWrapper {
    display: flex;
    gap: 5px;
    & > span {
      width: 50px;
    }
  }
`;
