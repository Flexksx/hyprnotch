import { bind } from "astal";
import { WeatherViewModel } from "../../../weather/viewmodel/WeatherViewModel";
import TimeService from "../../../time/TimeService";

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
    <box
      child={
        <label>
          {bind(weatherViewModel.getWeatherVariable()).as((weather) => {
            if (weather) {
              const condition = weather.getConditionText();
              const currentTemp = weather.getTempCelsius();
              return `${condition} now, ${currentTemp}°C`;
            } else {
              return "Loading...";
            }
          })}
        </label>
      }
    ></box>
  );
}
export default function ExpandedNotch() {
  return (
    <box
      className={"expanded_notch"}
      child={
        <box
          vertical={true}
          children={[
            <>
              <Time />
              <Weather />
            </>,
          ]}
        ></box>
      }
    ></box>
  );
}
