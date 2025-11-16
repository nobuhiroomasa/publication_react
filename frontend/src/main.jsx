import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { CmsDataProvider } from './context/CmsDataContext.jsx';
import './styles/app.css';
import './styles/admin.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CmsDataProvider>
        <App />
      </CmsDataProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
