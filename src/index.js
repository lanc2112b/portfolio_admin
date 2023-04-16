import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { UserProvider } from "./contexts/User";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MessageProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </MessageProvider>
    </BrowserRouter>
  </React.StrictMode >
);
