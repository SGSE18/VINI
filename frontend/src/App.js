import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { WebFrame } from './components';
import { HomePage, LoginPage, AddEntryPage } from './pages';
import logo from './media/logo.png';
import { LOGIN_PATH, HOME_PATH, ADD_ENTRY_PATH } from './app-config';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch exact>
          <WebFrame>
            <Route exact path={HOME_PATH} component={HomePage} />
            <Route exact path={LOGIN_PATH} component={LoginPage} />
            <Route exact path={ADD_ENTRY_PATH} component={AddEntryPage} />
            <img src={logo} className="App-logo" alt="logo" />
          </WebFrame>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
