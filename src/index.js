import app from "./app";
import config from "./config";

// intantiate and render the calendar app
app.render(
  Object.assign({}, config, { eventData: [] }),
  document.getElementById("cal")
);
