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

  const placemark = (row, column, char) => {
    board[row][column] = char;
  };

  const resetBoard = () => {
    for (let i = 0; i < row; i++) {
      board[i] = [];
      for (let k = 0; k < columns; k++) {
        board[i][k] = null;
      }
    }
  };

  return { getBoard, placemark, resetBoard }
})();

const GameController = (function() {
  let player = 0
  let char;
  
  const makePlayer = (name) => {
    if (player > 1) return;
    
    char = player === 0 ? "X" : "O"
    playerIncrement()
    return { name, char}
  }

  const playerIncrement = () => player++;

  return { makePlayer }

})()

console.log(GameController.makePlayer("Mike"))
console.log(GameController.makePlayer("Mary"))
console.log(GameController.makePlayer("Mark"))
console.log(GameController.makePlayer("Mason"))