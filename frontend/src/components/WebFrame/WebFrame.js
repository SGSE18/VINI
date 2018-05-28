import React from 'react';
import { LoginButton } from '../';
const WebFrame = (props) => {   
        return (
            <div className="App">
                <header className="App-header">
                <h1 className="App-title">VINI</h1>
                <LoginButton className="main-login-button"/>
                </header>
                {props.children}
            </div>
        )
}

export default WebFrame;