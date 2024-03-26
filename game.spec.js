const {
  createEmptyBoard,
  updateGame,
  checkWinner,
  EMPTY,
  P1,
  P2,
  computeBestMove,
} = require("./game");

describe("createEmptyBoard", () => {
  test("creates empty board", () => {
    const board = createEmptyBoard();
    expect(board).toEqual([
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ]);
  });
});

describe("updateGame", () => {
  test("update success", () => {
    const state = [
      [P1, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];

    const [newState, success] = updateGame(P2, [1, 1], state);
    expect(success).toBe(true);
    expect(newState).toEqual([
      [P1, EMPTY, EMPTY],
      [EMPTY, P2, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ]);
  });

  test("update failure", () => {
    const state = [
      [P1, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const [newState, success] = updateGame(P2, [0, 0], state);
    expect(success).toBe(false);
    expect(newState).toEqual([
      [P1, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ]);
  });

  test("out of bounds", () => {
    const state = [
      [P1, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const [newState, success] = updateGame(P2, [3, 3], state);
    expect(success).toBe(false);
    expect(newState).toEqual([
      [P1, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ]);
  });
});

describe("checkWinner", () => {
  test("Top row wins", () => {
    expect(
      checkWinner([
        [P1, P1, P1],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
      ])
    ).toBe(P1);
  });
  test("Middle row wins", () => {
    expect(
      checkWinner([
        [EMPTY, EMPTY, EMPTY],
        [P1, P1, P1],
        [EMPTY, EMPTY, EMPTY],
      ])
    ).toBe(P1);
  });
  test("Bottom row wins", () => {
    expect(
      checkWinner([
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [P1, P1, P1],
      ])
    ).toBe(P1);
  });
  test("No winner", () => {
    expect(
      checkWinner([
        [P1, P2, P1],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
      ])
    ).toBe(null);
  });
  test("No winner 2", () => {
    expect(
      checkWinner([
        [P1, EMPTY, P1],
        [EMPTY, P2, EMPTY],
        [EMPTY, P2, P2],
      ])
    ).toBe(null);
  });
  test("No winner 3", () => {
    expect(
      checkWinner([
        [P1, P2, P1],
        [P1, P2, EMPTY],
        [P2, EMPTY, EMPTY],
      ])
    ).toBe(null);
  });

  test("Diag 1", () => {
    expect(
      checkWinner([
        [EMPTY, EMPTY, P1],
        [EMPTY, P1, EMPTY],
        [P1, EMPTY, EMPTY],
      ])
    ).toBe(P1);
  });
  test("Diag 2", () => {
    expect(
      checkWinner([
        [P1, EMPTY, EMPTY],
        [EMPTY, P1, EMPTY],
        [EMPTY, EMPTY, P1],
      ])
    ).toBe(P1);
  });
  test("Diag 3", () => {
    expect(
      checkWinner([
        [EMPTY, EMPTY, P2],
        [EMPTY, P2, EMPTY],
        [P2, EMPTY, EMPTY],
      ])
    ).toBe(P2);
  });

  test("col 0", () => {
    expect(
      checkWinner([
        [P2, EMPTY, P2],
        [P2, P2, EMPTY],
        [P2, EMPTY, EMPTY],
      ])
    ).toBe(P2);
  });

  test("col 1", () => {
    expect(
      checkWinner([
        [P1, P2, P2],
        [EMPTY, P2, EMPTY],
        [EMPTY, P2, EMPTY],
      ])
    ).toBe(P2);
  });
});

describe("computeBestMove", () => {
  test("winning move1", () => {
    const state = [
      [P1, P1, EMPTY],
      [P2, P2, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const move = computeBestMove(P1, state);
    expect(move).toEqual([0, 2]);
  });
  test("winning move2", () => {
    const state = [
      [P1, P2, EMPTY],
      [P1, P2, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const move = computeBestMove(P1, state);
    expect(move).toEqual([2, 0]);
  });
  test("winning move3", () => {
    const state = [
      [P2, EMPTY, P1],
      [EMPTY, P1, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const move = computeBestMove(P2, state);
    expect(move).toEqual([2, 0]);
  });
  test("winning move4", () => {
    const state = [
      [P2, EMPTY, P1],
      [EMPTY, P1, EMPTY],
      [P2, EMPTY, EMPTY],
    ];
    const move = computeBestMove(P1, state);
    expect(move).toEqual([1, 0]);
  });
  test("winning move5", () => {
    const state = [
      [P2, EMPTY, P1],
      [P1, P1, EMPTY],
      [P2, EMPTY, EMPTY],
    ];
    const move = computeBestMove(P2, state);
    expect(move).toEqual([1, 2]);
  });
  test("winning move6", () => {
    const state = [
      [P2, EMPTY, P1],
      [P1, P1, P2],
      [P2, P1, EMPTY],
    ];
    const move = computeBestMove(P2, state);
    expect(move).toEqual([0, 1]);
  });
  test("winning move7", () => {
    const state = [
      [P2, P2, P1],
      [P1, P1, P2],
      [P2, P1, EMPTY],
    ];
    const move = computeBestMove(P1, state);
    expect(move).toEqual([2, 2]);
  });
  test("winning move8", () => {
    const state = [
      [P1, P1, P2],
      [P1, P2, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const move = computeBestMove(P2, state);
    expect(move).toEqual([2, 0]);
  });
  test("winning move9", () => {
    const state = [
      [P1, P1, P2],
      [EMPTY, P2, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const move = computeBestMove(P1, state);
    expect(move).toEqual([2, 0]);
  });
});
