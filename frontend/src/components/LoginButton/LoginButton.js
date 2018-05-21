import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

class LoginButton extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            authorityLevel: 0

        }
        this.handleClick = this.handleClick.bind(this);
    }
    getAuthorityString() {
        switch (this.state.authorityLevel) {
            case 0: return "Ausgeloggt"
            case 1: return "ZWS"
            case 2: return "TÜV"
            case 3: return "STVA"
            case 4: return "ASTVA"
        }
    }
    handleClick() {
        // logout
        if(this.state.isLoggedIn) {
            this.setState({authorityLevel: 0})
        } else {
            // login
            this.setState({authorityLevel: 1})    
        }
 
        this.setState({ isLoggedIn: !this.state.isLoggedIn })
        
    }
    render() {
        return (
            <div className="LoginButton">
                <Button variant="raised" style={{ marginLeft: '10px' }} onClick={this.handleClick}>
                    <AccountCircle className="login-icon" />
                    {this.state.isLoggedIn ? "Logout" : "Login"}
                </Button>
                <div className="authority-level-text">
                    {this.getAuthorityString()}
                </div>
            </div>
        )
    }
}

export default LoginButton;