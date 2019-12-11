import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import { connect } from 'react-redux';

import Current from './Current';
import Forecast from './Forecast';
import { requestLocation } from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(requestLocation());
  }

  render() {
    return (
      <Router>
        <div className='p-3'>
          <nav>
            <ul className='nav nav-pills'>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/current'>
                  Current
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/forecast'>
                  Forecast
                </NavLink>
              </li>
            </ul>
          </nav>
          {this.props.error ? (
            <div className='bg-danger text-white p-3 m-3'>
              {this.props.error}
            </div>
          ) : (
            <div className='p-5'>
              <Switch>
                <Route path='/current'>
                  <Current />
                </Route>
                <Route path='/forecast'>
                  <Forecast />
                </Route>
              </Switch>
            </div>
          )}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  const { error } = state.weather;

  return {
    error
  };
};

export default connect(mapStateToProps)(App);
