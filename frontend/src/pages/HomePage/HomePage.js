import React from 'react';
import { TransactionOverviewTable,UserOverviewTable } from '../../components/'
import { authenticationStore, dataStore } from '../../stores';
import { observer } from 'mobx-react';
import { VinSearch } from '../../components';
import { AddEntryButton, ManageUserForm } from '../../components';
import PersonIcon from '@material-ui/icons/Person';
import './HomePage.css';
import { USER_LEVEL } from '../../constants';
import { Button } from '@material-ui/core';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isUserManagmentGUIOpen: false,
        };

        this.toggleUserGUI = this.toggleUserGUI.bind(this);
    }
    toggleUserGUI() {
        this.setState({
            isUserManagmentGUIOpen: !this.state.isUserManagmentGUIOpen,
        });
    }
    render() {
        return (
            <div className="Home-Page">
                <div className="searchbar-container">
                    <VinSearch vin={dataStore.vin} />
                    {
                        authenticationStore.userLevel > USER_LEVEL.NOT_LOGGED_IN
                            ?
                            <AddEntryButton />
                            :
                            null
                    }
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
                                <PersonIcon />
                                Benutzerverwaltung
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
                        <TransactionOverviewTable userLevel={authenticationStore.userLevel} />
                    }
                </div>

            </div >)
    }
}
export default observer(HomePage);