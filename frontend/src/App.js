import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { WebFrame } from './components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import { Home, Login } from './pages';
import logo from './media/logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <WebFrame>
        <div className="searchbar-container">
          <TextField
            id="search"
            label="FIN eingeben"
            type="search"
            margin="normal"
            className="searchbar"
          />
          <Button variant="raised" style={{ marginLeft: '10px' }}>
            <Search />
            Suche
        </Button>
        </div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Login" component={Login} />
          </Switch>
        </BrowserRouter>
        <img src={logo} className="App-logo" alt="logo" />
      </WebFrame>
    );
  }
}

export default App;
