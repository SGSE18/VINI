import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import { InfoTable } from '../../components/'

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
            <InfoTable />
        </div>
    )
}

export default Home;