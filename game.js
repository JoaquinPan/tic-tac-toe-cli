const P1 = "X";
const P2 = "O";
const EMPTY = " ";
const PLAYERS = [P1, P2];

function createEmptyBoard() {
  return [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
  ];
}

function updateGame(player, pos, state) {
  const i = pos[0];
  const j = pos[1];

  if (i < 0 || i >= state.length) {
    return [state, false];
  }
  if (j < 0 || j >= state[i].length) {
    return [state, false];
  }
  if (state[i][j] !== EMPTY) {
    return [state, false];
  }

  const newState = state.map((row, rowIndex) => {
    if (rowIndex === i) {
      return row.map((cell, colIndex) => {
        if (colIndex === j) {
          return player;
        }
        return cell;
      });
    }
    return row;
  });

  return [newState, true];
}

function checkWinner(state) {
  const winner = checkRows(state) || checkCols(state) || checkDiags(state);
  if (winner !== null) {
    return winner;
  }

  if (isBoardFull(state)) {
    return "draw";
  }

  return null;
}

function checkRows(state) {
  for (let i = 0; i < state.length; i++) {
    const row = state[i];
    const winner = checkRow(row);
    if (winner !== null) {
      return winner;
    }
  }
  return null;
}

function checkRow(row) {
  const first = row[0];
  if (first === EMPTY) {
    return null;
  }
  for (let i = 1; i < row.length; i++) {
    if (row[i] !== first) {
      return null;
    }
  }
  return first;
}

function checkCols(state) {
  for (let i = 0; i < state.length; i++) {
    const col = state.map((row) => row[i]);
    const winner = checkRow(col);
    if (winner) {
      return winner;
    }
  }
  return null;
}

function checkDiags(state) {
  const diag1 = state.map((row, i) => row[i]);
  const diag2 = state.map((row, i) => row[row.length - 1 - i]);
  return checkRow(diag1) || checkRow(diag2);
}

function isBoardFull(state) {
  for (let i = 0; i < state.length; i++) {
    const row = state[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === EMPTY) {
        return false;
      }
    }
  }
  return true;
}

function getInitialPlayerIdx() {
  return 0;
}

function getPlayerByIdx(playIdx) {
  return PLAYERS[playIdx];
}

function getNextPlayerIdx(playIdx) {
  return (playIdx + 1) % PLAYERS.length;
}

function getNextPlayer(player) {
  const playerIdx = PLAYERS.indexOf(player);
  const nextPlayerIdx = getNextPlayerIdx(playerIdx);
  return PLAYERS[nextPlayerIdx];
}

function computeBestMove(player, board) {
  const moves = getPossibleMoves(board);
  const scores = moves.map(([i, j]) => {
    const [newBoard, success] = updateGame(player, [i, j], board);
    return computeScore(player, 0, newBoard);
  });
  const bestScore = player === P1 ? Math.max(...scores) : Math.min(...scores);
  const bestScoreIdx = scores.indexOf(bestScore);
  return moves[bestScoreIdx];
}

function getPossibleMoves(board) {
  const moves = [];
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === EMPTY) {
        moves.push([i, j]);
      }
    }
  }
  return moves;
}

function computeScore(player, depth, board) {
  // 終止條件
  const winner = checkWinner(board);
  if (winner === P1) {
    // P1 想要分數越高越好
    return 10 - depth;
  }
  if (winner === P2) {
    // P2 想要分數越低越好（負的）
    return depth - 10;
  }
  if (winner === "draw") {
    return 0;
  }
  // 看下一步的分數
  const moves = getPossibleMoves(board);
  const nextPlayer = getNextPlayer(player);
  const scores = moves.map(([i, j]) => {
    const [newBoard, success] = updateGame(nextPlayer, [i, j], board);
    return computeScore(nextPlayer, depth + 1, newBoard);
  });
  // 如果下個玩家是P2, 他會最小化分數（我要假設對手是聰明的）
  if (nextPlayer === P2) {
    return Math.min(...scores);
  }
  // 如果下個玩家是P1, 他就會最大化分數
  return Math.max(...scores);
}

module.exports = {
  createEmptyBoard,
  updateGame,
  checkWinner,
  EMPTY,
  P1,
  P2,
  getInitialPlayerIdx,
  getPlayerByIdx,
  getNextPlayerIdx,
  computeBestMove,
};
