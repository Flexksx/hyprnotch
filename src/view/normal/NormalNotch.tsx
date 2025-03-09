import { bind } from "astal/binding";
import TimeService from "../../service/TimeService";

function Time() {
  return (
    <box className="normal_notch_time" vertical="true">
      <label>
        {bind(TimeService.getInstance().getTime()).as((time) => {
          return time.slice(10, 20);
        })}
      </label>
    </box>
  );
}

export default function NormalNotch() {
  return (
    <box className={"normal_notch"}>
      <Time />
    </box>
  );
}
