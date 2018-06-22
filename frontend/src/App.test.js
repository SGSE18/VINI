import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {popupStore} from './stores'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App popupStore={popupStore} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
