import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { WebFrame } from './components';
import { Home, Login } from './pages';
import logo from './media/logo.png';
import { LOGIN_PATH, HOME_PATH } from './app-config';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <WebFrame>
            <Route exact path={HOME_PATH} component={Home} />
            <Route path={LOGIN_PATH} component={Login} />
            <img src={logo} className="App-logo" alt="logo" />
          </WebFrame>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
