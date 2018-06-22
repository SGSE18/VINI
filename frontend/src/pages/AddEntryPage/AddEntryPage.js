import React from 'react';
import Button from '@material-ui/core/Button';
import { TransactionOverviewTable, AnnulmentTransactionsTable, AddEntryContainer } from '../../components/'
import { authenticationStore, dataStore } from '../../stores';
import { USER_LEVEL } from '../../constants';
import { observer } from 'mobx-react';

import './AddEntryPage.css';

class AddEntryPage extends React.Component {
    constructor() {
        super();
        this.state = {
            showPendingAnullmentTable: false
        }
        this.handleToggleAnullmentView = this.handleToggleAnullmentView.bind(this);
    }
    handleToggleAnullmentView() {
        this.setState({ showPendingAnullmentTable: !this.state.showPendingAnullmentTable });
    }
    render() {
        return (
            <div className="Home-Page" >
                <div className="searchbar-container">
                    {
                        this.state.showPendingAnullmentTable
                            ?
                            null
                            :
                            <AddEntryContainer style={{ display: 'inline' }} vin={dataStore.vin} preownerCount={dataStore.preownerCount} />}
                    {/*Transaktions-Annullierungen*/
                        authenticationStore.userLevel === USER_LEVEL.STVA || authenticationStore.userLevel === USER_LEVEL.ASTVA
                            ?
                            <Button
                                variant="raised"
                                margin="normal"
                                style= {!this.state.showPendingAnullmentTable ? { marginLeft: '1em' } : { marginBottom: '0.5em', marginTop: '2.1em', marginLeft: '75%' } }
                                onClick={this.handleToggleAnullmentView}
                            >
                                {
                                    this.state.showPendingAnullmentTable
                                        ?
                                        "Zurück"
                                        :
                                        "Offene Annullierungen"
                                }
                            </Button>
                            :
                            null
                    }
                </div>
                {
                    this.state.showPendingAnullmentTable
                        ?
                        <AnnulmentTransactionsTable vin={dataStore.vin} userLevel={authenticationStore.userLevel} />
                        :
                        <TransactionOverviewTable dataStore={dataStore} userLevel={authenticationStore.userLevel} />
                }

            </div >
        )
    }
}

export default observer(AddEntryPage);