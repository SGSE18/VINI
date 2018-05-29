import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Home from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import { LOGIN_PATH, HOME_PATH } from '../../app-config';

class LoginButton extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            authorityLevel: 0
        }
        this.handleClick = this.handleClick.bind(this);
    }
    isAtLogin() {
        return window.location.pathname === LOGIN_PATH;
    }
    getAuthorityString() {
        switch (this.state.authorityLevel) {
            case 0: return "Ausgeloggt"
            case 1: return "ZWS"
            case 2: return "TÜV"
            case 3: return "STVA"
            case 4: return "Admin STVA"
            default: return ""
        }
    }
    handleClick() {
        // logout
        if (this.state.isLoggedIn) {
            this.setState({ authorityLevel: 0 })
        }
        if (this.isAtLogin()) {
            this.props.history.push(HOME_PATH);
            this.setState({ isLoggedIn: !this.state.isLoggedIn })
        } else {
            this.props.history.push(LOGIN_PATH)
        }
    }
    render() {
        return (
            <div className="login-button">
                {this.isAtLogin()
                    ?
                    <Button variant="raised" style={{ marginLeft: '10px' }} onClick={this.handleClick}>
                        <Home className="login-icon" />
                        Home
                </Button>
                    :
                    <Button variant="raised" style={{ marginLeft: '10px' }} onClick={this.handleClick}>
                        <AccountCircle className="login-icon" />
                        {this.state.isLoggedIn ? "Logout" : "Login"}
                    </Button>
                }
                <div className="authority-level-text">
                    {this.getAuthorityString()}
                </div>
            </div>
        )
    }
}
LoginButton.contextTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
}
export default withRouter(LoginButton);