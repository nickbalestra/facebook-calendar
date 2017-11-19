import { css } from "../../libs/cssInJs";

const time = ({ timeLineSlotHeightInHours, text }) => {
  const timeNode = document.createElement("p");

  timeNode.className = css`
    color: #5A5E63;
    font-size: 13px;
    text-align: right;
    padding-right: 10px; 
    margin: 0;
    height: ${timeLineSlotHeightInHours * 60}px;
  `;

  timeNode.textContent = text;
  return timeNode;
};

const timeLine = ({ timeLineSlotHeightInHours, startTime, endTime }) => {
  const timelineNode = document.createElement("section");
  timelineNode.className = css`
    max-height: 740px;
    overflow: hidden;
    background-image: linear-gradient(#E9EBEE 14px, transparent 14px), linear-gradient(#DDDFE2 1px, transparent 1px);
    background-size: 100% 720px, 100% 15px;
    background-position: 0 720px, 40px 9px;
    background-repeat-x: no-repeat;
  `
  const slots = endTime - startTime / timeLineSlotHeightInHours;

  for (let i = 0; i <= slots; i++) {
    const text =
      i + startTime <= 12 ? `${i + startTime} am` : `${i + startTime - 12} pm`;
    timelineNode.appendChild(time({ timeLineSlotHeightInHours, text }));
  }
  return timelineNode;
};

export default timeLine;
