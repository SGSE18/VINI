import React from 'react';
import ReactDOM from 'react-dom';
import { LoginButton } from '../';
import WebFrame from './WebFrame';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('WebFrame', () => {
  configure({ adapter: new Adapter() });
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WebFrame />);
  })

  it.skip('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WebFrame> </WebFrame>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('contains 1 LoginButton', () => {
    expect(wrapper.find(LoginButton).length).toBe(1);
  });
});