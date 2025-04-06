import { bind } from "astal";
import TimeService from "../../service/TimeService";
import WeatherService from "../../weather/service/WeatherService";
import { WeatherViewModel } from "../../weather/viewmodel/WeatherViewModel";

const weatherViewModel = new WeatherViewModel();
function Time() {
  return (
    <box className="expanded_notch_time">
      <label>
        {bind(TimeService.getInstance().getTime()).as((time) => {
          return time.slice(0, 10);
        })}
      </label>
      <label>
        {bind(TimeService.getInstance().getTime()).as((time) => {
          return time.slice(10, 20);
        })}
      </label>
    </box>
  );
}
function Weather() {
  return (
    <box>
      {bind(weatherViewModel.getWeatherVariable()).as((weather) => {
        if (weather) {
          const condition = weather.getConditionText();
          const currentTemp = weather.getTempCelsius();
          return `${condition} now, ${currentTemp}°C`;
        } else {
          return "Loading...";
        }
      })}
    </box>
  );
}
export default function ExpandedNotch() {
  return (
    <box className={"expanded_notch"}>
      <box vertical="true">
        <Time />
        <Weather />
      </box>
    </box>
  );
}
