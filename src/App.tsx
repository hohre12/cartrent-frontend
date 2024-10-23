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
import SideNavigationBar, {
  SideBarMenu,
} from './components/sideNavigationBar/SideNavigationBar';
import CustomerList from './pages/Customer/List';
import Customer from './pages/Customer';
import GlobalNavigationBar from './components/globalNavigationBar/GlobalNavigationBar';
import { textS14Medium, textXs12Medium } from './styles/typography';
import Counsel from './pages/Counsel';
import Marketing from './pages/Marketing';
import Adjustment from './pages/Adjustment';

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
              <div>DashBoard</div>
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
            element={<Counsel></Counsel>}
          />
        </Route>
        <Route
          path="/marketing"
          element={<PrivateLayout />}
        >
          <Route
            index
            element={<Marketing></Marketing>}
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
