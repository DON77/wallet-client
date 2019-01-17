import React, { Component, Fragment } from 'react';
import './styles.scss';
import Navbar from './Navbar';

class Layout extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        {this.props.children}
      </Fragment>
    );
  }
}

export default Layout;