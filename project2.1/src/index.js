import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './myApp';
import './App.css';
const navItems = ['Home', 'About'];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App navItems={navItems} />
  </React.StrictMode>
);



