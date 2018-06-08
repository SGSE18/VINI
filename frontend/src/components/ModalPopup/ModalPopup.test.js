import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import ModalPopup from './ModalPopup';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('ModalPopup', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ModalPopup onClose={()=>{}} title="" description="" isOpen={false} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('doesnt render the cancel button when showCancelButton is false', () => {

    const wrapper = shallow(<ModalPopup onClose={()=>{}} title="" description="" isOpen={false} showCancelButton={false} />);
    const btnCancel = wrapper.dive().find('#btnCancel');
    expect(btnCancel.length).toBe(0);
  });
  it('calls onClose when clicking OK', () => {

    const onCloseDummy = jest.fn();
    const wrapper = shallow(<ModalPopup onClose={onCloseDummy} title="" description="" isOpen={false} />);
    const btnOk = wrapper.dive().find('#btnOk');
    btnOk.simulate('click');
    expect(onCloseDummy).toHaveBeenCalledTimes(1);
  });
  it('calls onClose with parameter true when clicking the ok button', () => {

    const onCloseDummy = jest.fn();
    const wrapper = shallow(<ModalPopup onClose={onCloseDummy} title="" description="" isOpen={false} />);
    const btnOk = wrapper.dive().find('#btnOk');
    btnOk.simulate('click');
    expect(onCloseDummy).toBeCalledWith(true)
  });
  it('calls onClose when clicking the cancel button', () => {

    const onCloseDummy = jest.fn();
    const wrapper = shallow(<ModalPopup onClose={onCloseDummy} title="" description="" isOpen={false} />);
    const btnCancel = wrapper.dive().find('#btnCancel');
    btnCancel.simulate('click');
    expect(onCloseDummy).toHaveBeenCalledTimes(1);
  });
  it('calls onClose with parameter false when clicking the cancel button', () => {

    const onCloseDummy = jest.fn();
    const wrapper = shallow(<ModalPopup onClose={onCloseDummy} title="" description="" isOpen={false} />);
    const btnCancel = wrapper.dive().find('#btnCancel');
    btnCancel.simulate('click');
    expect(onCloseDummy).toBeCalledWith(false);
  });
  it('calls onClose with parameter false when pressing ESC', () => {
    const onCloseDummy = jest.fn();
    const wrapper = shallow(<ModalPopup onClose={onCloseDummy} title="" description="" isOpen={false} />);
    wrapper.dive().find('#Modal').simulate('keyDown', {keyCode: 27});
    expect(onCloseDummy).toBeCalledWith(false);
  });


});
