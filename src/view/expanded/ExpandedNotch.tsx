import { bind } from "astal";
import TimeService from "../../service/TimeService";
import WeatherService from "../../service/WeatherService";

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
      {bind(WeatherService.getInstance().getWeather()).as((weather) => {
        if (weather) {
          const currentWeather = weather["current"];
          const condition = currentWeather["condition"]["text"];
          const currentTemp = currentWeather["temp_c"];
          const feelsLike = currentWeather["feelslike_c"];
          return `${condition} now, ${currentTemp}°C, feels like ${feelsLike}°C`;
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
