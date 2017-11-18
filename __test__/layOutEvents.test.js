const { Column } = require("../src/components/events/layOutEvents");

test("insert a confliting event in a new column", () => {
  const firstColumn = new Column();
  firstColumn.insert({ start: 0, end: 400 });
  expect(firstColumn.nextColumn).toBeUndefined();
  firstColumn.insert({ start: 0, end: 400 });
  expect(firstColumn.nextColumn).toBeInstanceOf(Column);
});

test("track conflicting groups length", () => {
  const firstColumn = new Column();
  [
    { start: 0, end: 400 },
    { start: 100, end: 300 },
    { start: 100, end: 200 },
    { start: 200, end: 300 }
  ].forEach(event => firstColumn.insert(event));
  firstColumn.traverseAll(event => {
    expect(event._intersectionGroup.length).toBe(3);
  });
});

test("group events by conflicts", () => {
  const firstColumn = new Column();
  [
    { start: 0, end: 400 },
    { start: 100, end: 300 },
    { start: 100, end: 200 },
    { start: 200, end: 300 },
    { start: 400, end: 600 },
    { start: 400, end: 500 }
  ].forEach(event => firstColumn.insert(event));
  firstColumn.traverseAll(event => {
    expect(event).toMatchSnapshot();
  });
});
