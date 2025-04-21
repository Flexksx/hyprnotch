import { bind } from "astal/binding";
import TimeService from "../../time/service/TimeService";
import NormalNotchBluetooth from "./bluetooth/BluetoothIndicator";
import WifiIndicator from "./network/WifiIndicator";
import MediaIndicator from "./media/MediaIndicator";
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
      centerWidget={<label label={"Hyprnotch"} />}
      endWidget={
        <box
          children={[
            <NormalNotchBluetooth />,
            <WifiIndicator />,
            <MediaIndicator />,
          ]}
        ></box>
      }
    ></centerbox>
  );
}
