import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { ManageUserButton } from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><ManageUserButton /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
