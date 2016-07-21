import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

// Data imports
import { Prices } from '../../api/Prices.js';

// Data Visualization Component - uses Victory
class Chart extends Component {
  // Manipulate data into chart format
  renderChart() {
    // Array to render in chart
    const chart_values = [];

    // "X" Value
    const dates = this.props.dates;

    // "Y" Value
    const prices = this.props.prices;

    // put X's and Y'x into array
    for (var i = 0, len = this.props.dates.length; i < len; i++) {
      chart_values.push({x: dates.shift(), y: prices.shift()});
    }

    // Render Chart Object
    return (
      <VictoryChart height={150} width={250}>
        <VictoryAxis
          label="2015"
          tickValues={[
            new Date(2015, 1, 1),
            new Date(2015, 2, 1),
            new Date(2015, 3, 1),
            new Date(2015, 4, 1),
            new Date(2015, 5, 1),
            new Date(2015, 6, 1),
            new Date(2015, 7, 1),
            new Date(2015, 8, 1),
            new Date(2015, 9, 1),
            new Date(2015, 10, 1),
            new Date(2015, 11, 1),
            new Date(2015, 12, 1)
          ]}
          tickFormat={['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']}
          style={{
            tickLabels: {fontSize: 3, padding: 5},
            axisLabel: {fontSize: 6, padding: 20}
          }} />
          <VictoryAxis 
            dependentAxis
            label="Price"
            style={{
              tickLabels: {fontSize: 5}
            }} />
        <VictoryLine 
          data={chart_values} />
      </VictoryChart>
    )
  }

	render() {
    return(
      <div>
        <h1 className="chartTitle">{this.props.children}</h1>
        {this.props.loading ? "loading..." : this.renderChart()}
      </div>
    );
  }
}

// Meteor data container for component - change from Mixins a few months ago
export default createContainer((params) => {
  // Subscribe to data
  const handle = Meteor.subscribe('prices.priceData', params._id);

  // handle to check if subscription has loaded
  const loading = !handle.ready();

  // Prices for symbol user just searched for
  const prices = Prices.findOne({_id: params._id});

  // Once subscription loaded, check that prices exist in db
  const pricesExist = !loading && !!prices;

  if (pricesExist) {
    // Closing price for each data point
    var graph_prices = prices.prices.map(function(price) {
      return price.close;
    });

    // Date each data point was taken
    var graph_dates = prices.prices.map(function(price) {
      return price.date;
    });
  }

  return {
    loading,
    pricesExist,
    prices: pricesExist ? graph_prices : [],
    dates: pricesExist ? graph_dates : []
  };
}, Chart);