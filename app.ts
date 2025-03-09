import { App } from "astal/gtk3";
import style from "./style/main.scss";
import Hyprnotch from "./src/view/Hyprnotch";
import TimeService from "./src/service/TimeService";
import WeatherService from "./src/service/WeatherService";

const weatherService = WeatherService.getInstance("Chisinau");

weatherService.fetchWeather().then((data) => {
  if (data) {
    // console.log("Weather data:", data);
    console.log("Current weather", data["current"]);
  } else {
    console.log("Failed to fetch weather data.");
  }
});

App.start({
  css: style,
  main() {
    App.get_monitors().map(Hyprnotch);
  },
});
