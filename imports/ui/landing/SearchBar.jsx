import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

// Search Bar Component
export default SearchBar = React.createClass({
  // Initial state - input box text
  getInitialState() {
    return {
      symbol: "",
    }
  },

  // submit handler - data saved and sent to Yahoo Finance
  handleSubmit(event) {
    event.preventDefault();

    // 1) Pull data from state and trim
    const symbol = this.state.symbol.trim();

    // 2) Call 'getPrices' method to call Yahoo API and download data, generate chart
    Meteor.call('prices.getPrices', symbol, (error, result) => {
      if (error)
        return alert(error.reason);

      this.props.chart(symbol, result);
    });

    // 3) Clear form
    this.setState({
      symbol: ""
    });
  },

  // sets state as text input
  handleChange(event) {
    event.preventDefault();

    this.setState({
      symbol: event.target.value
    });
  },

  render() {
    var symbol = this.state.symbol;

    return (
      <div className="inputComponent">
        <h1>Please enter a ticker symbol:</h1>
        <form onSubmit={this.handleSubmit} >
          <input 
            className="tickerInput"
            type="text"
            ref="ticker"
            value={symbol}
            placeholder="e.g. YHOO, GOOG"
            onChange={this.handleChange} />
            &nbsp;
          <input
            type="submit"
            className="submitButton" 
            value="Get Prices!" />
        </form>
      </div>
    );
  }
});
