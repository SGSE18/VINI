import React from 'react';
import { TransactionOverviewTable } from '../../components/'
import { authenticationStore, dataStore } from '../../stores';
import { observer } from 'mobx-react';
import { VinSearch } from '../../components';
import { AddEntryButton } from '../../components';

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

                </div>
                {authenticationStore.userLevel === USER_LEVEL.ASTVA 
                ? 
                <Button variant="raised"
                    margin="normal"
                    className="button"
                    onClick={this.toggleUserGUI}
                    style={{ width: '30em' }}>Benutzer hinzufügen/anpassen</Button> 
                : ''
                }
                {this.state.isUserManagmentGUIOpen ? 'Here be stuff' : ''}
                <TransactionOverviewTable userLevel={authenticationStore.userLevel} />
            </div >)
    }
}
export default observer(HomePage);