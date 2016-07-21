import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Prices = new Mongo.Collection('Prices');

if (Meteor.isServer) {
  // Publication to pull prices for one symbol from db and sent to client
  Meteor.publish('prices.priceData', function(_id) {
    check(_id, String);

    return Prices.find({_id: _id}, {
      prices: true
    });
  });
}

Meteor.methods({
	'prices.getPrices'(symbol) {
    check(symbol, String);

    // On server, pull finance data and save to db
    if (Meteor.isServer) {
      const prices = YahooFinance.historical({
        symbol: symbol,
        from: '2015-01-01',
        to: '2015-12-31'
      });

      // Check query was successful
      if (prices.length === 0) {
        throw new Meteor.Error("Query Error", "Sorry, your search did not return a valid ticker symbol. Please try again.");
      }

      // Save to db
      var prices_id = Prices.insert({
        prices: prices
      });

      return prices_id;
    }
  }
})