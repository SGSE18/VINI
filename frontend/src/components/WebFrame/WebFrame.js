import React from 'react';
import { LoginButton } from '../';
import { authenticationStore } from '../../stores';

const WebFrame = (props) => {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">VINI</h1>
                <LoginButton onLogOut={() => authenticationStore.setUserLevel(0)} authorityLevel={authenticationStore.userLevel} className="main-login-button" />
            </header>
            {props.children}
        </div>
    )
}

export default WebFrame;