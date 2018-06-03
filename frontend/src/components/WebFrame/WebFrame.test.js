import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import WebFrame from './WebFrame';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><WebFrame /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
