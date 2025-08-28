const GamePilot = (function () {
  const generatePlayer = function (name, value) {
    return {
      name,
      value,
      myTurn: false,
      makeMove: function (row, column) {
        if (this.myTurn) {
          const success = Gameboard.placemark(row, column, this.value, this);
          if (success) {
            DomController.updateCell(row, column, this.value)
            GameController.playMove();
            return true;
          }
        }
        return false;
      },
    };
  };

  const initializePlayers = function () {
    const dom = DomController.playerInputs();
    const player1 = GamePilot.generatePlayer(dom.input1, "X");
    const player2 = GamePilot.generatePlayer(dom.input2, "O");
    player1.myTurn = true;

    return { player1, player2 };
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
        DomController.displayBox.textContent = `${player.name} wins`;
        return `${player.name} wins`;
      }
    }
    return null;
  };

  const checkDraw = (board) => {
    for (let row of board) {
      for (let cell of row) {
        if (cell === "" || cell === null) {
          return false;
        }
      }
    }
    DomController.displayBox.textContent = "It's a tie";
    return true;
  };

  return { generatePlayer, checkWin, initializePlayers, checkDraw };
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

const DomController = (function () {
  const start = document.querySelector(".start");
  const form = document.querySelector(".form");
  const submit = document.querySelector(".submit");
  const reset = document.querySelector(".reset");
  const pads = document.querySelectorAll(".mark");
  const displayBox = document.querySelector(".displaybox");

  const playerInputs = function () {
    const input1 = document.getElementById("player1").value;
    const input2 = document.getElementById("player2").value;
    return { input1, input2 };
  };

  const handleClick = function (e) {
    const row = e.target.getAttribute("data-row");
    const column = e.target.getAttribute("data-col");

    const currentPlayer = GameController.getCurrentPlayer();
   
    currentPlayer.makeMove(row, column)
  };

  const addPadListeners = () => {
    pads.forEach((position) => {
      position.addEventListener("click", handleClick);
    });
  };

  const removePadListeners = () => {
    pads.forEach((pad) => {
      pad.innerHTML = "";
      pad.removeEventListener("click", handleClick);
    });
  };

  const updateCell = function(row, column, value) {
    const selector = `[data-row='${row}'][data-col='${column}']`
    const cell = document.querySelector(selector);

    if(cell) cell.innerHTML = value;
  }

  start.addEventListener("click", () => {
    form.classList.remove("hidden");
  });

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const { input1, input2 } = playerInputs();
    if (!input1 || !input2) {
      alert("please enter in both player's names");
      return;
    }
    addPadListeners();
    GameController.initializeGame();
    form.classList.add("hidden");
  });

  reset.addEventListener("click", () => {
    Gameboard.resetBoard();
    removePadListeners();
    GameController.resetGame();
    displayBox.textContent = "";
    form.reset();
    form.classList.remove("hidden");
  });

  return { playerInputs, removePadListeners, displayBox, updateCell };
})();

const GameController = (function () {
  let currentPlayer = null;
  let player1 = null;
  let player2 = null;

  const initializeGame = () => {
    const players = GamePilot.initializePlayers();
    player1 = players.player1;
    player2 = players.player2;
    currentPlayer = player1;
  };

  const switchTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    player1.myTurn = currentPlayer === player1;
    player2.myTurn = currentPlayer === player2;
  };

  const eventReset = () => {
    Gameboard.resetBoard();
    DomController.removePadListeners();
    GameController.resetGame();
  };

  const playMove = () => {
    const board = Gameboard.getBoard();
    const result = GamePilot.checkWin(Gameboard.getBoard(), currentPlayer);

    if (result) {
      console.log(result);
      eventReset();
      return result;
    }

    if (GamePilot.checkDraw(board)) {
      console.log("It's a draw");
      eventReset();
      return "draw";
    }
    switchTurn();
  };

  const resetGame = () => {
    player1 = null;
    player2 = null;
    currentPlayer = null;
  };

  return {
    initializeGame,
    playMove,
    getCurrentPlayer: () => currentPlayer,
    resetGame,
  };
})();
