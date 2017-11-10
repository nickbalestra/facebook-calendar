import {eventsContainerWidth, eventsLRPadding} from './config';

const byTime = (a, b) =>
  a.start > b.start || (a.start === b.start && a.end > b.end) ? 1 : -1;

const byLength = (a, b) => (a.length >= b.length ? -1 : 1);

const sanitize = (event, index) => {
  // TODO: VALIDATE EVENT FORMAT
  event.uuid = index;
  return event;
};

const doOverlap = (eventA, eventB) =>
  eventB.start < eventA.end && eventB.end > eventA.start;

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

const getRows = events => {
  events = events.map(sanitize).sort(byTime);
  return getRowHeads(events).map(head => getRow(events, head));
};

const addWidths = rows => {
  return rows.sort(byLength).map(row => {
    let width = (eventsContainerWidth - eventsLRPadding * 2) / row.length;
    row.some(event => {
      if (event.width) {
        width = event.width;
        return true;
      }
    });
    return row.map(event => {
      event.width = width;
      return event;
    });
  });
};

const addOffsets = rows => {
  return rows.map(row =>
    row.map((event, index, row) => {
      if (event.offset === undefined) {
        event.offset = index;
      } else if (event.offset !== index) {
        const temp = row[event.offset];
        temp.offset = index;
        row[event.offset] = event;
        event = temp;
      }
      return event;
    })
  );
};

const flatten = array => {
  return array.reduce((acc, cur) => acc.concat(cur), []);
};

const uniques = array => {
  return array.reduce(
    (uniques, event) => {
      if (!uniques[event.uuid]) {
        uniques[event.uuid] = true;
        uniques._results.push(event);
      }
      return uniques;
    },
    { _results: [] }
  )._results;
};

function layOutAlgo(events) {
  const rows = getRows(events);
  const rowsWithWidths = addWidths(rows);
  const rowsWithOffsetsAndWidth = addOffsets(rowsWithWidths);
  const processed = uniques(flatten(rowsWithOffsetsAndWidth));
  console.table(processed);
  return processed;
}

export default layOutAlgo;
