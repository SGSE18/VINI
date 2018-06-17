import React from 'react';
import { TransactionOverviewTable, UserOverviewTable, AddEntryButton, ManageUserForm } from '../../components/'
import { authenticationStore, dataStore } from '../../stores';
import { observer } from 'mobx-react';
import { VinSearch } from '../../components';
import PersonIcon from '@material-ui/icons/Person';
import './HomePage.css';
import { USER_LEVEL, READ_CAR_PATH, TRANSACTION_VALID, TRANSACTION_PENDING } from '../../constants';
import { Button } from '@material-ui/core';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            carTransactionData: props.carTransactionData,
            isUserManagmentGUIOpen: false,
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
        if (this.state.carTransactionData !== null && this.state.carTransactionData.length > 0) {
            const mileages = this.state.carTransactionData
                .filter(row => row.state === TRANSACTION_PENDING || row.state === TRANSACTION_VALID)
                .filter(row => !isNaN(Date.parse(row.timestamp))) // filter invalid timestamps
                .sort((rowA, rowB) => new Date(rowB.timestamp).getTime() - new Date(rowA.timestamp).getTime()) // descending by time
            if (mileages !== null && mileages.length > 0) {
                return mileages[0].mileage;
            }
        }
        return NaN;
    }
    onSearchClick() {
        const query = "?car=" + dataStore.vin;
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
                this.setState({ carTransactionData: json.transactionPayload });
                dataStore.carTransactionData = json.transactionPayload;
                dataStore.currentMileageOfCar = this.getCurrentMileageOfCar();
            })
            .catch(message => {
                alert(message) // TODO
            })
    }
    render() {
        return (
            <div className="Home-Page">
                <div className="searchbar-container">
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
                        <TransactionOverviewTable carTransactionData={this.state.carTransactionData} userLevel={authenticationStore.userLevel} />
                    }
                </div>

            </div >)
    }
}
export default observer(HomePage);