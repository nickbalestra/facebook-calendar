export const byTime = (a, b) => {
  if((a.start - b.start) === 0) {
    return b.end - a.end;
  } else {
    return a.start - b.start;
  }
}

export class Column {
  constructor(index) {
    this.end = - Infinity;
    this.events = [];
    this.index = index || 0;
  }

  insert(event) {
    if (event.start >= this.end) {
      const events = this.events;
      this.end = event.end;
      event.offset = this.index;

      if (!event._intersectionGroup) {
        const intersectionGroup = { 
          length: this.index + 1,
          end: this.end
        };
        if (events.length && event.start < events[events.length - 1]._intersectionGroup.end) {
          intersectionGroup.length = events[events.length - 1]._intersectionGroup.length;
        }
        event._intersectionGroup = intersectionGroup;
      }
      if (event._intersectionGroup.length - 1 < this.index) {
        event._intersectionGroup.length = this.index + 1;
      }
      if (event._intersectionGroup.end < event.end) {
        event._intersectionGroup.end = event.end;
      }

      events.push(event);
      return true;
    }
    if (!this.nextColumn) {
      const culumn = new Column(this.index + 1);
      this.nextColumn = culumn;
    }
    if (!event._intersectionGroup) {
      const _intersectionGroup = this.events[this.events.length - 1]._intersectionGroup;
      event._intersectionGroup = _intersectionGroup;
    }
    return this.nextColumn.insert(event);
  }

  traverseAll(iterator) {
    this.events.forEach(iterator);
    if (!this.nextColumn) {
      return true;
    }
    return this.nextColumn.traverseAll(iterator);
  }
}

export default function layOutEvents(events, iterator) {
  events.sort(byTime);
  const firstColumn = new Column();
  events.forEach(event => firstColumn.insert(event));
  firstColumn.traverseAll(iterator)
}
