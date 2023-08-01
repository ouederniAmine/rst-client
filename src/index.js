import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect } from 'react';
import './index.css';
import App from './App';
import './i18n';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if (localStorage.getItem("lang") === "ar" ) {
  document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");

}

