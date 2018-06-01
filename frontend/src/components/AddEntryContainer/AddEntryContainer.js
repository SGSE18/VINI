import React from 'react';
import './AddEntryContainer.css'
import { ADD_ENTRY_PATH, HOME_PATH } from '../../app-config';
import moment from 'moment';
import { withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Search from '@material-ui/icons/Search';
import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import 'moment/locale/de.js'

class AddEntryContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedDate: moment()
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.validateKmValue = this.validateKmValue.bind(this);
        this.handleCalendarChange = this.handleCalendarChange.bind(this);
    }

    handleClick() {
        this.props.history.push(ADD_ENTRY_PATH)
    }
    handleSearchClick() {
        this.props.history.push(HOME_PATH)
    }
    handleCheckboxChange() {

    }
    validateKmValue() {
    }
    handleCalendarChange(date) {
        this.setState({
            startDate: date
        });
    }


    render() {
        return (
            <React.Fragment>
                <TextField
                    disabled
                    label="FIN"
                    margin="normal"
                    onChange={this.onVinInputChanged}
                    value="test"
                />
                <TextField
                    label="KM"
                    margin="normal"
                    onChange={this.validateKmValue}
                    value="100000"
                    style={{marginLeft: '2em', marginRight: '2em'}}
                />
                <div style={{ display: 'inline-block' }}>
                    <div style={{ display: 'block', fontSize: '0.8em', userSelect: 'none'}}>
                        HU/AU
                    </div>
                    <Checkbox
                        style={{ margin: '-5px' }}
                        checked={this.state.checkedA}
                        onChange={this.handleCheckboxChange}
                        value="checkedA"
                    />
                </div>
                <div style={{width: '100px', display: 'inline', marginLeft: '2em', marginRight: '2em' }}>
                    <DatePickerInput
                        locale='de'
                        onChange={this.handleCalendarChange}
                        value={this.state.selectedDate}
                        className="date-picker"
                    />
                </ div>
                <Button
                    variant="raised"
                    color="primary"
                    margin="normal"
                    style={{ marginLeft: '1em' }}
                    onClick={this.handleClick}
                >
                    Bestätigen
                </Button>
                <Button
                    variant="raised"
                    style={{ marginLeft: '10px', height: '20px' }}
                    onClick={this.handleSearchClick}
                >
                    <Search />
                    Zurück zur Suche
                </Button>
            </React.Fragment>
        )
    }
}

export default withRouter(AddEntryContainer);