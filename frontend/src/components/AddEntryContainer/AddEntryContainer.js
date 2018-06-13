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
            oldMileage: 0,
            selectedDate: todayStr,
            isPopupVisible: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.isNewMileageValid = this.isNewMileageValid.bind(this);
        this.setKmValue = this.setKmValue.bind(this);
        this.handleCalendarChange = this.handleCalendarChange.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.submitData = this.submitData.bind(this);
        this.setDate=this.setDate.bind(this);
        this.validateDateStr=this.validateDateStr.bind(this);
        // references to the child components to retreive the data
        this.zwsRef = new React.createRef();
        this.tuevRef = new React.createRef();
        this.stvaRef = new React.createRef();
        //refs for textfileds
        this.mileageFieldRef=new React.createRef();
        this.dateFieldRef=new React.createRef();
    }


    handleClick() {
        this.setState({ isPopupVisible: true });
    }
    handleSearchClick() {
        this.props.history.push(HOME_PATH)
    }
    handleCheckboxChange() {

    }
    isNewMileageValid(mileage) {
        if (authenticationStore.userLevel === USER_LEVEL.NOT_LOGGED_IN) { //this case shouldnt happen anyway 
            return false;
        }       
        if (isNaN(mileage)){ //do not allow updating if not a number
            return false;
        }else{
            mileage=Number(mileage);
        }
        if(mileage<0){ //do not allow updating if negative
            return false;
        }
        var oldValue=this.state.oldMileage;
        if(isNaN(oldValue)&&!isNaN(mileage)){//special case if mileage wasnt set before
            return true;
        }        
        if(authenticationStore === USER_LEVEL.ASTVA){//ASTVA is allowed to do everything
            return true;
        }       
        oldValue=Number(oldValue);
        if (mileage >= oldValue) {//otherwise update is onle allowed if mileage increased
            return true;
        }

    }
    setKmValue(e) {        
        var mileage=e.target.value;        
        if (this.isNewMileageValid(mileage)) {
            this.setState({
                mileage: e.target.value
            });
        }

    }
    hidePopup() {
        this.setState({ isPopupVisible: false });
    }
    onModalClose(hasActionBeenConfirmed) {
        if (hasActionBeenConfirmed) {
            alert(this.state.mileage);
            alert(this.state.dateStr);
            alert(this.isNewMileageValid(this.state.mileage));
            alert(this.validateDateStr(this.state.dateStr));
            if (this.isNewMileageValid(this.state.mileage) && this.validateDateStr(this.state.dateStr)) {
                this.submitData();
                this.props.history.push(HOME_PATH)
            } else {
                alert("Fehler in der Eingabe");
            }

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
    validateDateStr(dateStr) {
        //var dateRegex = /^\\d{4}-\\d{2}-\\d{2}$/;
        var dateRegex = /^.*$/;//accept everything for now
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
                    ref={this.mileageFieldRef}
                    onChange={this.setKmValue}
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
                        ref={this.dateFieldRef}
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