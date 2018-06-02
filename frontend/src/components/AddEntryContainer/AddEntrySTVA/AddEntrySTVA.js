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