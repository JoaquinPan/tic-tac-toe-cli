const readlineSync = require("readline-sync");
const {
  createEmptyBoard,
  getInitialPlayerIdx,
  getPlayerByIdx,
  updateGame,
  checkWinner,
  getNextPlayerIdx,
} = require("./game");

function printBoard(board) {
  console.log("---------");
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    console.log(row.join(" | "));
    if (i !== board.length - 1) {
      console.log("---------");
    }
  }
  console.log("---------");
}

function twoPlayerGame() {
  let board = createEmptyBoard();
  let currentPlayerIdx = getInitialPlayerIdx();

  while (true) {
    printBoard(board);
    console.log(`It is ${getPlayerByIdx(currentPlayerIdx)}'s turn`);
    // 讓使用者輸入要下的位置
    const input = readlineSync.question(
      "Enter row and column(separated by space): "
    );
    // parse input
    const position = input.split(" ");
    if (position.length !== 2) {
      console.log("Invalid input");
      continue;
    }

    const [row, col] = position.map((x) => parseInt(x));
    if (isNaN(row) || isNaN(col)) {
      console.log("Invalid input");
      continue;
    }
    // update board
    const [newBoard, success] = updateGame(
      getPlayerByIdx(currentPlayerIdx),
      [row, col],
      board
    );
    if (!success) {
      console.log("Invalid position");
      continue;
    }
    const winner = checkWinner(newBoard);
    if (winner) {
      printBoard(newBoard);
      if (winner === "draw") {
        console.log("It's a draw!");
      }
      console.log(winner + " wins!");
      break;
    }

    // update currentPlayer
    currentPlayerIdx = getNextPlayerIdx(currentPlayerIdx);
    // update board
    board = newBoard;
  }
}
function main() {
  const mode = readlineSync.question(
    "Do you want to play single player? (y/n): "
  );
  if (mode === "y") {
    console.error("Not implemented");
  }
  return twoPlayerGame();
}

main();
