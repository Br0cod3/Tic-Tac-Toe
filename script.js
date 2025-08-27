const GamePilot = (function () {
  const generatePlayer = function (name, value) {
    return {
      name,
      value,
      myTurn: false,
      makeMove: function (row, column) {
        if (this.myTurn) {
          Gameboard.placemark(row, column, this.value, this);
          GameController.playMove();
        }
      },
    };
  };

  const checkWin = (board, player) => {
    const winConditions = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (const condition of winConditions) {
      const [[r1, c1], [r2, c2], [r3, c3]] = condition;

      if (
        board[r1][c1] === board[r2][c2] &&
        board[r2][c2] === board[r3][c3] &&
        (board[r1][c1] !== null) & (board[r1][c1] !== "")
      ) {
        return `${player.name} wins`;
      }
    }
    return null;
  };

  return { generatePlayer, checkWin };
})();

const Gameboard = (function () {
  const row = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let k = 0; k < columns; k++) {
      board[i][k] = null;
    }
  }

  const getBoard = () => board;

  const placemark = function (row, column, char, player) {
    if (board[row][column] !== null) {
      console.log("unable to move, that space is taken");
      return false;
    }
    board[row][column] = char;
    player.myTurn = false;
    return true;
  };

  const resetBoard = () => {
    for (let i = 0; i < row; i++) {
      board[i] = [];
      for (let k = 0; k < columns; k++) {
        board[i][k] = null;
      }
    }
  };

  return { getBoard, placemark, resetBoard };
})();

const GameController = (function () {
  const player1 = GamePilot.generatePlayer("Mark", "X");
  const player2 = GamePilot.generatePlayer("Mary", "O");

  let currentPlayer = player1;
  player1.myTurn = true;

  const switchTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    player1.myTurn = currentPlayer === player1;
    player2.myTurn = currentPlayer === player2;
  };

  const playMove = () => {
    const result = GamePilot.checkWin(Gameboard.getBoard(), currentPlayer);
    if (result) {
      console.log(result);
      return result;
    }
    switchTurn();
  };
  return { playMove, getCurrentPlayer: () => currentPlayer };
})();

GameController.getCurrentPlayer().makeMove(2, 2);
GameController.getCurrentPlayer().makeMove(0, 0);
GameController.getCurrentPlayer().makeMove(1, 0);
GameController.getCurrentPlayer().makeMove(0, 1);
GameController.getCurrentPlayer().makeMove(2, 0);
GameController.getCurrentPlayer().makeMove(0, 2)
console.log(Gameboard.getBoard());
