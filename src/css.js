import {
  timeLineWidth,
  eventsContainerWidth,
  eventsContainerHeight,
  endTime,
  startTime
} from "./config";

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

export default css;
