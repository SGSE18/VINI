import React from 'react';
import ReactDOM from 'react-dom';
import ManageUserForm  from './ManageUserForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManageUserForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
