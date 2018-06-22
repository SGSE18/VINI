import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {popupStore} from './stores'

ReactDOM.render(<App popupStore={popupStore}/>, document.getElementById('root'));
registerServiceWorker();