import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { AddEntryContainer } from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><AddEntryContainer preownerCount={0} vin=""/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
