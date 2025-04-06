import { App } from "astal/gtk3";
import style from "./style/main.scss";
import Hyprnotch from "./src/view/Hyprnotch";
import TimeService from "./src/service/TimeService";
import WeatherService from "./src/weather/service/WeatherService";

App.start({
  css: style,
  main() {
    App.get_monitors().map(Hyprnotch);
  },
});
