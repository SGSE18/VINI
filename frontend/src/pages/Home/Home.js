import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import { TransactionOverviewTable } from '../../components/'
import { authenticationStore } from '../../stores';
import { observer } from 'mobx-react';

const Home = (props) => {
    return (
        <div className="Home-Page">
            <div className="searchbar-container">
                <TextField
                    id="search"
                    label="FIN eingeben"
                    type="search"
                    margin="normal"
                    className="searchbar"
                />
                <Button variant="raised" style={{ marginLeft: '10px' }}>
                    <Search />
                    Suche
                </Button>
            </div>
            <TransactionOverviewTable userLevel={authenticationStore.userLevel} />
        </div>
    )
}

export default observer(Home);