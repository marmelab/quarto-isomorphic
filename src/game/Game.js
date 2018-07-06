import React from 'react';
import '../Home.css';
import Grid from './Grid';

class Game extends React.Component {
  render() {
    return (
      <div className="Game">
        <div>
          <h2>This is a game</h2>
        </div>
        <p className="Home-intro">
          For now, you can do nothing, but you should watch games soon
        </p>
        <Grid/>
        <a href="/">Back home</a>
      </div>
    );
  }
}

export default Game;
