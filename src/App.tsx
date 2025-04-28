import { ReactNode, useEffect } from 'react';
import './App.css';
import {
  Navigate,
  Routes as ReactRouterRoutes,
  Route,
  Outlet,
} from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { tokenState } from './state/auth';
import { createGlobalStyle } from 'styled-components';
import Login from './pages/Auth/Login';
import SideNavigationBar from './components/sideNavigationBar/SideNavigationBar';
import GlobalNavigationBar from './components/globalNavigationBar/GlobalNavigationBar';
import { textXs12Medium } from './styles/typography';
import Dashboard from './pages/Dashboard';
import Toast from './components/toast/Toast';
import Confirm from './components/confirm/Confirm';
import CounselDetail from './pages/Counsel/Detail';
import CounselList from './pages/Counsel/List';
import ContractList from './pages/Contract/List';
import ContractDetail from './pages/Contract/Detail';
import Customer from './pages/Customer';
import ContractRegist from './pages/Contract/Regist';
import DeliveryList from './pages/Delivery/List';
import PayStubList from './pages/PayStub/List';
import PayStubDetail from './pages/PayStub/Detail';
import AdjustmentList from './pages/Adjustment/List';
import AdminPage from './pages/Admin';
import AdminUserList from './pages/Admin/User/List';
import AdminTeamList from './pages/Admin/Team/List';
import AdminCityList from './pages/Admin/City/List';
import AdminTeamDetail from './pages/Admin/Team/Detail';
import AdminUserDetail from './pages/Admin/User/Detail';
import { HEALTH_CHECK_TIME } from './constants/common';
import { useCheckNewNotifications } from './services/notification';
import { notificationIsNewState } from './state/notification';
import AdminCustomerGroupList from './pages/Admin/CustomerGroup/List';
import AdminCustomerGradeList from './pages/Admin/CustomerGrade/List';
import AdminNoticeList from './pages/Admin/Notice/List';
import AdminNoticeDetail from './pages/Admin/Notice/Detail';
import AdminBrandList from './pages/Admin/Brand/List';
import AdminBrandDetail from './pages/Admin/Brand/Detail';
import AdminCarList from './pages/Admin/Car/List';
import AdminCarDetail from './pages/Admin/Car/Detail';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isToken = useRecoilValue(tokenState);
  return isToken ? (
    <div className="wrapper">{children}</div>
  ) : (
    <Navigate
      replace
      to="/login"
    />
  );
};

const PrivateLayout = () => {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
};

function App() {
  const [token, setToken] = useRecoilState(tokenState);
  const setNotificationIsNew = useSetRecoilState(notificationIsNewState);
  const { data, refetch: checkNewNotifications } = useCheckNewNotifications();

  useEffect(() => {
    if (token) {
      const intervalId = setInterval(() => {
        checkNewNotifications();
      }, HEALTH_CHECK_TIME);
      return () => clearInterval(intervalId);
    }
  }, [token, checkNewNotifications]);

  useEffect(() => {
    if (data?.checkNewNotifications !== undefined) {
      setNotificationIsNew(data.checkNewNotifications);
    }
  }, [data, setNotificationIsNew]);

  return (
    <div className="App">
      {token && <GlobalNavigationBar />}
      {token && <SideNavigationBar />}
      <GlobalStyle />
      <ReactRouterRoutes>
        <Route
          path="/login"
          element={<Login></Login>}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>
          }
        />
        <Route
          path="/customer"
          element={<PrivateLayout />}
        >
          <Route
            index
            element={<Customer></Customer>}
          />
        </Route>
        <Route
          path="/counsel"
          element={<PrivateLayout />}
        >
          <Route
            index
            element={<CounselList></CounselList>}
          />
          <Route
            path=":id"
            element={<CounselDetail></CounselDetail>}
          />
        </Route>
        <Route
          path="/contract"
          element={<PrivateLayout />}
        >
          <Route
            index
            element={<ContractList></ContractList>}
          />
          <Route
            path=":id"
            element={<ContractDetail></ContractDetail>}
          />
          <Route
            path="regist/:id"
            element={<ContractRegist></ContractRegist>}
          />
          <Route
            path="regist"
            element={<ContractRegist></ContractRegist>}
          />
        </Route>
        <Route
          path="/payStub"
          element={<PrivateLayout />}
        >
          <Route
            index
            element={<PayStubList></PayStubList>}
          />
          <Route
            path=":id"
            element={<PayStubDetail></PayStubDetail>}
          />
        </Route>
        <Route
          path="/adjustment"
          element={<PrivateLayout />}
        >
          <Route
            index
            element={<AdjustmentList></AdjustmentList>}
          />
        </Route>
        <Route
          path="/delivery"
          element={<PrivateLayout />}
        >
          <Route
            index
            element={<DeliveryList></DeliveryList>}
          />
        </Route>
        <Route
          path="/admin"
          element={<PrivateLayout />}
        >
          <Route
            path=""
            element={<AdminPage></AdminPage>}
          >
            <Route
              path="user"
              element={<AdminUserList />}
            />
            <Route
              path="user/:id"
              element={<AdminUserDetail />}
            />
            <Route
              path="team"
              element={<AdminTeamList />}
            />
            <Route
              path="team/:id"
              element={<AdminTeamDetail />}
            />
            <Route
              path="city"
              element={<AdminCityList />}
            />
            <Route
              path="group"
              element={<AdminCustomerGroupList />}
            />
            <Route
              path="grade"
              element={<AdminCustomerGradeList />}
            />
            <Route
              path="notice"
              element={<AdminNoticeList />}
            />
            <Route
              path="notice/:id"
              element={<AdminNoticeDetail />}
            />
            <Route
              path="brand"
              element={<AdminBrandList />}
            />
            <Route
              path="brand/:id"
              element={<AdminBrandDetail />}
            />
            <Route
              path="car"
              element={<AdminCarList />}
            />
            <Route
              path="car/:id"
              element={<AdminCarDetail />}
            />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Navigate
                replace
                to="/dashboard"
              />
            </PrivateRoute>
          }
        />
      </ReactRouterRoutes>
      <Confirm></Confirm>
      <Toast></Toast>
    </div>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
* { 
 box-sizing: border-box;
 ${textXs12Medium}
}
:root {
  /* --System-Token-color-bg-bg-neutral-tertiary: black; */
}
div::-webkit-scrollbar,
section::-webkit-scrollbar,
ul::-webkit-scrollbar,
table::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}
div::-webkit-scrollbar-thumb,
section::-webkit-scrollbar-thumb,
ul::-webkit-scrollbar-thumb,
table::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  background-clip: padding-box;
  border: 3px solid transparent;
}
div::-webkit-scrollbar-track,
section::-webkit-scrollbar-track,
ul::-webkit-scrollbar-track,
table::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 6px;
}
`;
