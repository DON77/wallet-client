import React, { Component } from 'react';
import Routes from './Routes';
import Layout from './Layout';
import { getItem, setItem } from '../utils/storage';
import { getBudget } from '../utils/api';
import { Redirect } from 'react-router-dom';

class App extends Component {
  state = {
    redirect: false
  };

  async componentDidMount() {
    // check if has username in localStorage
    let username = getItem('username');
    while (!Boolean(username)) {
      username = prompt('Please enter username').trim();
    }
    setItem('username', username);

    // try to fetch budget from server
    const budget = await getBudget(username);
    if (window.location.pathname !== '/configure' && !budget.success) {
      this.setState({
        redirect: true
      });
    }
  }

  render() {
    return (
      <Layout>
        {this.state.redirect && <Redirect to="/configure" />}
        <div className="page">
          <Routes />
        </div>
      </Layout>
    );
  }
}

export default App;
