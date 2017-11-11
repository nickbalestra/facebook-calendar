import { byLength } from "./utils";
import {eventsContainerWidth, eventsLRPadding} from '../../../config';  

export default function addWidths(rows) {
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
}
