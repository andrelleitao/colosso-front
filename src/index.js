import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './i18n';
import Loading from './core/components/loading';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loading loading={true}/>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);