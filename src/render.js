import { eventsLRPadding } from "./config";
import css from "./css";
import layOutEvents from './layOutEvents';

export default function render(events, root) {

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
    const eventsWithWidthAndOffsets = layOutEvents(events);

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
