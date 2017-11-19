import { css } from "../../libs/cssInJs";
import eventsContainer from "./eventsContainer";
import layOutEvents from "./layOutEvents";

const events = ({ eventData, eventsProps, mountedComponents }) => {
  const {eventsContainerWidth, eventsContainerHeight, eventsLRPadding} = eventsProps;
  const eventsNode = document.createElement("section");  
  
  eventsNode.className = css`
    margin-top: 8px;
    position: relative;
    min-width: ${eventsContainerWidth}px;
    height: ${eventsContainerHeight}px;
    border: 1px solid #DDDFE2;
    border-radius: 3px;
    overflow: hidden;
    background-color: #fff;
    background-image:  linear-gradient(#fff 1px, transparent 1px), linear-gradient(#E7E8EA 1px, transparent 1px), linear-gradient(#F7F8F8 1px, transparent 1px);
    background-size: 100% 720px, 100% 60px, 100% 60px;
    background-position:  0 0px, 0 60px, 0 30px; 
  `;

  if (eventData.length) {
    layOutEvents(eventData, event => {
      const eventNode = document.createElement("article");
      const width = (eventsContainerWidth - 2 * eventsLRPadding) / event._intersectionGroup.length;
      eventNode.className = css`
        background-image:  linear-gradient(#DDDFE2 1px, transparent 1px);
        background-repeat: no-repeat;
        position: absolute;
        border-left: 4px solid #4266B2;
        background-color: #F6F7F9;
        top: ${event.start}px;
        height: ${event.end - event.start}px;
        width: ${width}px;
        left: ${width * event.offset + eventsLRPadding}px;
      `;

      const title = document.createElement('h1');
      title.className = css`
        color: #4266B2;
        margin: 8px 6px 4px;
        font-size: 13px;
      `;
      title.innerHTML = event.title ? event.title : 'Sample item';
      eventNode.appendChild(title);

      const location = document.createElement('p');
      location.className = css`
        color: #5A5E63;
        margin: 0px 6px;
        font-size: 11px;
      `;
      location.innerHTML = event.location ? event.location : 'Sample location';
      eventNode.appendChild(location);

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
