import sanitize from './sanitize';
import {byTime, uniques, flatten} from './utils';
import getRows from './getRows';
import addWidths from './addWidths';
import addOffsets from './addOffsets';  

export default function layOutEvents(events) {
  const sanitizedEvents = events.map(sanitize).sort(byTime);  
  const rows = getRows(sanitizedEvents);
  const rowsWithWidths = addWidths(rows);
  const rowsWithOffsetsAndWidth = addOffsets(rowsWithWidths);
  return uniques(flatten(rowsWithOffsetsAndWidth));
}
