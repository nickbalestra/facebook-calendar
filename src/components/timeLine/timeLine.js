import { css } from "../../libs/cssInJs";

const time = ({ timeLineSlotHeightInHours, text }) => {
  const timeNode = document.createElement("p");

  timeNode.className = css`
    margin: 0;
    height: ${timeLineSlotHeightInHours * 60}px;
  `;

  timeNode.textContent = text;
  return timeNode;
};

const timeLine = ({ timeLineSlotHeightInHours, startTime, endTime }) => {
  const timelineNode = document.createElement("section");
  const slots = endTime - startTime / timeLineSlotHeightInHours;

  for (let i = 0; i < slots; i++) {
    const text =
      i + startTime <= 12 ? `${i + startTime} am` : `${i + startTime - 12} pm`;
    timelineNode.appendChild(time({ timeLineSlotHeightInHours, text }));
  }
  return timelineNode;
};

export default timeLine;
