import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';

import App from './app';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-less/semantic.less';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root'),
);
