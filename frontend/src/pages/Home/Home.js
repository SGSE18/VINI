import React from 'react';
import { TransactionOverviewTable } from '../../components/'
import { authenticationStore } from '../../stores';
import { observer } from 'mobx-react';
import VinSearch from '../../components/VinSearch/VinSearch';
import './Home.css';

const Home = (props) => {
    return (
        <div className="Home-Page">
            <div className="searchbar-container">
                <VinSearch />
            </div>
            <TransactionOverviewTable userLevel={authenticationStore.userLevel} />
        </div>
    )
}

export default observer(Home);