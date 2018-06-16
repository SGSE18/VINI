import React from 'react';
import './AddEntrySTVA.css'
import TextField from '@material-ui/core/TextField';
import { CHANGE_MILEAGE_PATH, CHANGE_PREOWNER_PATH } from '../../../constants';
import { authenticationStore } from '../../../stores';

class AddEntrySTVA extends React.Component {
    constructor(props) {
        super(props);
        let preownerCount = -1;
        if (props.preownerCount !== undefined && props.preownerCount !== null) {
            preownerCount = props.preownerCount
        }
        this.state = {
            preownerCount: preownerCount
        }
        this.handlePreownerChange = this.handlePreownerChange.bind(this);
        this.getPreownerCount = this.getPreownerCount.bind(this);
    }
    getPreownerCount() {
        return this.state.preownerCount;
    }
    handlePreownerChange(e) {
        this.setState({ preownerCount: e.target.value });
    }
    submit(headerData) {

        const body = {
            ...headerData,
        };
        let apiEndpoint = CHANGE_MILEAGE_PATH;
        if (this.state.preownerCount !== this.props.preownerCount) {
            body.preOwner = this.state.preownerCount;
            apiEndpoint = CHANGE_PREOWNER_PATH;
        }
        console.log(body)
        fetch(apiEndpoint,
            {
                method: 'post',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + authenticationStore.token
                },
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
                <TextField
                    id="date"
                    label="# Vorbesitzer"
                    type="number"
                    onChange={this.handlePreownerChange}
                    value={this.state.preownerCount}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </ div>
        )
    }
}

export default AddEntrySTVA;