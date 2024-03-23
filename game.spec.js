const { sum } = require("./game");

describe("sum", () => {
  test("1+1", () => {
    expect(sum(1, 2)).toBe(3);
  });
  test("2+2", () => {
    expect(sum(2, 2)).toBe(4);
  });
  test("-100+3", () => {
    expect(sum(-100, 3)).toBe(-97);
  });
});
