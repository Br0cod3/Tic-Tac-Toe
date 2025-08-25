function Gameboard() {
    const rows = 3
    const columns = 3
    const board = []

    for(let i =  0; i < rows; i++) {
        board[i] = []
        for (let k = 0; k < columns; k++) {
            board[i][k] = [null]
        }
    }
    return {board};
}

const board = Gameboard()
console.log(board.board)
console.log(board)
