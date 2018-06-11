import React from 'react';
import PropTypes from 'prop-types';
import './AddEntryTUEV.css'
import Checkbox from '@material-ui/core/Checkbox';

import { ADD_TUEV_PATH, CHANGE_MILEAGE_PATH } from '../../../constants';

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
    getNextCheckDate = () => {
        const today = new Date()
        const todayStr = today.getFullYear()+2 + '-';
        let month = today.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let day = today.getDate();
        day = day < 10 ? "0" + day : day
        return todayStr + month + '-' + day;
    }
    submit(headerData) {

        const body = {
            ...headerData,
        };
        let apiEndpoint = CHANGE_MILEAGE_PATH;
        if(this.state.isHuAuChecked) {
            body.nextCheck = this.getNextCheckDate();
            apiEndpoint = ADD_TUEV_PATH;
        }
        fetch(apiEndpoint,
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(json => {
                alert(JSON.stringify(json)) //TODO
            })
            .catch(message => {
                alert(message) // TODO
            })

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