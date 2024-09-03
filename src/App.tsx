import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import './App.css'
import { useRecoilState } from 'recoil';

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

function App() {
    // const [token, setToken] = useRecoilState(tokenState);

  return (
    <div className="App">
      
    </div>
  )
}

export default App
