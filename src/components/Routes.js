import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Wallet from './Wallet';
import Configure from './Wallet/Configure';
import NotFound from './NotFound';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Wallet} />
        <Route path="/configure" exact component={Configure} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;