import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { WebFrame } from './components';
import { HomePage, LoginPage, AddEntryPage } from './pages';
import logo from './media/logo.png';
import { observer } from 'mobx-react';
import { LOGIN_PATH, HOME_PATH, ADD_ENTRY_PATH } from './app-config';
import { ModalPopup } from './components';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPopupVisible: false,
      popupTitle: "",
      popupDescription: "",
      popupShowsError: false
    }
    this.displayPopup = this.displayPopup.bind(this);
  }

  displayPopup(title, description, showsError) {
    this.setState({
      isPopupVisible: true,
      popupTitle: title,
      popupDescription: description,
      popupShowsError: showsError
    })
  }

  render() {
    return (
      <React.Fragment>
        <ModalPopup
          isOpen={this.props.popupStore.isPopupVisible}
          title={this.props.popupStore.popupTitle}
          onClose={() => this.props.popupStore.closePopup()}
          description={this.props.popupStore.popupDescription}
          showCancelButton={false}
        />
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
      </React.Fragment>
    );
  }
}

export default observer(App);
