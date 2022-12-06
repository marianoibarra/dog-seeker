import React from 'react';
import ReactDOM from 'react-dom';
import Router from './rutas.js';
import reportWebVitals from './utils/reportWebVitals';
import './index.css';
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
