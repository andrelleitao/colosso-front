import React from 'react';
import Routes from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import './styles/global.scss';

function App() {
  return (
    <div className="App">      
      <Routes />            
      <NotificationContainer />
    </div>
  );
}

export default App;
