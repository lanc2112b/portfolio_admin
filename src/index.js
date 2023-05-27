import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App';
import { UserProvider } from "./contexts/User";
import { MessageProvider } from "./contexts/Message";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <MessageProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </MessageProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>

);
