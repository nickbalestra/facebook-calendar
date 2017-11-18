import { css } from "../../libs/cssInJs";
import eventsContainer from "./eventsContainer";
import layOutEvents from "./layOutEvents";

const events = ({ eventData, eventsProps, mountedComponents }) => {
  const {eventsContainerWidth, eventsContainerHeight, eventsLRPadding} = eventsProps;
  const eventsNode = document.createElement("section");  
  
  eventsNode.className = css`
    position: relative;
    min-width: ${eventsContainerWidth}px;
    height: ${eventsContainerHeight}px;
    background-color: rgba(0, 0, 0, 0.1);
    background-image: linear-gradient(#ccc 1px, transparent 1px);
    background-size: 100% 30px;
  `;

  if (eventData.length) {
    layOutEvents(eventData, event => {
      const eventNode = document.createElement("article");
      const width = (eventsContainerWidth - 2 * eventsLRPadding) / event._intersectionGroup.length;
      eventNode.className = css`
        border-top: 1px solid red;
        position: absolute;
        border-left: 8px solid #3b5998;
        background-color: rgba(0,0,0,.1);
        top: ${event.start}px;
        height: ${event.end - event.start}px;
        width: ${width}px;
        left: ${width * event.offset + eventsLRPadding}px;
      `;

      eventsNode.appendChild(eventNode);
    });
  }

  if (mountedComponents.calendar && mountedComponents.events) {
    mountedComponents.calendar.replaceChild(eventsNode, mountedComponents.events)
  }
  return mountedComponents.events = eventsNode;
};


const connect = (container, component) => props =>
container(Object.assign({}, props, { render: component }));


export default connect(eventsContainer, events);
