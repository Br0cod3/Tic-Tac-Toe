const GamePilot = (function () {
  const generatePlayer = function (name, value) {
    return {
      name,
      value,
      myTurn: false,
      makeMove: function(row, column) {
        if (this.myTurn) {
          Gameboard.placemark(row, column, this.value, this)
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