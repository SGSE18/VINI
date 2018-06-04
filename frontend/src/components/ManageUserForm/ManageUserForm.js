import React from 'react';
import Button from '@material-ui/core/Button';
import './ManageUserForm.css';
import { TextField } from '@material-ui/core';

const ManageUserForm = (props) => {
    return (
        <div className="Home-Page">
            <TextField
                id="lastname"
                label="Nachname" />
            <br></br>
            <TextField
                id="firstname"
                label="Vorname" />
            <br></br>
            <TextField
                id="company"
                label="Unternehmen" />
            <br></br>
            <TextField
            autoFocus
                id="email"
                label="E-Mail" />
            <br></br>
            <TextField
                id="authoritylevel"
                label="Authoritätslevel"
            />
            <br></br>
            {/* // DropDownMenu would be better, but for some reason its not working */}
            <TextField id="password"
                label="Passwort"
                type='password' />
            <br></br>
            <Button variant="raised" id="save"
                 >Speichern</Button>
        </div>
    )
}

export default ManageUserForm;