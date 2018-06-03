import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { LoginButton } from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><LoginButton authorityLevel={0} onLogOut={()=>{}}/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
