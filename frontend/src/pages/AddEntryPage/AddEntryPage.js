import React from 'react';
import { TransactionOverviewTable, AddEntryContainer } from '../../components/'
import { authenticationStore, dataStore } from '../../stores';
import { observer } from 'mobx-react';

import './AddEntryPage.css';

const AddEntryPage = (props) => {
    return (
        <div className="Home-Page">
            <div className="searchbar-container">
                {/* TODO determine preowner count from table */}
                <AddEntryContainer vin={dataStore.vin} preownerCount={0} />
            </div>
            <TransactionOverviewTable userLevel={authenticationStore.userLevel} />
        </div>
    )
}

export default observer(AddEntryPage);