import React, { Component } from 'react';

// Header component - static
export default class Header extends Component {
  render() {
    return (
      <header className="headerContainer">
        <h1 className="mainHeading">
          <img className="logo" src="http://zylo.com/wp-content/themes/zylo/images/zylo-logo.png"></img>
          &nbsp;Finance Charts
        </h1>
        <h2 className="secondaryHeading">(Courtesy of Yahoo Finance)</h2>
      </header>
    );
  }
}
