import { sheet } from "./libs/cssInJs";
import events from "./components/events/events";
import timeLine from "./components/timeLine/timeLine";
import calendar from "./components/calendar/calendar";

const app = {
  render({eventData, calendarProps, timeLineProps, eventsProps}, root) {
    const mountedComponents = {};

    // Instantiate an unmounted fragment for the application
    const appFragment = document.createDocumentFragment();

    // instantiate calendar component
    const calendarComponent = calendar({calendarProps, mountedComponents});

    // instantiate timeline component
    const timeLineComponent = timeLine(timeLineProps);
    // add the timeline to the calendar
    calendarComponent.appendChild(timeLineComponent);

    // instantiate event component
    const eventsComponent = events({eventsProps, eventData, mountedComponents});
    // add events to the calendar
    calendarComponent.appendChild(eventsComponent);

    // Mount the complete calendar application in the fragment
    appFragment.appendChild(calendarComponent);

    // If the application is not yet on the DOM, render it
    if (!root.hasChildNodes()) {
      sheet.inject();
      root.appendChild(appFragment);
    }
    return mountedComponents.calendarComponent;
  }
};

export default app;
