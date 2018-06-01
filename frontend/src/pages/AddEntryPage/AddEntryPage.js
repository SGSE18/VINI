import React from 'react';
import { TransactionOverviewTable, AddEntryContainer } from '../../components/'
import { authenticationStore } from '../../stores';
import { observer } from 'mobx-react';

import './AddEntryPage.css';

const AddEntryPage = (props) => {
    return (
        <div className="Home-Page">
            <div className="searchbar-container">
                <AddEntryContainer />
            </div>
            <TransactionOverviewTable userLevel={authenticationStore.userLevel} />
        </div>
    )
}

export default observer(AddEntryPage);