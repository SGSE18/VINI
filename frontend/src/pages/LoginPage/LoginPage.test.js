import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import LoginPage from './LoginPage';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Login Page', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><LoginPage /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it.skip('returns false for invalid email', () => {
        // how???
        const test = <BrowserRouter><LoginPage /></BrowserRouter>;
        const wrapper = shallow(test);
        wrapper.dive().find('#email').simulate('change', { target: { value: 'a@.com' } });
        expect(wrapper.state().isEmailInvalid).to.equal(false);
    });
});
