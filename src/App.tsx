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
import SideMenuBar, { SideBarMenu } from './components/sideMenuBar/SideMenuBar';

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
      {token && <SideMenuBar />}
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
          path="/list"
          element={<PrivateLayout />}
        >
          <Route
            index
            element={<div>List</div>}
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
}
:root {
  /* --System-Token-color-bg-bg-neutral-tertiary: black; */
}
`;
