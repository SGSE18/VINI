import React from 'react';
import { withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ModalPopup } from '../../components/';
import { observer } from 'mobx-react';
import { authenticationStore, popupStore } from '../../stores';
import { USER_LOGIN_PATH, RESET_PASSWORD_PATH, USER_TOKEN_PATH } from '../../constants';
import { HOME_PATH } from '../../app-config';
import sha256 from 'sha256';

import './LoginPage.css'

function getProgressStyle() {
    // sets the modal into the mid of the screen
    return {
        top: '20%',
        left: '47%',
        position: 'absolute',
        zIndex: 100
    };
}

export class LoginPageNoRouter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            isEmailInvalid: false,
            isPopupVisible: false,
            password: "",
            passwordErrorText: "",
            popupDescription: "",
            popupTitle: "",
            loginInProgess: false
        }

        this.validateEmail = this.validateEmail.bind(this);
        this.resetMailInvalid = this.resetMailInvalid.bind(this);
        this.onResetPasswordClick = this.onResetPasswordClick.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.onEmailInputChanged = this.onEmailInputChanged.bind(this);
        this.onPasswordInputChanged = this.onPasswordInputChanged.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.passwordKeyPress = this.passwordKeyPress.bind(this);
    }
    passwordKeyPress(e) {
        if (!this.isPopupVisible) {
            var keyCode = e.keyCode;
            if (keyCode === 13) {//Enter
                this.onLoginClick();
            }
        }
    }
    isEmailValid(email) {
        // http://emailregex.com
        const isEmailValidRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return isEmailValidRegex.test(email);
    }
    validateEmail(event) {
        if (event.target.value !== "") {
            this.setState({
                isEmailInvalid: !this.isEmailValid(event.target.value),
            })
        }
    }
    resetMailInvalid() {
        this.setState({ isEmailInvalid: false });
    }
    displayPopup(title, description) {
        this.setState({
            isPopupVisible: true,
            popupTitle: title,
            popupDescription: description
        })
    }
    hidePopup() {
        setTimeout(function () { this.setState({ isPopupVisible: false }); }.bind(this), 250);
    }
    onEmailInputChanged(event) {
        this.setState({
            email: event.target.value
        })
    }
    onPasswordInputChanged(event) {
        if (this.state.email) {
            this.setState({
                password: event.target.value
            })
        }
    }
    onResetPasswordClick() {
        if (this.state.loginInProgess) {
            return;
        }
        if (this.state.email === "" || this.state.isEmailInvalid) {
            this.displayPopup("Eingabe ungültig", "Bitte gültige E-Mail Adresse eingeben")
        } else {
            this.setState({ loginInProgess: true });
            const body = { email: this.state.email }
            fetch(RESET_PASSWORD_PATH,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                })
                .then(response => response.json())
                .then(json => {
                    this.setState({ loginInProgess: false });
                    if (json && json.message) {
                        popupStore.showPopup("", json.message)
                    } else {
                        popupStore.showPopup("", JSON.stringify(json))
                    }
                })
                .catch(error => {
                    this.setState({ loginInProgess: false });
                    if (error && error.message) {
                        popupStore.showPopup("Fehler", error.message)
                    } else {
                        popupStore.showPopup("Fehler", JSON.stringify(error))
                    }
                })

        }
    }

    onLoginClick() {
        if (this.state.loginInProgess) {
            return;
        }
        if (this.state.email === "" || this.state.isEmailInvalid || this.state.password === "") {
            this.displayPopup("Eingabe ungültig", "Bitte gültige E-Mail Adresse und Passwort eingeben")
        } else {
            this.setState({ loginInProgess: true });
            let details = {
                'grant_type': 'password',
                'username': this.state.email,
                'password': sha256(this.state.password),
                'client_id': null,
                'client_secret': null
            };
            let formBody = [];
            for (let property in details) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            this.setState({ loginInProgess: true });
            fetch(USER_TOKEN_PATH,
                {
                    method: 'post',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formBody
                })
                .then(response => {
                    if (response && response.status === 200) {
                        return response.json()
                    }
                })
                .then(json => {
                    if (json) {
                        const bearerToken = json.access_token
                        authenticationStore.token = bearerToken;
                        // Login
                        fetch(USER_LOGIN_PATH,
                            {
                                method: 'get',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': "Bearer " + bearerToken
                                },
                            })
                            .then(response => {
                                if (response && response.status === 200) {
                                    this.setState({ loginInProgess: false });
                                    return response.json()
                                }
                            })
                            .then(json => {
                                this.setState({ loginInProgess: false });
                                if (json.message) {
                                    this.displayPopup("Fehler", json.message)
                                } else if (json.loginStatus === "success") {
                                    authenticationStore.setUserLevel(json.authorityLevel);
                                    this.props.history.push(HOME_PATH);

                                } else if (json.loginStatus === "failure") {
                                    this.displayPopup("Fehler", "Login fehlgeschlagen!")
                                }
                            })
                            .catch(message => {
                                this.setState({ loginInProgess: false });
                                console.error("Fehler", "" + message)
                            })
                    } else {
                        this.setState({ loginInProgess: false });
                        this.displayPopup("Fehler", "Login ungültig")
                    }
                })
                .catch(message => {
                    this.setState({ loginInProgess: false });
                    this.displayPopup("Fehler", "" + message);
                })
        }
    }
    onModalClose() {
        this.hidePopup();
    }

    render() {
        return (
            <React.Fragment>
                <div className="Login-Page">
                    <ModalPopup
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        isOpen={this.state.isPopupVisible}
                        onClose={this.onModalClose}
                        title={this.state.popupTitle}
                        description={this.state.popupDescription}
                        showCancelButton={false}
                    />
                    <form>
                        <TextField
                            autoFocus
                            id="email"
                            autoComplete='email'
                            label="E-Mail Adresse"
                            margin="normal"
                            style={{ width: '30em' }}
                            onChange={this.onEmailInputChanged}
                            error={this.state.isEmailInvalid}
                            onFocus={this.resetMailInvalid}
                            onBlur={this.validateEmail}
                            helperText={this.state.isEmailInvalid ? "Ungültige E-Mail Adresse" : null}
                        />
                        <br></br>
                        <TextField
                            id="password"
                            label="Passwort"
                            type="password"
                            margin="normal"
                            autoComplete="true"
                            style={{ width: '30em' }}
                            onChange={this.onPasswordInputChanged}
                            onKeyUp={this.passwordKeyPress}
                            text={this.state.password}
                        />
                        <br></br>
                        <Button
                            variant="raised"
                            margin="normal"
                            className="button"
                            style={{ width: '30em' }}
                            onClick={this.onLoginClick}
                        >
                            Login
                        </Button>
                        <br></br>
                        <Button
                            variant="raised"
                            margin="normal"
                            className="button"
                            style={{ width: '30em' }}
                            onClick={this.onResetPasswordClick}
                        >
                            Passwort zurücksetzen
                        </Button>
                    </form>
                </div>
                {
                    this.state.loginInProgess
                        ?
                        <CircularProgress size={100} style={getProgressStyle()} />
                        :
                        null
                }
                {/* TODO DELETE*/}
                <div>
                    <div>user@zws.com</div>
                    <div>user@stva.com</div>
                    <div>user@astva.com</div>
                    <div>user@tuev.com</div>
                </div>
            </React.Fragment>
        )
    }

}

export default withRouter(observer(LoginPageNoRouter));