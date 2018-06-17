import React from 'react';
import ReactDOM from 'react-dom';
import AnullmentTransactionsTable from './AnullmentTransactionsTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AnullmentTransactionsTable userLevel={0}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
