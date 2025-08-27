const GamePilot = (function () {
  const generatePlayer = function (name, value) {
    return {
      name,
      value,
      myTurn: false,
      makeMove: function (row, column) {
        if (this.myTurn) {
          Gameboard.placemark(row, column, this.value, this);
        }
      },
    };
  };
  return { generatePlayer };
})();

