import React from 'react';
import ReactDOM from 'react-dom';
import TransactionOverviewTable from './TransactionOverviewTable';
import { authenticationStore, dataStore, popupStore } from '../../stores';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TransactionOverviewTable dataStore= {dataStore} userLevel={0}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
