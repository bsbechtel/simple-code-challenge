import React, { Component } from 'react';

/* 
  UI Components are grouped in subfolders in /imports/ui directory by route
  This app is a single page, so the folder /landing holds all components for the main page
*/
// UI imports
import Header from './landing/Header.jsx';
import SearchBar from './landing/SearchBar.jsx';
import Chart from './landing/Chart.jsx';

// top level component
export default App = React.createClass({
  getInitialState() {
    return {
      chart: false
    }
  },

  chart(symbol, _id) {
    this.setState({
      chart: (
        <Chart _id={_id}>
          <p>Stock Prices from 01/01/2015 to 12/31/2015 for ${symbol}</p>
        </Chart>
      )
    });
  },

  render() {
    // add:
    // 1) a title - done
    // 2) an input component to search Yahoo finance for data & save to db - done
    // 3) a visualization component to display data - done
    return (
      <div className="mainContainer">
        {/* title */}
        <Header />

        {/* Input */}
        <SearchBar chart={this.chart} />

        {/* Data Visualization (using Victory) */}
        {this.state.chart}
      </div>
    );
  }
});