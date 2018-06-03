import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import AddEntryButton from './AddEntryButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><AddEntryButton /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
  fail();
});
