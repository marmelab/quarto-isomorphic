import React from 'react';
import logo from '../resources/boardTitle.jpg';
import './Home.css';

class HomeQuarto extends React.Component {
  render() {
    return (
      <div className="Home">
        <div>
          <img src={logo} alt="logo" />
          <h2>Welcome to Quarto-isomorphic</h2>
        </div>
        <p className="Home-intro">
          For now, you can do nothing, but you should watch games soon
        </p>
        <a href="/game">Show a game</a>
      </div>
    );
  }
}

export default HomeQuarto;
