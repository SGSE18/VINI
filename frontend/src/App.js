import React, { Component } from 'react';
import logo from './media/logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to VINI</h1>
        </header>
        <p className="App-intro">
        <img src={logo} className="App-logo" alt="logo" />
        </p>
      </div>
    );
  }
}

export default App;
