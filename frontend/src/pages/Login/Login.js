import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ModalPopup } from '../../components/';
import { observer } from 'mobx-react';

class Login extends React.Component {
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
        this.setState({ isPopupVisible: false });
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
            fetch('https://jsonplaceholder.typicode.com/posts/1')
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
            fetch('https://jsonplaceholder.typicode.com/posts/1')
                .then(response => response.json())
                .then(json => {
                    this.displayPopup("Fetch erfolgreich... Hier muss dann die Antwort ausgewertet werden.")
                })
                .catch(message => alert(message)) // TODO
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
            </React.Fragment>
        )
    }

}

export default observer(Login);