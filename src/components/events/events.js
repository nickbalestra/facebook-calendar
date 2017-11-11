import connect from "../../libs/connect";
import { css } from "../../libs/cssInJs";
import eventsContainer from "./eventsContainer";

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
    eventData.forEach(event => {
      const eventNode = document.createElement("article");

      eventNode.className = css`
        position: absolute;
        border-left: 8px solid #3b5998;
        background-color: rgba(0,0,0,.1);
        top: ${event.start}px;
        left: ${event.width * event.offset + eventsLRPadding}px;
        height: ${event.end - event.start}px;
        width: ${event.width}px; 
      `;

      eventsNode.appendChild(eventNode);
    });
  }

  if (mountedComponents.calendar && mountedComponents.events) {
    mountedComponents.calendar.replaceChild(eventsNode, mountedComponents.events)
  }
  return mountedComponents.events = eventsNode;
};

export default connect(eventsContainer, events);
