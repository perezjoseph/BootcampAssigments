import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './myApp';
import './App.css';
import { cardItems } from './cardObjects.js';
const navItems = ['Home', 'Schedule', 'Contacts', 'About'];

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App navItems={navItems} cardItems={cardItems} />
  </React.StrictMode>
);



