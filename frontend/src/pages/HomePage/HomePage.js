import React from 'react';
import { TransactionOverviewTable } from '../../components/'
import { authenticationStore, dataStore } from '../../stores';
import { observer } from 'mobx-react';
import { VinSearch } from '../../components';
import { AddEntryButton } from '../../components';

import './HomePage.css';
import { USER_LEVEL } from '../../constants';

const HomePage = (props) => {
    return (
        <div className="Home-Page">
            <div className="searchbar-container">
                <VinSearch vin={dataStore.vin} />
                {
                    authenticationStore.userLevel !== USER_LEVEL.NOT_LOGGED_IN
                        ?
                        <AddEntryButton />
                        :
                        null
                }

            </div>
            <TransactionOverviewTable userLevel={authenticationStore.userLevel} />
        </div>
    )
}

export default observer(HomePage);