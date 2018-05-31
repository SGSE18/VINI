import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isEmailInvalid: false,
            passwordErrorText: "",
        }

        this.validateEmail = this.validateEmail.bind(this);
        this.resetMailInvalid = this.resetMailInvalid.bind(this);
    }

    isEmailValid(email) {
        // http://emailregex.com
        const isEmailInvalidRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !isEmailInvalidRegex.test(email);
    }
    validateEmail(event) {
        if (event.target.value !== "") {
            this.setState({
                isEmailInvalid: this.isEmailValid(event.target.value)
            })
        }
    }
    resetMailInvalid() {
        this.setState({ isEmailInvalid: false });
    }
    render() {
        return (
            <React.Fragment>
                <div className="Login-Page">
                    <form>
                        <TextField
                            autoFocus
                            id="email"
                            label="E-Mail Adresse"
                            margin="normal"
                            className="useremail"
                            style={{ width: '30em' }}
                            error={this.state.isEmailInvalid}
                            onFocus={this.resetMailInvalid}
                            onBlur={this.validateEmail}
                            helperText={this.state.isEmailInvalid ? "Ungültige E-Mail" : null}
                        />
                        <br></br>
                        <TextField
                            id="password"
                            label="Passwort"
                            type="password"
                            margin="normal"
                            className="userpass"
                            autoComplete="on"
                            style={{ width: '30em' }}
                            text={this.state.password}
                        />
                        <br></br>
                        <Button
                            variant="raised"
                            margin="normal"
                            className="button"
                            style={{ width: '30em' }}
                        >
                            Login
                    </Button>
                        <br></br>
                        <Button
                            variant="raised"
                            margin="normal"
                            className="button"
                            style={{ width: '30em' }}
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