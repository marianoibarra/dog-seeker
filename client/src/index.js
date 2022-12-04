import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Routes';
import reportWebVitals from './utils/reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
