import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { BillingProvider } from './context/BillingContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <EmployeeProvider>
        <BillingProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BillingProvider>
      </EmployeeProvider>
    </AuthProvider>
  </React.StrictMode>
);