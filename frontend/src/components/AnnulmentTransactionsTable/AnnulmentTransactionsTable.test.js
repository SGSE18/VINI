import React from 'react';
import ReactDOM from 'react-dom';
import AnnulmentTransactionsTable from './AnnulmentTransactionsTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AnnulmentTransactionsTable userLevel={0}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
