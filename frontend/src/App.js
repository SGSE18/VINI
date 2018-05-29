import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { WebFrame } from './components';
import { Home, Login } from './pages';
import logo from './media/logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <WebFrame>
            <Route exact path="/" component={Home} />
            <Route path="/Login" component={Login} />
            <img src={logo} className="App-logo" alt="logo" />
          </WebFrame>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
