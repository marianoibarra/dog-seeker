import React from 'react';
import { createRoot } from 'react-dom/client';
import Router from './routes';
import reportWebVitals from './utils/reportWebVitals';
import './index.css';
import store from './redux/store'
import { Provider } from 'react-redux'

const container = document.getElementById('root');
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <Router />
  </Provider>
);

reportWebVitals();
