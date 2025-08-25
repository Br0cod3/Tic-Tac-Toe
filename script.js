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
