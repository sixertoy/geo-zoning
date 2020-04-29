import './css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { version } from '../package.json';
import App from './App';

// eslint-disable-next-line
console.log('Version : v', version);

ReactDOM.render(
  // eslint-disable-next-line
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
