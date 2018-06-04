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
            <TextField
                id="firstname"
                label="Vorname" />
            <TextField
                id="company"
                label="Unternehmen" />
            <TextField
                id="email"
                label="E-Mail" />
            <TextField
                id="authoritylevel"
                label="Authoritätslevel"
            />
            {/* // DropDownMenu would be better, but for some reason its not working */}
            <TextField id="password"
                label="Passwort"
                type='password' />
            <Button id="save"
            label="Speichern"/>
        </div>
    )
}

export default ManageUserForm;