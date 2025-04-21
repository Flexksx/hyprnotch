import { bind } from "astal/binding";
import TimeService from "../../time/service/TimeService";
import NormalNotchBluetooth from "./bluetooth/Bluetooth";
function Time() {
  return (
    <box
      className="normal_notch_time"
      children={[
        <label>
          {bind(TimeService.getInstance().getTime()).as((time) => {
            return time.slice(10, 20);
          })}
        </label>,
      ]}
    ></box>
  );
}

export default function NormalNotch() {
  return (
    <centerbox
      className={"normal_notch"}
      startWidget={<Time />}
      centerWidget={
        <button
          label={"Hyprnotch"}
          onClick={() => {
            console.log("Hyprnotch clicked");
          }}
        />
      }
      endWidget={<NormalNotchBluetooth />}
    ></centerbox>
  );
}
