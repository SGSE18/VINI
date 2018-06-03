import React from 'react';
import ReactDOM from 'react-dom';
import AddEntryTUEV from './AddEntryTUEV';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddEntryTUEV labelStyle={{}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
