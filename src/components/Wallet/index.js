import React, { Component, Fragment } from 'react';
import './styles.scss';
import { Redirect } from 'react-router-dom';
import { getItem } from '../../utils/storage';
import { updateFlows, getBudget, removeFlow } from '../../utils/api';

class Wallet extends Component {
  state = {
    isLoading: true,
    budget: null,
    daily: null,
    forDay: null,
    amount: '',
    redirect: false,
    flows: [],
    error: ''
  };

  calculateDayBudget = budget => {
    const start = new Date();
    start.setHours(0,0,0,0);

    const end = new Date();
    end.setHours(23,59,59,999);

    let sum = 0;
    budget.flows.map(flow => {
      if (flow.timestamp >= start.getTime() && flow.timestamp <= end.getTime()) {
        if (flow.type) {
          sum += flow.amount;
        } else {
          sum -= flow.amount;
        }
      }
    });
    return budget.daily + sum;
  };

  async componentDidMount() {
    const username = getItem('username');
    const budget = await getBudget(username);
    if (budget.success) {
      this.setState({
        budget: budget.result.budget,
        flows: budget.result.flows || [],
        daily: budget.result.daily,
        forDay: this.calculateDayBudget(budget.result),
        isLoading: false
      });
    } else {
      this.setState({
        redirect: true
      });
    }
  }

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
    const { dataset } = e.target;
    const username = getItem('username');
    const wallet = await updateFlows(username, { flow: {
      type: Number(dataset.type),
      amount: this.state.amount
    } });

    if (wallet.success) {
      this.setState({
        flows: wallet.result.flows || [],
        budget: wallet.result.budget,
        forDay: this.calculateDayBudget(wallet.result),
        error: '',
        amount: '',
        isLoading: false
      });
    } else {
      this.setState({
        error: wallet.result.message || wallet.result,
        isLoading: false
      });
    }
  };

  handleRemove = async i => {
    this.setState({
      isLoading: true
    });

    const username = getItem('username');
    const index = this.state.flows.length - 1 - i;
    
    const wallet = await removeFlow(username, index);

    if (wallet.success) {
      this.setState({
        flows: wallet.result.flows || [],
        budget: wallet.result.budget,
        forDay: this.calculateDayBudget(wallet.result),
        isLoading: false
      });
    }
  };

  render() {
    return (
      <Fragment>
        <div className="block">
          {this.state.isLoading ? <div className="loader">Loading...</div> : (
            <React.Fragment>
              {this.state.redirect && <Redirect to="/configure" />}
              <div className="title">
                You have {this.state.budget}R left for the month
                <br />
                <span className={this.state.forDay > 0 ? 'pos' : 'neg'}>{this.state.forDay}</span>R left for the day</div>
              <form className="form">
                <input value={this.state.amount} onChange={this.handleChange} />
                <button className="btn btn-danger" data-type={0} onClick={this.handleSubmit}>Expense</button>
                <button className="btn btn-success" data-type={1} onClick={this.handleSubmit}>Income</button>
              </form>
              <div className="error">{this.state.error}</div>
            </React.Fragment>
          )}
        </div>
        <div className="block">
          {this.state.isLoading ? <div className="loader">Loading...</div> : (
            <React.Fragment>
              <div className="title">History</div>
              <div className="flows">
                {this.state.flows.reverse().map((flow, i) => {
                  const date = new Date(flow.timestamp);
                  const datetime = `${("0" + date.getDate()).slice(-2)}.${("0" + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`;
                  return (
                    <div key={flow.timestamp} className="flow">
                      <div className="flow-details">
                        <div className={Number(flow.type) ? 'type income' : 'type expense'}>{Number(flow.type) ? '+' : '-'}</div>
                        <div className="details">
                          <div className="amount">{flow.amount}R</div>
                          <div className="datetime">{datetime}</div>
                        </div>
                      </div>
                      <div className="options" onClick={() => this.handleRemove(i)}>x</div>
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          )}
        </div>
      </Fragment>
    );
  }
}

export default Wallet;