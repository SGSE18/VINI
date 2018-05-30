import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// TODO 
let userLevel = 1;
ReactDOM.render(<App userLevel={userLevel}/>, document.getElementById('root'));
registerServiceWorker();