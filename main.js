const readlineSync = require("readline-sync");
const {
  createEmptyBoard,
  getInitialPlayerIdx,
  getPlayerByIdx,
  updateGame,
  checkWinner,
  getNextPlayerIdx,
  computeBestMove,
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

function singlePlayerGame() {
  let board = createEmptyBoard();
  let currentPlayerIdx = getInitialPlayerIdx();

  const isPlayerFirstYN = readlineSync.question(
    "Do you want to go first? (y/n): "
  );
  const isPlayerFirst = isPlayerFirstYN === "y";

  while (true) {
    printBoard(board);
    console.log(`It is ${getPlayerByIdx(currentPlayerIdx)}'s turn`);
    let [row, col] = [0, 0];
    if (
      (isPlayerFirst && currentPlayerIdx === 0) ||
      (!isPlayerFirst && currentPlayerIdx === 1)
    ) {
      // 玩家回合
      // get input from user
      const input = readlineSync.question(
        "Enter row and column(separated by space): "
      );
      // parsse input
      const position = input.split(" ");
      if (position.length !== 2) {
        console.log("Invalid input");
        continue;
      }

      [row, col] = position.map((x) => parseInt(x));
      if (isNaN(row) || isNaN(col)) {
        console.log("Invalid input");
        continue;
      }
    } else {
      // AI 回合
      const player = getPlayerByIdx(currentPlayerIdx);
      [row, col] = computeBestMove(player, board);
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
    // 看看有沒有人贏
    const winner = checkWinner(newBoard);
    if (winner) {
      printBoard(newBoard);
      if (winner === "draw") {
        console.log("It's a draw!");
        break;
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
    return singlePlayerGame();
  }
  return twoPlayerGame();
}

main();
