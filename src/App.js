import React, { Component } from 'react';
import Router from 'react-router-dom/BrowserRouter';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import SignUp from './components/smart/sign-up/sign-up';
import Login from './components/smart/login/login';
import MapComponent from './components/smart/map/map';
import CONSTS from './constants/general';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={SignUp} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/map' component={MapComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
