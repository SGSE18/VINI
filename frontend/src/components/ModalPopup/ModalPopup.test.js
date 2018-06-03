import React from 'react';
import ReactDOM from 'react-dom';
import { ModalPopup } from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModalPopup onClose={()=>{}} title="" description="" isOpen={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
