import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { IdentityContextProvider } from 'react-netlify-identity';

const url = import.meta.env.VITE_NETLIFY_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IdentityContextProvider url={url}>
      <App />
    </IdentityContextProvider>
  </React.StrictMode>,
);