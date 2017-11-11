import layOutEvents from "./layOutEvents/index";

const eventsContainer = ({eventsProps, eventData, mountedComponents, render}) => {
  
  const layOutDay = eventData => {    
    return render({ eventsProps, eventData: layOutEvents(eventData),  mountedComponents});
  };
  window.layOutDay = window.layOutDay || layOutDay;

  if (!eventData.length) {
    return render({eventsProps, eventData: [], mountedComponents});
  }
  return render({ eventsProps, eventData: layOutEvents(eventData),  mountedComponents });
};

export default eventsContainer;
