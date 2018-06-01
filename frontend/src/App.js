import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { WebFrame } from './components';
import { Home, Login, AddEntryPage } from './pages';
import logo from './media/logo.png';
import { LOGIN_PATH, HOME_PATH, ADD_ENTRY_PATH } from './app-config';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch exact>
          <WebFrame>
            <Route exact path={HOME_PATH} component={Home} />
            <Route exact path={LOGIN_PATH} component={Login} />
            <Route exact path={ADD_ENTRY_PATH} component={AddEntryPage} />
            <img src={logo} className="App-logo" alt="logo" />
          </WebFrame>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
