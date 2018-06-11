import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import HomePage from './HomePage';
import { Button } from '@material-ui/core';
import { authenticationStore } from '../../stores';
import { AddEntryButton, VinSearch, TransactionOverviewTable } from '../../components';
import { USER_LEVEL } from '../../constants';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// TODO parameterized tests
describe('HomePage', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<HomePage />);
    })

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><HomePage /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('contains 1 VinSearch and 1 TransactionOverviewTable', () => {
        expect(wrapper.find(VinSearch).length).toBe(1);
        expect(wrapper.find(TransactionOverviewTable).length).toBe(1);
    });

    it('contains no AddEntryButton when not logged in', () => {
        authenticationStore.userLevel = USER_LEVEL.NOT_LOGGED_IN;
        wrapper = shallow(<HomePage />);
        expect(wrapper.find(AddEntryButton).length).toBe(0);
    });
    it('contains no AddEntryButton when not logged in', () => {
        authenticationStore.userLevel = -1;
        wrapper = shallow(<HomePage />);
        expect(wrapper.find(AddEntryButton).length).toBe(0);
    });
    it('contains 1 AddEntryButton when logged in as ASTVA', () => {
        authenticationStore.userLevel = USER_LEVEL.ASTVA;
        wrapper = shallow(<HomePage />);
        expect(wrapper.find(AddEntryButton).length).toBe(1);
    });
    it('contains 1 AddEntryButton when logged in as STVA', () => {
        authenticationStore.userLevel = USER_LEVEL.STVA;
        wrapper = shallow(<HomePage />);
        expect(wrapper.find(AddEntryButton).length).toBe(1);
    });
    it('contains 1 AddEntryButton when logged in as ZWS', () => {
        authenticationStore.userLevel = USER_LEVEL.ZWS;
        wrapper = shallow(<HomePage />);
        expect(wrapper.find(AddEntryButton).length).toBe(1);
    });
    it('contains 1 AddEntryButton when logged in as TUEV', () => {
        authenticationStore.userLevel = USER_LEVEL.TUEV;
        wrapper = shallow(<HomePage />);
        expect(wrapper.find(AddEntryButton).length).toBe(1);
    });

    it('contains 1 Button (user management) when logged in as ASTVA', () => {
        authenticationStore.userLevel = USER_LEVEL.ASTVA;
        wrapper = shallow(<HomePage />);
        expect(wrapper.find(Button).length).toBe(1);
    });

    it('contains 0 Button (user management) when logged in as STVA', () => {
        authenticationStore.userLevel = USER_LEVEL.STVA;
        wrapper = shallow(<HomePage />);
        expect(wrapper.find(Button).length).toBe(0);
    });
    it('contains 0 Button (user management) when logged in as TUEV', () => {
        authenticationStore.userLevel = USER_LEVEL.TUEV;
        wrapper = shallow(<HomePage />);
        expect(wrapper.find(Button).length).toBe(0);
    });
    it('contains 0 Button (user management) when logged in as ZWS', () => {
        authenticationStore.userLevel = USER_LEVEL.ZWS;
        wrapper = shallow(<HomePage />);
        expect(wrapper.find(Button).length).toBe(0);
    });
    it('contains 0 Button (user management) when not logged in', () => {
        authenticationStore.userLevel = USER_LEVEL.NOT_LOGGED_IN;
        wrapper = shallow(<HomePage />);
        expect(wrapper.find(Button).length).toBe(0);
    });

    it('toggles the toggleUserGUI state when clicking on user management button', () => {
        authenticationStore.userLevel = USER_LEVEL.ASTVA;
        wrapper = shallow(<HomePage />);
        const startState = wrapper.state().isUserManagmentGUIOpen
        wrapper.find(Button).simulate('click')
        const firstClickState =  wrapper.state().isUserManagmentGUIOpen;
        expect(firstClickState).not.toBe(startState);
        wrapper.find(Button).simulate('click')
        let secondClickState =  wrapper.state().isUserManagmentGUIOpen;
        expect(secondClickState).not.toBe(firstClickState);
    });
});