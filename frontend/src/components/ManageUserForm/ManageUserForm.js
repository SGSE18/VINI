import React from 'react';
import Button from '@material-ui/core/Button';
import './ManageUserForm.css';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { USER_LEVEL, getAuthorityString } from '../../constants';

let authoritylevels = [];
for (var key in USER_LEVEL) {
    var level = USER_LEVEL[key];
    if (level !== USER_LEVEL.NOT_LOGGED_IN) {
        authoritylevels.push(getAuthorityString(level));
    }
}

// TODO class
const ManageUserForm = (props) => {
    return (
        <div>
            <TextField
                id="firstname"
                label="Vorname" />
            <br></br>
            <TextField
                id="lastname"
                label="Nachname" />
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
            <FormControl style={{ width: '100%' }}>
                <InputLabel htmlFor="age-simple">Authoritätslevel</InputLabel>
                <Select
                    value={authoritylevels[0]}
                    id="authoritylevel"
                >
                    {authoritylevels.map((name, i) => <MenuItem style={{ backgroundColor: 'white' }} key={i}> {name}</MenuItem>)}
                </Select>
            </FormControl>
            <br></br>
            <form>
                <TextField id="password"
                    label="Passwort"
                    type='password'
                    autocomplete
                />
            </form>
            <br></br>
            <Button variant="raised" id="save"
            >Speichern</Button>
        </div>
    )
}

export default ManageUserForm;