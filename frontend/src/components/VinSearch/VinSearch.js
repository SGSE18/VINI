import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import { dataStore } from '../../stores';
import './VinSearch.css';

class VinSearch extends React.Component {
    constructor() {
        super();
        this.state = {
            vin: dataStore.vin,
            isVinInvalid: false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.onVinInputChanged = this.onVinInputChanged.bind(this);
    }
    handleClick() {
        const regexIsVinValid = /^[1234567890ABCDEFGHJKLMNPRSTUVWXYZ]{17}$/;
        if (regexIsVinValid.test(this.state.vin)) {
            this.setState({ isVinInvalid: false })
        } else {
            this.setState({ isVinInvalid: true })
        }
    }
    onVinInputChanged(event) {
        this.setState({
            vin: event.target.value
        })
        dataStore.setVin(event.target.value);
    }
    render() {
        return (
            <div style={{ width: '100%', display: 'inline' }}>
                <TextField
                    autoFocus
                    id="search"
                    defaultValue={dataStore.vin}
                    label="FIN eingeben"
                    type="search"
                    margin="normal"
                    onChange={this.onVinInputChanged}
                    error={this.state.isVinInvalid}
                    style={{ width: '50%' }}
                    helperText={this.state.isVinInvalid ? "VIN ungültig" : null}
                />
                <Button
                    id="btnSearch"
                    variant="raised"
                    style={{ marginLeft: '10px', height: '20px' }}
                    onClick={this.handleClick}
                >
                    <Search />
                    Suche
                </Button>
            </div>
        )
    }
}

export default VinSearch;