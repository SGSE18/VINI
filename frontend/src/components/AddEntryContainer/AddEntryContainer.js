import React from 'react';
import PropTypes from 'prop-types';
import './AddEntryContainer.css'
import { HOME_PATH } from '../../app-config';
import { USER_LEVEL } from '../../constants';
import { withRouter } from 'react-router-dom'
import { ModalPopup } from '../';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import { authenticationStore } from '../../stores';
import AddEntryTUEV from './AddEntryTUEV/AddEntryTUEV';
import AddEntryZWS from './AddEntryZWS/AddEntryZWS';
import AddEntrySTVA from './AddEntrySTVA/AddEntrySTVA';

const entryLabelStyle = {
    color: 'rgba(0, 0, 0, 0.54)',
    padding: '0',
    fontSize: '0.8rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    userSelect: 'none',
    display: 'block'
}

const getCurrentDate = () => {
    const today = new Date()
    const todayStr = today.getFullYear() + '-';
    let month = today.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = today.getDate();
    day = day < 10 ? "0" + day : day
    return todayStr + month + '-' + day;
}
class AddEntryContainer extends React.Component {
    constructor(props) {
        super(props);
        const todayStr = getCurrentDate();
        this.state = {
            selectedDate: todayStr,
            isPopupVisible: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.validateKmValue = this.validateKmValue.bind(this);
        this.handleCalendarChange = this.handleCalendarChange.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.submitData = this.submitData.bind(this);
        // references to the child components to retreive the data
        this.zwsRef = new React.createRef();
        this.tuevRef = new React.createRef();
        this.stvaRef = new React.createRef();
    }


    handleClick() {
        this.setState({ isPopupVisible: true });
    }
    handleSearchClick() {
        this.props.history.push(HOME_PATH)
    }
    handleCheckboxChange() {

    }
    validateKmValue(e) {
        //TODO
        this.setState({
            mileage: e.target.value
        });
    }
    hidePopup() {
        this.setState({ isPopupVisible: false });
    }
    onModalClose(hasActionBeenConfirmed) {
        if (hasActionBeenConfirmed) {
            // TODO validate and submit data
            this.submitData();
            this.props.history.push(HOME_PATH)
        }
        this.hidePopup();
    }
    submitData() {
        const headerData = {
            vin: this.props.vin,
            mileage: this.state.mileage,
            timestamp: this.state.selectedDate
        };
        switch (authenticationStore.userLevel) {
            case USER_LEVEL.ZWS:
                this.zwsRef.current.submit(headerData);
                break;
            case USER_LEVEL.TUEV:
                this.tuevRef.current.submit(headerData);
                break;
            case USER_LEVEL.STVA:
            case USER_LEVEL.ASTVA:
            this.stvaRef.current.submit(headerData);
                break;
            case USER_LEVEL.NOT_LOGGED_IN:
            default:
                break;
        }
    }
    handleCalendarChange(e) {
        this.setState({
            selectedDate: e.target.value
        });
    }
    getUserLevelSpecificComponent() {
        switch (authenticationStore.userLevel) {
            case USER_LEVEL.ZWS:
                return <AddEntryZWS labelStyle={entryLabelStyle} ref={this.zwsRef} />;
            case USER_LEVEL.TUEV:
                return <AddEntryTUEV labelStyle={entryLabelStyle} ref={this.tuevRef} />;
            case USER_LEVEL.STVA:
            case USER_LEVEL.ASTVA:
                return <AddEntrySTVA labelStyle={entryLabelStyle} preownerCount={this.props.preownerCount} ref={this.stvaRef} />;
            case USER_LEVEL.NOT_LOGGED_IN:
            default:
                return <React.Fragment />
        }
    }
    render() {
        return (
            <React.Fragment>
                <ModalPopup
                    isOpen={this.state.isPopupVisible}
                    onClose={this.onModalClose}
                    title="Sind Sie sich sicher?"
                    description="Bitte überprüfen Sie Ihre Eingaben."
                />
                <TextField
                    disabled
                    label="FIN"
                    margin="normal"
                    value={this.props.vin}
                />
                <TextField
                    label="KM"
                    margin="normal"
                    autoFocus
                    onChange={this.validateKmValue}
                    value={this.state.mileage}
                    style={{ marginLeft: '2em', marginRight: '2em' }}
                />
                {
                    this.getUserLevelSpecificComponent()
                }
                <div style={{ width: '100px', display: 'inline', marginLeft: '2em', marginRight: '2em' }}>
                    <TextField
                        id="date"
                        label="Datum"
                        type="date"
                        onChange={this.handleCalendarChange}
                        value={this.state.selectedDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
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

AddEntryContainer.propTypes = {
    preownerCount: PropTypes.number.isRequired,
    vin: PropTypes.string.isRequired
}
export default withRouter(AddEntryContainer);