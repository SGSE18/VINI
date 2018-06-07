import React from 'react';
import ReactDOM from 'react-dom';
import { VinSearch } from '..';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('VinSearch', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<VinSearch />);
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VinSearch />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the textfield and button', () => {
    expect(wrapper.find('#search').length).toBe(1);
    expect(wrapper.find('#btnSearch').length).toBe(1);
  });

  it('vin state changes to the user input', () => {

    const input = "AAAA"
    wrapper.find('#search').simulate('change', { target: { value: input } });
    expect(wrapper.state().vin).toEqual(input);
  })

  it('set vin to invalid on a too short vin', () => {
    const input = "AAAA"
    wrapper.find('#btnSearch').simulate('click');
    expect(wrapper.state().isVinInvalid).toBeTruthy();
  })

  it('set vin to invalid on a too long vin ', () => {
    const input = "111111111111111111"
    wrapper.setState({ vin: input });
    wrapper.find('#btnSearch').simulate('click');
    expect(wrapper.state().isVinInvalid).toBeTruthy();
  })

  it('set vin to invalid when an invalid character appears in the vin ', () => {
    const input = "1111111111111111I"
    wrapper.setState({ vin: input });
    wrapper.find('#btnSearch').simulate('click');
    expect(wrapper.state().isVinInvalid).toBeTruthy();
  })

  it('set vin to valid when user clicks on the button with an invalid vin', () => {
    const input = "11111111111111111"
    wrapper.setState({ vin: input });
    wrapper.find('#btnSearch').simulate('click');
    expect(wrapper.state().isVinInvalid).toBeFalsy();
  })

});