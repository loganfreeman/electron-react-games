import _ from 'underscore';
import {deepCopy} from './utils';

export const PATTERNS = [
  [
    [1, 5, 9, 10],
    [4, 5, 6, 8],
    [0, 1, 5, 9],
    [2, 4, 5, 6]
  ], // L
  [
    [0, 1, 4, 5],
    [0, 1, 4, 5],
    [0, 1, 4, 5],
    [0, 1, 4, 5]
  ], // O
  [
    [1, 5, 9, 13],
    [4, 5, 6, 7],
    [1, 5, 9, 13],
    [4, 5, 6, 7]
  ], // I
  [
    [1, 4, 5, 6],
    [1, 5, 6, 9],
    [4, 5, 6, 9],
    [1, 4, 5, 9]
  ], // T
  [
    [1, 5, 8, 9],
    [0, 4, 5, 6],
    [1, 2, 5, 9],
    [4, 5, 6, 10]
  ], // J
  [
    [1, 5, 6, 10],
    [5, 6, 8, 9],
    [1, 5, 6, 10],
    [5, 6, 8, 9]
  ], // S
  [
    [4, 5, 9, 10],
    [1, 4, 5, 8],
    [4, 5, 9, 10],
    [1, 4, 5, 8]
  ] // Z
]

export const PATTERN_COOR = [
  // L
  [
    [{
      x: 1,
      y: 0
    }, {
      x: 1,
      y: 1
    }, {
      x: 1,
      y: 2
    }, {
      x: 2,
      y: 2
    }],
    [{
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }, {
      x: 2,
      y: 1
    }, {
      x: 0,
      y: 2
    }],
    [{
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: 1,
      y: 1
    }, {
      x: 1,
      y: 2
    }],
    [{
      x: 2,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }, {
      x: 2,
      y: 1
    }]
  ],
  // O
  [
    [{
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }],
    [{
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }],
    [{
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }],
    [{
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }]
  ],
  // I
  [
    [{
      x: 1,
      y: 0
    }, {
      x: 1,
      y: 1
    }, {
      x: 1,
      y: 2
    }, {
      x: 1,
      y: 3
    }],
    [{
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }, {
      x: 2,
      y: 1
    }, {
      x: 3,
      y: 1
    }],
    [{
      x: 1,
      y: 0
    }, {
      x: 1,
      y: 1
    }, {
      x: 1,
      y: 2
    }, {
      x: 1,
      y: 3
    }],
    [{
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }, {
      x: 2,
      y: 1
    }, {
      x: 3,
      y: 1
    }]
  ],
  // T
  [
    [{
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }, {
      x: 2,
      y: 1
    }],
    [{
      x: 1,
      y: 0
    }, {
      x: 1,
      y: 1
    }, {
      x: 2,
      y: 1
    }, {
      x: 1,
      y: 2
    }],
    [{
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }, {
      x: 2,
      y: 1
    }, {
      x: 1,
      y: 2
    }],
    [{
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }, {
      x: 1,
      y: 2
    }]
  ],
  // J
  [
    [{
      x: 1,
      y: 0
    }, {
      x: 1,
      y: 1
    }, {
      x: 0,
      y: 2
    }, {
      x: 1,
      y: 2
    }],
    [{
      x: 0,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }, {
      x: 2,
      y: 1
    }],
    [{
      x: 1,
      y: 0
    }, {
      x: 2,
      y: 0
    }, {
      x: 1,
      y: 1
    }, {
      x: 1,
      y: 2
    }],
    [{
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }, {
      x: 2,
      y: 1
    }, {
      x: 2,
      y: 2
    }]
  ],
  // S
  [
    [{
      x: 1,
      y: 0
    }, {
      x: 1,
      y: 1
    }, {
      x: 2,
      y: 1
    }, {
      x: 2,
      y: 2
    }],
    [{
      x: 1,
      y: 1
    }, {
      x: 2,
      y: 1
    }, {
      x: 0,
      y: 2
    }, {
      x: 1,
      y: 2
    }],
    [{
      x: 1,
      y: 0
    }, {
      x: 1,
      y: 1
    }, {
      x: 2,
      y: 1
    }, {
      x: 2,
      y: 2
    }],
    [{
      x: 1,
      y: 1
    }, {
      x: 2,
      y: 1
    }, {
      x: 0,
      y: 2
    }, {
      x: 1,
      y: 2
    }]
  ],
  // Z
  [
    [{
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }, {
      x: 1,
      y: 2
    }, {
      x: 2,
      y: 2
    }],
    [{
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }, {
      x: 0,
      y: 2
    }],
    [{
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }, {
      x: 1,
      y: 2
    }, {
      x: 2,
      y: 2
    }],
    [{
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }, {
      x: 0,
      y: 2
    }]
  ]
]

export const ROTATION_MATRIX = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3]
  ],
  [ // rotate 90
    [3, 0],
    [2, 0],
    [1, 0],
    [0, 0],
    [3, 1],
    [2, 1],
    [1, 1],
    [0, 1],
    [3, 2],
    [2, 2],
    [1, 2],
    [0, 2],
    [3, 3],
    [2, 3],
    [1, 3],
    [0, 3]
  ],
  [ // rotate 180
    [3, 3],
    [3, 2],
    [3, 1],
    [3, 0],
    [2, 3],
    [2, 2],
    [2, 1],
    [2, 0],
    [1, 3],
    [1, 2],
    [1, 1],
    [1, 0],
    [0, 3],
    [0, 2],
    [0, 1],
    [0, 0]
  ],
  [ // rotate 270
    [0, 3],
    [1, 3],
    [2, 3],
    [3, 3],
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0]
  ]
]


export const BOARD_CONST = {
  borderWidth: 10,
  pieceWidthInPixel: 25, // match the pixel of piece in grid
  boardWidth: 10,
  boardHeight: 20
}

export const GAMESPEED = {
  'BEGINNER': 800,
  'INTERMEDIATE': 500,
  'ADVANCED': 300,
  'EXPERT': 200,
  'SUPER': 150
}

export function getBoardWidth() {
  return BOARD_CONST.boardWidth;
}

export function getBoardHeight() {
  return BOARD_CONST.boardHeight;
}


export var coordToPosMem = _.memoize(function(pos) {
  return (pos.y * getBoardWidth()) + pos.x;
}, function(pos) {
  return '' + pos.x + pos.y;
});

export var posToCoord = _.memoize(function(i) {
  var x = i % getBoardWidth(),
    y = (i - x) / getBoardWidth();

  return new Coordinate(x, y);
});

export var withinGridMem = _.memoize(function(cell) {
  return cell.x >= 0 && cell.x < getBoardWidth() &&
    cell.y >= 0 && cell.y < getBoardHeight();
}, function(cell) {
  return '' + cell.x + cell.y;
});

export function generateUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
  return uuid;
}

export var getX = _.memoize(function(x) {
  return x * BOARD_CONST.pieceWidthInPixel + BOARD_CONST.borderWidth;
})

export var getY = _.memoize(function(y) {
  return y * BOARD_CONST.pieceWidthInPixel;
})

/* grid service is a singleton */

export class GridService {
  constructor() {
    this.grid = [];
  }
}

const gridService = new GridService();


GridService.getSingleton = () => gridService;

GridService.buildEmptyGameBoard = () => {
  var sizeOfBoard = getBoardWidth() * getBoardHeight();
  for (var i = 0; i < sizeOfBoard; i++) {
    GridService.getSingleton().grid[i] = {
      filled: false,
      shape: null,
      ghost: false
    };
  }
}

GridService.updateGhostPiece = (cell) => {
  var pos = coordToPosMem(cell);
  GridService.getSingleton().grid[pos].ghost = true;
}

GridService.updateCurrentPiece = (cell, shape) => {
  var pos = coordToPosMem(cell);
  GridService.getSingleton().grid[pos].current = true;
  GridService.getSingleton().grid[pos].shape = shape;
}

GridService.resetGhostPiece = () => {
  for (var i = 0, len = GridService.getSingleton().grid.length; i < len; i++) {
    GridService.getSingleton().grid[i].ghost = false;
  }
}

GridService.resetCurrentPiece = () => {
  for (var i = 0, len = GridService.getSingleton().grid.length; i < len; i++) {
    GridService.getSingleton().grid[i].current = false;
  }
}

GridService.movePieceDownLevel = (row) => {
  for (var i = row - 1; i >= 0; i--) {
    for (var j = 0; j < getBoardWidth(); j++) {
      var curPos = coordToPosMem({
          x: j,
          y: i
        }),
        nextPos = coordToPosMem({
          x: j,
          y: i + 1
        });
      GridService.getSingleton().grid[nextPos] = _.clone(GridService.getSingleton().grid[curPos]);
      GridService.getSingleton().grid[curPos].filled = false;
      GridService.getSingleton().grid[curPos].shape = null;
    }
  }
  return GridService;
}

GridService.clearNthRow = (row) => {
  for (var z = 0; z < getBoardWidth(); z++) {
    var pos = coordToPosMem({
      x: z,
      y: row
    });
    GridService.getSingleton().grid[pos].filled = false;
    GridService.getSingleton().grid[pos].shape = null;
  }
  return GridService;
}

GridService.checkAndClearFilledRow = (cb) => {
  for (var i = 0; i < getBoardHeight(); i++) {
    var j = 0;
    for (; j < getBoardWidth(); j++) {
      var pos = coordToPosMem({
        x: j,
        y: i
      });
      if (!GridService.getSingleton().grid[pos].filled) {
        break;
      }
    }
    if (j === getBoardWidth()) {
      // clear the row
      GridService
        .clearNthRow(i)
        .movePieceDownLevel(i);
      cb();
    }
  }
}

GridService.isPieceVerify = (coord) => {
  var pos = coordToPosMem(coord);
  if (GridService.getSingleton().grid[pos].filled) {
    return false;
  }
  return true;
}

GridService.insertPiece = (piece, gameOver) => {
  var coordArray = piece.getPieceCoordArray();
  for (var i = 0; i < coordArray.length; i++) {
    var pos = coordToPosMem(coordArray[i]);
    if (GridService.getSingleton().grid[pos].filled) {
      gameOver();
    } else {
      GridService.getSingleton().grid[pos].filled = true;
      GridService.getSingleton().grid[pos].shape = piece.getShape();
    }
  }
}


export class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
}

export class GameData {
  static getBestScore() {
    return parseInt(localStorage.getItem('game.bestScore'), 10) || 0;
  }

  static getColor() {
    return GameData.customColorChosen;
  }
  static setColor(color) {
    GameData.customColorChosen = color;
  }
  static getGameSpeed() {
    return parseInt(localStorage.getItem('game.speed'), 10) || GAMESPEED['BEGINNER'];
  }
  static setGameSpeed(speed: number) {
    localStorage.setItem('game.speed', speed.toString());
  }
}

GameData.availableColors = 5;
GameData.rotationLimit = 4;
GameData.patternLimit = 7;
GameData.cssAnimateTimeout = 300;
GameData.maxCustomPiece = 5;
GameData.customPieceWidth = 4;
GameData.score = 0;


export class Piece {
  constructor(pos) {
    var position = pos || {
      x: 4,
      y: 0
    };
    this.x = position.x;
    this.y = position.y;
    this.rotation = Math.floor(Math.random() * GameData.rotationLimit);
    this.patterns = Math.floor(Math.random() * GameData.patternLimit);
    this.id = generateUID();
    GridService.resetGhostPiece();
  }

  get Coord() {
    return {
      x: this.x,
      y: this.y
    }
  }

  set Coord(c) {
    this.x = c.x;
    this.y = c.y;
  }

  get Patterns() {
    return this.patterns;
  }

  get Rotation() {
    return this.rotation;
  }

  set Rotation(rotation) {
    this.rotation = rotation;
  }

  get PositionX() {
    return this.x;
  }

  set PositionX(x) {
    this.x = x;
  }

  get PositionY() {
    return this.y;
  }

  set PositionY(y) {
    this.y = y;
  }

  getLeft() {
    return getX(this.PositionX);
  }

  getTop() {
    return getY(this.PositionY);
  }

  updatePosition(newPosition, cb) {
    var isMoveDown = isNaN(newPosition.y) ? false : newPosition.y > this.y;
    var x = isNaN(newPosition.x) ? this.x : newPosition.x,
      y = isNaN(newPosition.y) ? this.y : newPosition.y,
      isVerified = this.verifyPiece({
        x: x,
        y: y
      });

    if (isVerified) {
      this.x = x;
      this.y = y;
    } else if (!isVerified && isMoveDown) {
      if (_.isFunction(cb)) {
        cb();
      }
    }
    return this;
  }

  getPatternCoord() {
    return PATTERN_COOR[this.patterns][this.rotation];
  }

  getPieceCoordArray() {
    return this.convertPatternToCoordinates();
  }

  getShape() {
    return this.patterns;
  }

  restore(rotation, patterns) {
    this.rotation = rotation;
    this.patterns = patterns;
  }

  getPattern() {
    return PATTERNS[this.patterns][this.rotation];
  }

  rotatePiece() {
    var oldRotation = this.rotation;
    this.rotation = (this.rotation + 1) % GameData.rotationLimit;
    if (!this.verifyPiece()) {
      this.rotation = oldRotation;
    }
    return this;
  }

  verifyPiece(cell) {
    var coord = this.convertPatternToCoordinates(cell),
      isOk = true;
    for (var i = 0, len = coord.length; i < len; i++) {
      if (!withinGridMem(coord[i]) || !GridService.isPieceVerify(coord[i])) {
        isOk = false;
        break;
      }
    }
    return isOk;
  }

  withinGrid(coord) {
    return withinGridMem(coord);
  }

  destroy() {
    this.x = null;
    this.y = null;
    this.rotation = null;
    this.patterns = null;
    this.id = null;
    GridService.resetGhostPiece();
  }

  updateCurrentPiece() {
    GridService.resetCurrentPiece();
    let coord = this.convertPatternToCoordinates();
    for (var i = 0, len = coord.length; i < len; i++) {
      GridService.updateCurrentPiece(coord[i], this.getShape());
    }
  }

  updateGhostPiece() {
    var point = this.calculateCollisionPoint(),
      coord = this.convertPatternToCoordinates(point);
    GridService.resetGhostPiece();
    for (var i = 0, len = coord.length; i < len; i++) {
      GridService.updateGhostPiece(coord[i]);
    }
  }

  calculateCollisionPoint() {
    var cell = {
      x: this.x,
      y: this.y
    };
    for (var i = cell.y; i < getBoardHeight(); i++) {
      cell.y = i;
      if (!this.verifyPiece(cell)) {
        break;
      }
    }
    cell.y--;
    return cell;
  }

  convertPatternToCoordinates(cell) {
    var coord = deepCopy(this.getPatternCoord()),
      location = cell || {
        x: this.x,
        y: this.y
      };
    _.each(coord, function(ele, index) {
      coord[index].x += location.x;
      coord[index].y += location.y;
    });
    return coord;
  }

}
