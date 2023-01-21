import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import AppRouter from './routes/AppRouter';
import store from './store/store';
import theme from './theme/theme';
import './theme/main.scss';

// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
