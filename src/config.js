export const eventsContainerWidth = 620;
export const eventsContainerHeight = 720;
export const eventsLRPadding = 10;
export const timeLineWidth = 60;
export const timeLineSlotHeightInHours = 1;
export const startTime = 9.0;
export const endTime = 21.0;

export default {
  eventData: [],
  timeLineProps: {
    timeLineSlotHeightInHours,
    startTime,
    endTime
  },
  eventsProps: {
    eventsLRPadding,
    eventsContainerHeight,
    eventsContainerWidth
  },
  calendarProps: {
    eventsContainerWidth,
    timeLineWidth
  }
};
