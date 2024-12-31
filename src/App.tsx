import { ReactNode } from 'react';
import './App.css';
import {
  Navigate,
  Routes as ReactRouterRoutes,
  Route,
  Outlet,
} from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tokenState } from './state/auth';
import { createGlobalStyle } from 'styled-components';
import Login from './pages/Auth/Login';
import SideNavigationBar from './components/sideNavigationBar/SideNavigationBar';
import GlobalNavigationBar from './components/globalNavigationBar/GlobalNavigationBar';
import { textXs12Medium } from './styles/typography';
import Adjustment from './pages/Adjustment';
import Inquiry from './pages/Inquiry';
import Dashboard from './pages/Dashboard';
import CustomerList from './pages/Customer/List';
import CustomerDetail from './pages/Customer/Detail';
import Toast from './components/toast/Toast';
import Confirm from './components/confirm/Confirm';
import CounselDetail from './pages/Counsel/Detail';
import CounselList from './pages/Counsel/List';
import ContractList from './pages/Contract/List';
import ContractDetail from './pages/Contract/Detail';

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
            element={<CustomerList></CustomerList>}
          />
          <Route
            path=":id"
            element={<CustomerDetail></CustomerDetail>}
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
        </Route>
        <Route
          path="/specification"
          element={<PrivateLayout />}
        >
          <Route
            index
            element={<CustomerList></CustomerList>}
          />
        </Route>
        <Route
          path="/adjustment"
          element={<PrivateLayout />}
        >
          <Route
            index
            element={<Adjustment></Adjustment>}
          />
        </Route>
        <Route
          path="/delivery"
          element={<PrivateLayout />}
        >
          <Route
            index
            element={<CustomerList></CustomerList>}
          />
        </Route>
        <Route
          path="/auth"
          element={<PrivateLayout />}
        >
          <Route
            index
            element={<CustomerList></CustomerList>}
          />
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
`;
