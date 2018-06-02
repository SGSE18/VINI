import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Home from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import { LOGIN_PATH, HOME_PATH } from '../../app-config';
import { USER_LEVEL } from '../../constants';

// TODO DELETE-------------------------------------------
import { authenticationStore } from '../../stores';
//-------------------------------------------------------

class LoginButton extends React.Component {
    constructor(props, test) {
        console.log(test)
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    isAtLogin() {
        return window.location.pathname === LOGIN_PATH;
    }
    getAuthorityString() {
        switch (this.props.authorityLevel) {
            case USER_LEVEL.NOT_LOGGED_IN: return "Ausgeloggt"
            case USER_LEVEL.ZWS: return "ZWS"
            case USER_LEVEL.TUEV: return "TÜV"
            case USER_LEVEL.STVA: return "STVA"
            case USER_LEVEL.ASTVA: return "Admin STVA"
            default: return ""
        }
    }
    handleClick() {
        // log out
        if (this.props.authorityLevel !== USER_LEVEL.NOT_LOGGED_IN) {
            authenticationStore.setUserLevel(USER_LEVEL.NOT_LOGGED_IN);
            this.props.onLogOut();
        }
        if (this.isAtLogin()) {
            this.props.history.push(HOME_PATH);
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
                        {this.props.authorityLevel !== USER_LEVEL.NOT_LOGGED_IN ? "Logout" : "Login"}
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
LoginButton.propTypes = {
    authorityLevel: PropTypes.number.isRequired,
    onLogOut: PropTypes.func.isRequired
}
export default withRouter(LoginButton);