import React from 'react';
import { withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ModalPopup } from '../../components/';
import { observer } from 'mobx-react';
import { authenticationStore } from '../../stores';
import { USER_LOGIN_PATH, RESET_PASSWORD_PATH, USER_TOKEN_PATH } from '../../constants';
import { HOME_PATH } from '../../app-config';
import sha256 from 'sha256';

import './LoginPage.css'

function getProgressStyle() {
    // sets the modal into the mid of the screen
    return {
        top: '20%',
        left: '45%',
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
            showProgressbar: false
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
            this.setState({ showProgressbar: true });
            fetch(RESET_PASSWORD_PATH,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + authenticationStore.token
                    },
                    body: JSON.stringify(this.state.email)
                })
                .then(response => response.json())
                .then(json => {
                    this.setState({ showProgressbar: false });
                    this.displayPopup("Fetch erfolgreich... Hier muss dann die Antwort ausgewertet werden.")
                })
                .catch(message => {
                    this.setState({ showProgressbar: false }); 
                    console.log(message);
                }) // TODO

        }
    }

    onLoginClick() {
        if(this.state.loginInProgess) {
            return;
        }
        this.setState({loginInProgess: true});
        if (this.state.email === "" || this.state.isEmailInvalid || this.state.password === "") {
            this.displayPopup("Eingabe ungültig", "Bitte gültige E-Mail Adresse und Passwort eingeben")
        } else {
            let details = {
                'grant_type': 'password',
                'username': this.state.email,
                'password': sha256(this.state.password),
                'client_id': null,
                'client_secret': null
            };
            console.log(details);
            let formBody = [];
            for (let property in details) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            this.setState({ showProgressbar: true });
            fetch(USER_TOKEN_PATH,
                {
                    method: 'post',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formBody
                })
                .then(response => {
                    if (response !== null && response.status === 200) {
                        return response.json()
                    }
                })
                .then(json => {
                    if (json !== undefined) {
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
                                if (response !== null && response.status === 200) {
                                    this.setState({ showProgressbar: false });
                                    this.setState({loginInProgess: false});
                                    return response.json()
                                }
                            })
                            .then(json => {
                                if(json.message !== undefined) {
                                    this.displayPopup("Fehler", json.message)
                                } else if (json.loginStatus === "success") {
                                    authenticationStore.setUserLevel(json.authorityLevel);
                                    this.setState({loginInProgess: false});
                                    this.props.history.push(HOME_PATH);

                                } else if (json.loginStatus === "failure") {
                                    this.displayPopup("Fehler", "Login fehlgeschlagen!")
                                }
                                this.setState({ showProgressbar: false });
                                this.setState({loginInProgess: false});
                            })
                            .catch(message => {
                                this.setState({ showProgressbar: false });
                                this.setState({loginInProgess: false});
                                console.error("Fehler", "" + message)
                            })
                    } else {
                        this.setState({ showProgressbar: false });
                        this.setState({loginInProgess: false});
                        this.displayPopup("Fehler", "Login ungültig")
                    }
                })
                .catch(message => {
                    this.setState({ showProgressbar: false });
                    console.error("Fehler", "" + message)
                    this.setState({loginInProgess: false});
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
                    </form>
                </div>
                {
                    this.state.showProgressbar
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