import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import HomeQuarto from './HomeQuarto';
import Game from './game/Game';
import './App.css';

const App = () => (
  <Switch>
    <Route exact path="/" component={HomeQuarto} />
    <Route exact path="/game" component={Game} />
  </Switch>
);

export default App;
