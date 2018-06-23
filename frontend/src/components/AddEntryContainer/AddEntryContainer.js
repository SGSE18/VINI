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
import { authenticationStore, dataStore, popupStore } from '../../stores';
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
    day = day < 10 ? "0" + day : day;
    let hours = today.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    let minutes = today.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return todayStr + month + '-' + day + "T" + hours + ":" + minutes;
}
class AddEntryContainer extends React.Component {
    constructor(props) {
        super(props);
        const todayStr = getCurrentDate();
        this.state = {
            mileage: dataStore.currentMileageOfCar,
            selectedDate: todayStr,
            isPopupVisible: false,
            popupTitle: "",
            popupDescription: "",
            popupShowsError: false
        }
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.isNewMileageValid = this.isNewMileageValid.bind(this);
        this.setKmValue = this.setKmValue.bind(this);
        this.handleCalendarChange = this.handleCalendarChange.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.submitData = this.submitData.bind(this);
        this.setDate = this.setDate.bind(this);
        this.validateDateStr = this.validateDateStr.bind(this);
        // references to the child components to retrieve the data
        this.zwsRef = new React.createRef();
        this.tuevRef = new React.createRef();
        this.stvaRef = new React.createRef();

    }

    handleSubmitClick() {
        if (!this.isNewMileageValid(this.state.mileage)) {
            this.displayPopup("Fehler", "Kilometerstand zu niedrig.", true);
        } else if (!this.validateDateStr(this.state.selectedDate)) {
            this.displayPopup("Fehler", "Ungültiges Datum.", true);
        } else {
            this.displayPopup("Sind Sie sich sicher?", "Bitte überprüfen Sie die Eingaben.", false);
        }

    }
    handleSearchClick() {
        this.props.history.push(HOME_PATH)
    }
    handleCheckboxChange() {

    }
    isNewMileageValid(mileage) {
        if(mileage === '' || isNaN(mileage)) {
            return false;
        }
        if (authenticationStore.userLevel === USER_LEVEL.NOT_LOGGED_IN) { //this case shouldn't happen anyway 
            return false;
        }
        if (isNaN(mileage)) { //do not allow updating if not a number
            return false;
        } else {
            mileage = Number(mileage);
        }
        if (mileage < 0) { //do not allow updating if negative
            return false;
        }
        var oldValue = dataStore.currentMileageOfCar;
        if (isNaN(oldValue)) {//special case if mileage wasnt set before
            return true;
        }
        if (authenticationStore.userLevel === USER_LEVEL.ASTVA
            || authenticationStore.userLevel === USER_LEVEL.STVA) {//(A)STVA is allowed to do everything (>0)
            return true;
        }
        oldValue = Number(oldValue);
        if (mileage >= oldValue) {//otherwise update is only allowed if mileage increased
            return true;
        }
        return false;
    }
    isNumber(value) {
        const isNumberRegex = /^0$|^[1-9][0-9]*$/
        return isNumberRegex.test(value)
    }
    setKmValue(e) {
        const value = e.target.value;

        if (value === '' || this.isNumber(value)) {
            console.log(value)
            this.setState({
                mileage: value
            });
        } else {
            return false;
        }
    }
    hidePopup() {
        this.setState({ isPopupVisible: false });
    }
    onModalClose(hasActionBeenConfirmed) {
        if (!this.state.popupShowsError && hasActionBeenConfirmed) {
            if (this.isNewMileageValid(this.state.mileage) && this.validateDateStr(this.state.selectedDate)) {
                this.submitData();
                this.props.history.push(HOME_PATH)
            } else {
                popupStore.showPopup("Fehler", "Die Eingabe ist fehlerhaft.")
            }

        }
        this.setState({ popupShowsError: false });
        this.hidePopup();
    }
    submitData() {
        const headerData = {
            vin: this.props.vin,
            mileage: this.state.mileage,
            timestamp: this.state.selectedDate + ":00"
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
    validateDateStr(dateStr) {
        var dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$$/;
        return dateRegex.test(dateStr);

    }
    setDate(dateStr) {
        if (this.validateDateStr(dateStr)) {
            this.setState({
                selectedDate: dateStr
            });
        }

    }
    handleCalendarChange(e) {
        this.setDate(e.target.value);

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

    displayPopup(title, description, showsError) {
        this.setState({
            isPopupVisible: true,
            popupTitle: title,
            popupDescription: description,
            popupShowsError: showsError
        })
    }

    render() {
        if (!authenticationStore.userLevel || (authenticationStore.userLevel <= USER_LEVEL.NOT_LOGGED_IN)) {
            return <div style={{ margin: 'auto' }}> Nicht autorisiert! Bitte einloggen!</div>
        }
        return (
            <React.Fragment>
                <ModalPopup
                    isOpen={this.state.isPopupVisible}
                    onClose={this.onModalClose}
                    title={this.state.popupTitle}
                    description={this.state.popupDescription}
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
                    onChange={this.setKmValue}
                    onKeyDown={this.setKmValue}
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
                        type="datetime-local"
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
                    onClick={this.handleSubmitClick}
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