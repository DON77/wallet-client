import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <header className="header">
        <nav className="navbar">
          <div className="brand">
            <Link to="/">Planner</Link>
          </div>
          <div className="menu">
            <div className="menu-item">
              <Link to="/" className={window.location.pathname === '/' ? 'active' : ''}>Main</Link>
            </div>
            <div className="menu-item">
              <Link to="/configure" className={window.location.pathname === '/configure' ? 'active' : ''}>Configure</Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;