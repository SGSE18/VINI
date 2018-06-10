import React from 'react';
import './AddEntrySTVA.css'
import TextField from '@material-ui/core/TextField';

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
        let apiEndpoint = "http://vini-ethereum.westeurope.cloudapp.azure.com:4711/api/car/mileage";
        if(this.state.preownerCount !== this.props.preownerCount) {
            body.preownerCount = this.state.preownerCount;
            apiEndpoint = "http://vini-ethereum.westeurope.cloudapp.azure.com:4711/api/car/preowner";
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