import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CompanyProvider } from './context/CompanyContext';
import { ThemeProvider } from './context/ThemeContext';
import { PayrollPeriodProvider } from './context/PayrollPeriodContext';
import { AppRoutes } from './routes/AppRoutes';
import './styles/globals.css';
import './styles/responsive.css';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CompanyProvider>
            <PayrollPeriodProvider>
              <AppRoutes />
            </PayrollPeriodProvider>
          </CompanyProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
