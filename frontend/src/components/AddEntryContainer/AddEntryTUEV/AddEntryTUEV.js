import React from 'react';
import PropTypes from 'prop-types';
import './AddEntryTUEV.css'
import Checkbox from '@material-ui/core/Checkbox';

class AddEntryTUEV extends React.Component {
    constructor() {
        super();
        this.state = {
            isHuAuChecked: false
        }
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.getHuAu = this.getHuAu.bind(this);
    }
    getHuAu() {
        return this.state.isHuAuChecked;
    }
    handleCheckboxChange(_, checked) {
        this.setState({ isHuAuChecked: checked })
    }

    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <div style={this.props.labelStyle}>
                    HU/AU
                </div>
                <Checkbox
                    style={{ margin: '-5px' }}
                    onChange={this.handleCheckboxChange}
                    checked={this.state.isHuAuChecked}
                />
            </div>
        )
    }
}
AddEntryTUEV.propTypes = {
    labelStyle: PropTypes.object.isRequired
}
export default AddEntryTUEV;