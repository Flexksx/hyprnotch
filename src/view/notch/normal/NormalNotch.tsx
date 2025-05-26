import { bind } from "astal/binding";
import TimeService from "../../../time/TimeService";
import MediaIndicator from "./MediaIndicator";
import { BluetoothButton } from "./BluetoothButton";
import { WifiIndicator } from "./WifiIndicator";
import Notifications from "./Notification";

function Time() {
  return (
    <box
      className="normal_notch_time"
      children={[
        <label>
          {bind(TimeService.getInstance().getTime()).as((time) => {
            return time.slice(10, 16);
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
            <box
              vertical={true}
              children={[<BluetoothButton />, <WifiIndicator />]}
            />,

            <box vertical={true} children={[<MediaIndicator />]} />,

            <box vertical={true} children={[<Notifications />]} />,
          ]}
        />
      }
    ></centerbox>
  );
}
