const byLength = (a, b) => (a.length >= b.length ? -1 : 1);

const byTime = (a, b) =>
  a.start > b.start || (a.start === b.start && a.end > b.end) ? 1 : -1;

const doOverlap = (eventA, eventB) =>
  eventB.start < eventA.end && eventB.end > eventA.start;

const flatten = array => array.reduce((acc, cur) => acc.concat(cur), []);

const uniques = array =>
  array.reduce(
    (uniques, event) => {
      if (!uniques[event.uuid]) {
        uniques[event.uuid] = true;
        uniques._results.push(event);
      }
      return uniques;
    },
    { _results: [] }
  )._results;

export { byLength, byTime, doOverlap, flatten, uniques };
