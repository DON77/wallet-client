import React, { Component } from 'react';
import { saveBudget, getBudget } from '../../utils/api';
import { getItem } from '../../utils/storage';

class Configure extends Component {
  state = {
    isLoading: true,
    amount: '',
    error: ''
  };

  async componentDidMount() {
    // check if has budget set
    const username = getItem('username');
    const budget = await getBudget(username);
    if (budget.success) {
      this.setState({
        amount: budget.result.budget
      });
    }
    this.setState({
      isLoading: false
    });
  };

  handleChange = e => {
    this.setState({
      amount: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      isLoading: true
    });
    const username = getItem('username');
    const budget = await saveBudget({ username, budget: this.state.amount });
    if (budget.success) {
      this.setState({
        amount: budget.result.budget,
        error: '',
        isLoading: false
      });
    } else {
      this.setState({
        error: budget.result.message || budget.result,
        isLoading: false
      })
    }
  };

  render() {
    return (
      <div className="block">
        {this.state.isLoading ? <div className="loader">Loading...</div> : (
          <React.Fragment>
            <div className="title">Monthly amount</div>
            <form className="form" onSubmit={this.handleSubmit}>
              <input value={this.state.amount} onChange={this.handleChange} />
              <button className="btn btn-success" type="submit">Set</button>
            </form>
            <div className="error">{this.state.error}</div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Configure;