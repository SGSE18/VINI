import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { VinSearch } from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><VinSearch /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
