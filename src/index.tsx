import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';

import App from './app';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-less/semantic.less';
import {
  LOCAL_STORAGE_LAST_NAME_KEY,
  LOCAL_STORAGE_UNIT_ID_KEY,
  LOCAL_STORAGE_UNIT_KEY,
} from './contants';

localStorage.setItem(LOCAL_STORAGE_LAST_NAME_KEY, '');
localStorage.setItem(LOCAL_STORAGE_UNIT_ID_KEY, '');
localStorage.setItem(LOCAL_STORAGE_UNIT_KEY, '');

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root'),
);
