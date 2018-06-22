import React from 'react';
import Button from '@material-ui/core/Button';
import './ManageUserForm.css';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { USER_LEVEL, getAuthorityString, getAuthorityInt } from '../../constants';
import { REGISTER_USER_PATH } from '../../constants';
import { authenticationStore, popupStore } from '../../stores';
import sha256 from 'sha256';

let authoritylevels = [];
for (var key in USER_LEVEL) {
    var level = USER_LEVEL[key];
    if (level !== USER_LEVEL.NOT_LOGGED_IN) {
        authoritylevels.push(getAuthorityString(level));
    }
}

export class ManageUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forename: "",
            surname: "",
            company: "",
            email: "",
            authorityLevel: "",
            password: "",
            confirmPassword: "",
            arePasswordsEqual: true,
            helperText: ""
        }
        this.onBtnSaveClick = this.onBtnSaveClick.bind(this);
        this.checkConfirmPassword = this.checkConfirmPassword.bind(this);
    }
    inputIsValid() {
        if (this.state.forename !== ""
            && this.state.surname !== ""
            && this.state.company !== ""
            && this.state.email !== ""
            && this.state.authorityLevel !== ""
            && this.state.password !== ""
            && this.state.arePasswordsEqual) {
            return true;
        }
        return false;
    }
    setStateValue(valName, event) {
        this.setState({ [valName]: event.target.value })
    }
    checkConfirmPassword() {
        if (this.state.password !== ""
            && this.state.confirmPassword !== ""
            && this.state.confirmPassword !== this.state.password) {
            this.setState({
                arePasswordsEqual: false,
                helperText: "Passwörter nicht identisch"
            })
        } else {
            this.setState({
                arePasswordsEqual: true,
                helperText: ""
            })
        }

    }
    onBtnSaveClick() {
        if (this.inputIsValid()) {
            const body = {
                email: this.state.email,
                password: sha256(this.state.password),
                authLevel: getAuthorityInt(this.state.authorityLevel),
                forename: this.state.forename,
                surname: this.state.surname,
                companyName: this.state.company,
                creationDate: new Date().toISOString()
            }
            fetch(REGISTER_USER_PATH,
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + authenticationStore.token
                    },
                    body: JSON.stringify(body)
                })
                .then(response => response.json())
                .then(json => {
                    if (json && json.message) {
                        popupStore.showPopup("", json.message)
                    } else {
                        popupStore.showPopup("", JSON.stringify(json))
                    }
                })
                .catch(error => {
                    if (error && error.message) {
                        popupStore.showPopup("Fehler", error.message)
                    } else {
                        popupStore.showPopup("Fehler", JSON.stringify(error))
                    }
                })
        }
    }
    render() {
        return (
            <div>
                <TextField
                    autoFocus
                    id="forename"
                    label="Vorname"
                    onChange={this.setStateValue.bind(this, "forename")}
                />
                <br></br>
                <TextField
                    id="surename"
                    label="Nachname"
                    onChange={this.setStateValue.bind(this, "surname")}
                />
                <br></br>
                <TextField
                    id="company"
                    label="Unternehmen"
                    onChange={this.setStateValue.bind(this, "company")}
                />
                <br></br>
                <TextField
                    id="email"
                    label="E-Mail"
                    onChange={this.setStateValue.bind(this, "email")}
                />
                <br></br>
                <FormControl style={{ width: '100%' }}>
                    <InputLabel htmlFor="age-simple">Authoritätslevel</InputLabel>
                    <Select
                        value={this.state.authorityLevel}
                        id="authoritylevel"
                        onChange={this.setStateValue.bind(this, "authorityLevel")}
                    >
                        {authoritylevels.map((name, i) => <MenuItem style={{ backgroundColor: 'white' }} key={i} value={name}> {name}</MenuItem>)}
                    </Select>
                </FormControl>
                <br></br>
                <form>
                    <TextField id="password"
                        label="Passwort"
                        type='password'
                        autoComplete="true"
                        onChange={this.setStateValue.bind(this, "password")}
                        onBlur={this.checkConfirmPassword}
                    />
                </form>
                <form>
                    <TextField id="confirm-password"
                        label="Passwort bestätigen"
                        type='password'
                        autoComplete="false"
                        onChange={this.setStateValue.bind(this, "confirmPassword")}
                        onBlur={this.checkConfirmPassword}
                        error={!this.state.arePasswordsEqual}
                        helperText={this.state.helperText}
                    />
                </form>
                <br></br>
                <Button variant="raised" id="save" onClick={this.onBtnSaveClick}>
                    Speichern
            </Button>
            </div>
        )
    }
}

export default ManageUserForm;