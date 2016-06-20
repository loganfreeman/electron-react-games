'use strict';

require('./app.scss');

import React from 'react';

import {
  render
} from 'react-dom';

import {
  Router,
  Route,
  Link,
  browserHistory
} from 'react-router';

import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import MenuScreen from './components/MenuScreen/MenuScreen';
import HelpPage from './components/HelpPage/HelpPage';
import AboutPage from './components/AboutPage/AboutPage';
import Sudoku from './components/Game/Game';
import Tetris from './components/Game/Tetris';
import Generator from './components/Generator/Generator';

render((
  <Router history={browserHistory}>
    <Route path="/" component={LoadingScreen} />
    <Route path="/game/menu" component={MenuScreen} />
    <Route path="/game/about" component={AboutPage} />
    <Route path="/game/sudoku" component={Sudoku} />
    <Route path="/game/tetris" component={Tetris} />
    <Route path="/game/help" component={HelpPage} />
    <Route path="/game/generator" component={Generator} />
  </Router>
), document.getElementById('main'));
