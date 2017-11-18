import { sheet } from "./libs/cssInJs";
import events from "./components/events/events";
import timeLine from "./components/timeLine/timeLine";
import calendar from "./components/calendar/calendar";

const app = {
  render({eventData, calendarProps, timeLineProps, eventsProps}, root) {
    const mountedComponents = {};

    const appFragment = document.createDocumentFragment();

    const calendarComponent = calendar({calendarProps, mountedComponents});
    const timeLineComponent = timeLine(timeLineProps);
    calendarComponent.appendChild(timeLineComponent);
    const eventsComponent = events({eventsProps, eventData, mountedComponents});
    calendarComponent.appendChild(eventsComponent);

    appFragment.appendChild(calendarComponent);

    if (!root.hasChildNodes()) {
      sheet.inject();
      root.appendChild(appFragment);
    }
    return mountedComponents.calendarComponent;
  }
};

export default app;
