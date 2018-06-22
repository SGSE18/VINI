import React from 'react';
import { TransactionOverviewTable, UserOverviewTable, AddEntryButton, ManageUserForm } from '../../components/'
import { authenticationStore, dataStore, popupStore } from '../../stores';
import { observer } from 'mobx-react';
import { VinSearch } from '../../components';
import PersonIcon from '@material-ui/icons/Person';
import './HomePage.css';
import { USER_LEVEL, READ_CAR_PATH, TRANSACTION_VALID, TRANSACTION_PENDING } from '../../constants';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

function getProgressStyle() {

    // sets the modal into the mid of the screen
    return {
        top: '20%',
        left: '45%',
        position: 'absolute',
        zIndex: 100
    };
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            carTransactionData: dataStore.carTransactionData,
            isUserManagmentGUIOpen: false,
            showProgressbar: false
        };
        this.onSearchClick = this.onSearchClick.bind(this);
        this.toggleUserGUI = this.toggleUserGUI.bind(this);
    }
    toggleUserGUI() {
        this.setState({
            isUserManagmentGUIOpen: !this.state.isUserManagmentGUIOpen,
        });
    }
    getCurrentMileageOfCar() {
        if (this.state.carTransactionData && this.state.carTransactionData.length > 0) {
            const mileages = this.state.carTransactionData
                .filter(row => row.state === TRANSACTION_PENDING || row.state === TRANSACTION_VALID)
                .filter(row => !isNaN(Date.parse(row.timestamp))) // filter invalid timestamps
                .sort((rowA, rowB) => new Date(rowB.timestamp).getTime() - new Date(rowA.timestamp).getTime()) // descending by time
            if (mileages && mileages.length > 0) {
                console.log(mileages)
                return mileages[0].mileage;
            }
        }
        return NaN;
    }
    onSearchClick() {

        this.setState({ showProgressbar: true });
        const query = "?vin=" + dataStore.vin;
        fetch(READ_CAR_PATH + query,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + authenticationStore.token
                },
            })
            .then(response => response.json())
            .then(json => {
                const newCarTransactionData = json.payload ? json.payload : [];
                this.fillOwnerCount(newCarTransactionData);
                this.setState({ showProgressbar: false, carTransactionData: newCarTransactionData });
                dataStore.carTransactionData = json.payload;
                dataStore.currentMileageOfCar = this.getCurrentMileageOfCar();
                if (json && json.message) {
                    popupStore.showPopup("", json.message)
                }
            })
            .catch(error => {
                this.setState({ showProgressbar: false });
                if (error && error.message) {
                    popupStore.showPopup("Fehler", error.message)
                } else {
                    popupStore.showPopup("Fehler", JSON.stringify(error))
                }
            })
    }
    fillOwnerCount(newCarTransactionData) {
        let lastPreownerCount = 0;
        for (let i = newCarTransactionData.length - 1; i >= 0; --i) {
            let curTransaction = newCarTransactionData[i];
            if (curTransaction.state === TRANSACTION_PENDING || curTransaction.state === TRANSACTION_VALID) {
                if (!curTransaction.ownerCount) {
                    curTransaction.ownerCount = lastPreownerCount;
                }
                else if (curTransaction.ownerCount && Number(curTransaction.ownerCount) !== lastPreownerCount) {
                    lastPreownerCount = curTransaction.ownerCount;
                }
            }
        }
        dataStore.preownerCount = Number(lastPreownerCount);
    }

    render() {
        return (
            <div className="Home-Page">
                <div className="searchbar-container">
                    {
                        this.state.showProgressbar
                            ?
                            <CircularProgress size={100} style={getProgressStyle()} />
                            :
                            null
                    }
                    <VinSearch onSearchClick={this.onSearchClick} />
                    {
                        authenticationStore.userLevel > USER_LEVEL.NOT_LOGGED_IN
                            ?
                            <AddEntryButton />
                            :
                            null
                    }
                    {/*Benutzerverwaltung*/}
                    {
                        authenticationStore.userLevel === USER_LEVEL.ASTVA
                            ?
                            <Button
                                variant="raised"
                                margin="normal"
                                className="button"
                                onClick={this.toggleUserGUI}
                                style={{ marginLeft: '1em' }}
                            >
                                {
                                    this.state.isUserManagmentGUIOpen
                                        ?
                                        "Transaktionsübersicht"
                                        :
                                        <React.Fragment>
                                            <PersonIcon />
                                            Benutzerverwaltung
                                        </React.Fragment>
                                }

                            </Button>
                            :
                            null
                    }
                </div>
                <div style={{ display: 'flex', flexGrow: 1 }}>
                    {this.state.isUserManagmentGUIOpen
                        ?
                        <React.Fragment>
                            <UserOverviewTable userLevel={authenticationStore.userLevel} />
                            <ManageUserForm
                                style={{
                                    flexGrow: 0,
                                    width: '25%'
                                }}
                            />
                        </React.Fragment>
                        :
                        <TransactionOverviewTable dataStore={dataStore} userLevel={authenticationStore.userLevel} />
                    }
                </div>

            </div >)
    }
}
export default observer(HomePage);