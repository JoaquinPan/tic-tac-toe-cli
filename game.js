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
};
