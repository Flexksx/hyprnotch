import { bind } from "astal";
import TimeService from "../../service/TimeService";

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

export default function ExpandedNotch() {
  return (
    <box className={"expanded_notch"}>
      <Time />
    </box>
  );
}
