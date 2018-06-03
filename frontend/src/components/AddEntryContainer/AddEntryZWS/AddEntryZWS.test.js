import React from 'react';
import ReactDOM from 'react-dom';
import AddEntryZWS from './AddEntryZWS';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddEntryZWS labelStyle={{}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
