import { doOverlap } from "./utils";

const getRow = (events, at) => {
  const intersection = {
    start: events[at].start,
    end: events[at].end,
    events: [events[at]]
  };
  const row = events.reduce((row, event, index) => {
    if (at !== index && doOverlap(event, row)) {
      row.start = event.start;
      if (event.end < row.end) {
        row.end = event.end;
      }
      row.events.push(event);
    }
    return row;
  }, intersection);

  return row.events;
};

const getRowHeads = events => {
  console.log(events)
  const row = {
    start: events[0].start,
    end: events[0].end
  };
  return events.reduce(
    (heads, event, index) => {
      if (doOverlap(event, row)) {
        row.start = event.start;
        if (event.end < row.end) {
          row.end = event.end;
        }
      } else {
        heads.push(index);
      }
      return heads;
    },
    [0]
  );
};

export default function getRows(events) {
  return getRowHeads(events).map(head => getRow(events, head));
}
