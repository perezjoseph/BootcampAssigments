import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'
const TableItems = [{
    Month: 'Nov',
    Day: '17',
    Time: '5:00PM',
    DMV: 'Peter Smith'
}, {
    Month: 'Nov',
    Day: '18',
    Time: '9:00AM',
    DMV: 'Lucas Potter'
}];
const navItems = ['Home', 'Schedule', 'Tests', 'Contacts'];
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App navItems={navItems} tableItems={TableItems} />
  </React.StrictMode>
);



