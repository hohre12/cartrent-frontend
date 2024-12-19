import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import theme from './styles/variables';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client.ts';

// const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <RecoilRoot>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        {/* auto complete is not avaliable for theme */}
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  </RecoilRoot>,
);
