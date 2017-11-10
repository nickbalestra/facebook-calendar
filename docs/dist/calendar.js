(function () {
'use strict';

const eventsContainerWidth = 620;
const eventsContainerHeight = 720;
const eventsLRPadding = 10;
const timeLineWidth = 60;
const startTime = 9.00;
const endTime = 21.00;

const css = `
.calendar {    
  width: ${timeLineWidth + eventsContainerWidth}px;
  display: flex;
}
.calendar__timeline {
  text-align: right;
  width: 60px;
  background-color: rgba(255,255,255,1);
}
.calendar__timeline__time {
  margin: 0;
  height: ${eventsContainerHeight / (endTime - startTime)}px;
}
.calendar__events {
  position: relative;
  min-width: ${eventsContainerWidth}px;
  height: ${eventsContainerHeight}px;
  background-color: rgba(0,0,0,.1);
  background-image: linear-gradient(#ccc 1px, transparent 1px);
  background-size: 100% 30px; 
}
.calander__events__item {
  position: absolute;
  border-left: 8px solid #3b5998;
  background-color: rgba(0,0,0,.1);      
}
`;

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

function render(events, root) {

  const fragment = document.createDocumentFragment();
  const calendarNode = document.createElement("article");
  calendarNode.className = "calendar";

  const timelineNode = document.createElement("section");
  timelineNode.className = "calendar__timeline";
  for (let i = 0; i < 13; i++) {
    const timeNode = document.createElement("p");
    timeNode.className = "calendar__timeline__time";
    const start = 9;
    const timeText =
      i + start <= 12 ? `${i + start} am` : `${i + start - 12} pm`;
    timeNode.textContent = timeText;
    timelineNode.appendChild(timeNode);
  }
  calendarNode.appendChild(timelineNode);
  fragment.appendChild(calendarNode);

  const eventsNode = document.createElement("article");
  eventsNode.className = "calendar__events";

  if (events.length) {
    const eventsWithWidthAndOffsets = layOutAlgo(events);

    eventsWithWidthAndOffsets.forEach(event => {
      const eventNode = document.createElement("article");
      eventNode.className = "calander__events__item";
      eventNode.setAttribute(
        "style",
        `top:${event.start}px;height:${event.end -
          event.start}px;width:${event.width}px; left:${event.width *
          event.offset +
          eventsLRPadding}px`
      );
      eventsNode.appendChild(eventNode);
    });
  }

  const style = document.createElement("style");
  style.innerHTML = css;
  document.getElementsByTagName("head")[0].appendChild(style);

  fragment.querySelector(".calendar").appendChild(eventsNode);
  if (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(fragment);
}

window.calendar = window.calendar || {
  render
};

}());
