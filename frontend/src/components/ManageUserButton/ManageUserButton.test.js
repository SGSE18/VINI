import React from 'react';
import ReactDOM from 'react-dom';
import ManageUserButton  from './ManageUserButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManageUserButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
