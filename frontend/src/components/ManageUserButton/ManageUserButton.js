import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import { dataStore } from '../../stores';
import './ManageUserButton.css';

class ManageUserButton extends React.Component {
    constructor() {
        super();
        this.state = {
            isUserManagmentOpen : true,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
    }
    render() {
        return (
            <div style={{ width: '100%', display: 'inline' }}>               
                <Button
                    variant="raised"
                    style={{ marginLeft: '10px', height: '20px' }}
                    onClick={this.handleClick}
                >
                    Benutzer hinzufügenn/ändern
                </Button>
            </div>
        )
    }
}

export default ManageUserButton;