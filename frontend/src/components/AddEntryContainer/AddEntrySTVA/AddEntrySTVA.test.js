import React from 'react';
import ReactDOM from 'react-dom';
import AddEntrySTVA from './AddEntrySTVA';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddEntrySTVA labelStyle={{}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
