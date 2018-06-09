import React from 'react';
import ReactDOM from 'react-dom';
import TransactionOverviewTable from './TransactionOverviewTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TransactionOverviewTable userLevel={0}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
