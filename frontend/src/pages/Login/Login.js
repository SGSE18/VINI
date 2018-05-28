import React from 'react';
import logo from '../media/logo.png';
import WebFrame from '../components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Login = (props) => {
    return (
        <WebFrame>
            <div className="Login-Page">
                <TextField
                    id="email"
                    label="E-Mail Adresse"
                    margin="normal"
                    className="useremail"
                    style={{ width: '30em' }}
                />
                <br></br>
                <TextField
                    id="password"
                    label="Passwort"
                    type="password"
                    margin="normal"
                    className="userpass"
                    style={{ width: '30em' }}
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
            </div>
            <img src={logo} className="App-logo" alt="logo" />
        </WebFrame>
    )
}

export default Login;