import { css } from "../../libs/cssInJs";

const calendar = ({ calendarProps, mountedComponents}) => {
  const {timeLineWidth, eventsContainerWidth} = calendarProps;
  const calendarNode = document.createElement("article");
  calendarNode.className = css`
    width: ${timeLineWidth + eventsContainerWidth}px;
    display: flex;
  `;

  return mountedComponents.calendar = calendarNode;;
};

export default calendar;
