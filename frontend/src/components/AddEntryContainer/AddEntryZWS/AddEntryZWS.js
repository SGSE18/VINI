import React from 'react';
import PropTypes from 'prop-types';
import './AddEntryZWS.css'
import Checkbox from '@material-ui/core/Checkbox';

class AddEntryZWS extends React.Component {

    constructor() {
        super();
        this.state = {
            isService1Checked: false,
            isService2Checked: false,
            isOilChangeChecked: false,
        }
        this.handleService1Change = this.handleService1Change.bind(this);
        this.handleService2Change = this.handleService2Change.bind(this);
        this.handleOilChange = this.handleOilChange.bind(this);
        this.getService1 = this.getService1.bind(this);
        this.getService2 = this.getService2.bind(this);
        this.getOilChange = this.getOilChange.bind(this);
    }
    getService1() {
        return this.state.isService1Checked;
    }
    getService2() {
        return this.state.isService2Checked;
    }
    getOilChange() {
        return this.state.isOilChangeChecked;
    }
    handleService1Change(_, checked) {
        this.setState({ isService1Checked: checked })
    }
    handleService2Change(_, checked) {
        this.setState({ isService2Checked: checked })
    }
    handleOilChange(_, checked) {
        this.setState({ isOilChangeChecked: checked })
    }

    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <div style={{ display: 'inline-block', marginLeft: '8px', }}>
                    <div style={this.props.labelStyle}>
                        Service I
                    </div>
                    <Checkbox
                        style={{ margin: '-5px' }}
                        onChange={this.handleService1Change}
                        checked={this.state.isService1Checked}
                    />
                </div>
                <div style={{ display: 'inline-block', marginLeft: '15px', }}>
                    <div style={this.props.labelStyle}>
                        Service II
                    </div>
                    <Checkbox
                        style={{ margin: '-5px' }}
                        onChange={this.handleService2Change}
                        checked={this.state.isService2Checked}
                    />
                </div>
                <div style={{ display: 'inline-block', marginLeft: '15px', }}>
                    <div style={this.props.labelStyle}>
                        Ölwechsel
                    </div>
                    <Checkbox
                        style={{ margin: '-5px' }}
                        onChange={this.handleOilChange}
                        checked={this.state.isOilChangeChecked}
                    />
                </div>
            </ div>
        )
    }
}
AddEntryZWS.propTypes = {
    labelStyle: PropTypes.object.isRequired
}
export default AddEntryZWS;