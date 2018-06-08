import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { default as LoginPage, LoginPageNoRouter } from './LoginPage';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Login Page', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><LoginPage /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('change email state when changeing the input', () => {
        const wrapper = shallow(<LoginPageNoRouter />);
        const value = "abc"
        wrapper.find('#email').simulate('change', { target: { value: value } });
        expect(wrapper.state().email).toBe(value)
    });
    it('sets isEmailInvalid to true for an invalid email on blur', () => {
        const wrapper = shallow(<LoginPageNoRouter />);
        wrapper.find('#email').simulate('blur', { target: { value: 'a.com' } });
        wrapper.update();
        expect(wrapper.state().isEmailInvalid).toBeTruthy()
    });
    it('sets isEmailInvalid to false for a valid email on blur', () => {
        const wrapper = shallow(<LoginPageNoRouter />);
        wrapper.find('#email').simulate('blur', { target: { value: 'a@aol.com' } });
        wrapper.update();
        expect(wrapper.state().isEmailInvalid).toBeFalsy()
    });
});
