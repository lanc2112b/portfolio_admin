import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { UserProvider } from "./contexts/User";
import { MessageProvider } from "./contexts/Message";

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <MessageProvider>
          <UserProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </UserProvider>
        </MessageProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
);
