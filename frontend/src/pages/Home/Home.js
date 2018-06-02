import React from 'react';
import { TransactionOverviewTable } from '../../components/'
import { authenticationStore } from '../../stores';
import { observer } from 'mobx-react';
import { VinSearch } from '../../components';
import { AddEntryButton } from '../../components';

import './Home.css';
import { USER_LEVEL } from '../../constants';

const Home = (props) => {
    return (
        <div className="Home-Page">
            <div className="searchbar-container">
                <VinSearch />
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

export default observer(Home);