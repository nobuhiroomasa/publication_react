import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { CmsDataProvider } from './context/CmsDataContext.jsx';
import './styles/app.css';
import './styles/admin.css';

const routerMode = import.meta.env.VITE_ROUTER_MODE?.toLowerCase();
const Router = routerMode === 'hash' ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <CmsDataProvider>
        <App />
      </CmsDataProvider>
    </Router>
  </React.StrictMode>,
);
