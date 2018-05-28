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
            className="useremail"
            />
            <TextField
            id="password"
            label="Passwort"
            type="password"
            className="userpass"
            />
            <Button variant="raised" >
              Login
            </Button>
            <Button variant="raised" >
              Passwort zurücksetzen
            </Button>
            </div>
            <img src={logo} className="App-logo" alt="logo" />
            </WebFrame
        )
}

export default Login;