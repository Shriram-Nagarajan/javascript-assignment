import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Cities from './components/Cities';
import Restaurants from './components/Restaurants';
import React from 'react';

export default class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return(
      <Router>
      <Switch>
        <Route path ="/cities" exact component={Cities} />
        <Route path="/restaurants" exact component={Restaurants} />
      </Switch>
      </Router>
    )
  }
}
