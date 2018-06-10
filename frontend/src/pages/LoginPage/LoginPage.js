import React from 'react';
import { withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ModalPopup } from '../../components/';
import { observer } from 'mobx-react';
import { authenticationStore } from '../../stores';
import { USER_LEVEL } from '../../constants';
import { HOME_PATH } from '../../app-config';
import './LoginPage.css'

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
            popupTitle: ""
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
        const isEmailInvalidRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !isEmailInvalidRegex.test(email);
    }
    validateEmail(event) {
        if (event.target.value !== "") {
            this.setState({
                isEmailInvalid: this.isEmailValid(event.target.value),
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
        if (this.state.email === "" || this.state.isEmailInvalid) {
            this.displayPopup("Eingabe ungültig", "Bitte gültige E-Mail Adresse eingeben")
        } else {
            fetch('http://vini-ethereum.westeurope.cloudapp.azure.com:4711/api/users')
                .then(response => response.json())
                .then(json => {
                    this.displayPopup("Fetch erfolgreich... Hier muss dann die Antwort ausgewertet werden.")
                })
                .catch(message => alert(message)) // TODO
        }
    }
    onLoginClick() {
        if (this.state.email === "" || this.state.isEmailInvalid || this.state.password === "") {
            this.displayPopup("Eingabe ungültig", "Bitte gültige E-Mail Adresse und Passwort eingeben")
        } else {
            //TODO
            let details = {
                'grant_type': 'password',
                'username': "testuser", //this.state.email, // TODO
                'password': "abc123", //this.state.password,
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

            fetch('http://vini-ethereum.westeurope.cloudapp.azure.com:4711/api/users/login',
                {
                    method: 'post',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formBody
                })
                .then(response => response.json())
                .then(json => {
                    //TODO validate
                    //TODO delete this
                    switch (this.state.email) {
                        case 'user@zws.com':
                            authenticationStore.setUserLevel(USER_LEVEL.ZWS);
                            break;
                        case 'user@stva.com':
                            authenticationStore.setUserLevel(USER_LEVEL.STVA);
                            break;
                        case 'user@astva.com':
                            authenticationStore.setUserLevel(USER_LEVEL.ASTVA);
                            break;
                        case 'user@tuev.com':
                            authenticationStore.setUserLevel(USER_LEVEL.TUEV);
                            break;
                        default:
                            authenticationStore.setUserLevel(USER_LEVEL.NOT_LOGGED_IN);
                            break;
                    }

                    this.props.history.push(HOME_PATH);
                })
                .catch(message => {
                    alert(message) // TODO
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
                            autoComplete="on"
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
                {/* TODO DELETE*/}
                <div>
                    <div>user@zws.com</div>
                    <div>user@stva.com</div>
                    <div>user@astva.com</div>
                    <div>user@tuev.com</div>
                    <div>Else: not logged in</div>
                    <div>Any password.</div>
                </div>
            </React.Fragment>
        )
    }

}

export default withRouter(observer(LoginPageNoRouter));