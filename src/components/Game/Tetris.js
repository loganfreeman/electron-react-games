/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import * as game from './TetrisGame';
import _ from 'underscore';
import {
  GridService,
  Piece,
  Coordinate,
  getBoardWidth,
  GameData
} from './TetrisGame';
export default class Tetris extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      grid: GridService.getSingleton().grid,
    })
  }

  componentDidMount() {
    this.gameOn();
    this.boundKeypressHandler = this.handleKeypress.bind(this);

    window.addEventListener('keydown', this.boundKeypressHandler);
  }

  rotatePiece(direction) {
    let oldRotation = this.currentPiece.Rotation,
        newRotation = oldRotation + direction;
    this.currentPiece.Rotation = newRotation < 0 ? newRotation + GameData.rotationLimit : newRotation % GameData.rotationLimit;
    let coord = this.currentPiece.convertPatternToCoordinates();
    for(let i = 0, len = coord.length; i < len; i++) {
        if (!this.currentPiece.withinGrid(coord[i])) {
            if (coord[i].x < 0) {
                this.movePieceInLevel('right');
                break;
            }
            if (coord[i].x >= getBoardWidth() ) {
                this.movePieceInLevel('left');
                if (this.currentPiece.patterns === 2) {
                    if (coord[i+1] && coord[i+1].x >= getBoardWidth()) {
                        this.moveCustomInLevel(-2);
                    }
                    break;
                } else {
                    break;
                }
            }
            if(!this.currentPiece.verifyPiece()) {
                this.currentPiece.Rotation = oldRotation;
                break;
            }
        }
    }
  }

  movePieceInLevel(direction) {
    let velocity = (direction === 'left') ? -1 : 1;
    let  speedX = this.currentPiece.PositionX + velocity;
    this.currentPiece.updatePosition({
        x: speedX
    });
  }

  hardDrop() {
    if (this.currentPiece) {
      let cell = this.currentPiece.calculateCollisionPoint();
      this.currentPiece.updatePosition(cell, () => this.insertAndClearRow());
    }
  }

  handleKeypress(event) {
    let key = event.keyCode;
    let rotateRight = 1,
        rotateLeft = -1;
    switch (key) {
        case 38:
            this.rotatePiece(rotateRight);
            break;
        case 37:
            this.movePieceInLevel('left');
            break;
        case 39:
            this.movePieceInLevel('right');
            break;
        case 40:
            this.rotatePiece(rotateLeft);
            break;
        case 32:
            this.hardDrop();
            break;
        case 27:
            this.setGamePause(!this.state.isPause);
            break;
        default:
            break;
    }
    this.updateGhostPiece();
  }


  componentWillUnmount() {
    this.gameOver();
    window.removeEventListener('keydown', this.boundKeypressHandler);
  }

  gameOn() {
    let loop = _.throttle(this.gameLoop, this.getGameSpeed(), {
          leading: false,
          trailing: false
      });
    window.requestAnimationFrame(() => this.gameOn()); // use arrow functions to lexically capture this
    if(!this.isGamePause() && this.isGameStart()) {
        this.loop();
    }
  }

  gameLoop() {
    this.moveCurrentPiece();
    this.updateCurrentPiece();
    this.updateGhostPiece();
    this.setState({
      grid: GridService.getSingleton().grid,
    })
  }

  moveCurrentPiece() {
    let speedY = this.getPositionY() + 1;
    this.currentPiece.updatePosition({
        y: speedY
    }, () => this.insertAndClearRow());
  }

  updateCurrentPiece() {
    if(this.currentPiece) {
      this.currentPiece.updateCurrentPiece();
    }
  }

  insertAndClearRow() {
    this.insertPiece();
    GridService.checkAndClearFilledRow(function() {
        GameData.score += 100;
    });
  }

  insertPiece() {
    GridService.insertPiece(this.currentPiece, () => this.gameOver());
    this.currentPiece.destroy();
    this.currentPiece = null;
    this.createNewPiece();
  }

  updateGhostPiece() {
    if (this.currentPiece) {
        this.currentPiece.updateGhostPiece();
    }
  }

  startGame() {
    GridService.buildEmptyGameBoard();
    this.createNewPiece();
    this.setState({
      grid: GridService.getSingleton().grid,
    });
    this.setGameStart(true);
  }
  resetGame() {
    GridService.buildEmptyGameBoard();
  }

  createNewPiece() {
    this.currentPiece = new Piece({
        x: 4,
        y: 0
    });
    let collisionPoint = this.currentPiece.calculateCollisionPoint();
    if(collisionPoint.y <= this.currentPiece.PositionY) {
      this.gameOver();
      this.currentPiece = null;
    }
  }


  getGameSpeed() {
    return GameData.getGameSpeed();
  }

  isGamePause() {
    return this.state.isPause;
  }

  isGameStart() {
    return this.isStart;
  }

  setGamePause(pause) {
    this.setState({
      isPause: pause
    })
  }

  setGameStart(start) {
    this.isStart = start;
  }

  gameOver() {
    this.setGameStart(false);
  }

  getPositionX() {
      return this.currentPiece.PositionX;
  }

  getPositionY() {
      return this.currentPiece.PositionY;
  }

  getCurrentPiece() {
    return this.currentPiece;
  }

  getFilledCustomColor(cell) {
    if (cell.filled && cell.shape === 7) {
        return {
            'backgroundColor': GameData.getColor()
        };
    }else {
      return {};
    }
  }

  getFilledClass(cell) {
    let pieceClass = ['dy-grid-cell'];
    if (cell.filled || cell.current) {
        switch(cell.shape) {
            case 0: pieceClass.push('dy-L-filled');
                break;
            case 1: pieceClass.push('dy-O-filled');
                break;
            case 2: pieceClass.push('dy-I-filled');
                break;
            case 3: pieceClass.push('dy-T-filled');
                break;
            case 4: pieceClass.push('dy-J-filled');
                break;
            case 5: pieceClass.push('dy-S-filled');
                break;
            case 6: pieceClass.push('dy-Z-filled');
                break;
            default: pieceClass.push('dy-X-filled');
                break;
        }
    }
    if (cell.ghost) {
        if (pieceClass.length > 0) {
          pieceClass.push('dy-ghost-piece')
        }else {
          pieceClass.push('dy-ghost-piece')
        }
    }
    return pieceClass;
  }



  render() {
    let cells = this.state.grid.map((cell, i) => {
      let styles = this.getFilledCustomColor(cell);
      let pieceClasses = this.getFilledClass(cell).map((c) => {
        return c;
      })
      return (
        <div style={styles} key={i} className={cx(pieceClasses)}/>
      )
    })
    let pauseText = this.state.isPause ? 'Resume' : 'Pause';

    let pauseIcon = this.state.isPause ? <i className={'material-icons'} >pause</i> : <i className={'material-icons'}>play_arrow</i>;

    return (
      <div className="flexbox-container">
        <div>
          <div className={cx('dy-game-board')}>
            <div className={cx('dy-grid-container')}>
              {cells}
            </div>
          </div>
          <div>
            <div>
              <button onClick={() => this.startGame()}>
              <i className={'material-icons'}>android</i>
              </button>
              <button onClick={() => this.setGamePause(!this.state.isPause)}>
              {pauseIcon}
              </button>
              <button onClick={() => this.gameOver()}>
              <i className={'material-icons'}>stop</i>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h1>Instructions</h1>
          <ul className={'instrunction-list'}>
            <li >
            <i className={'material-icons'}>arrow_forward</i>
            </li>

            <li >
            <i className={'material-icons'}>arrow_upward</i>
            </li>

            <li >
            <i className={'material-icons'}>arrow_back</i>
            </li>

            <li >
            <i className={'material-icons'}>arrow_downward</i>
            </li>

            <li  >
            <i className={'material-icons'}>space_bar</i>
            </li>
          </ul>
        </div>
      </div>
    );
  }

}
