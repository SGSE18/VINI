import React from 'react';
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
                <div style={{ display: 'block', fontSize: '0.8em', userSelect: 'none' }}>
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

export default AddEntryTUEV;