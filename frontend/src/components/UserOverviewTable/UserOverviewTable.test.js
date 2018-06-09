import React from 'react';
import ReactDOM from 'react-dom';
import UserOverviewTable from './UserOverviewTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserOverviewTable userLevel={0}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
