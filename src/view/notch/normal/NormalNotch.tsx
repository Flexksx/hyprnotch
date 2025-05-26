import { bind } from "astal/binding";
import TimeService from "../../../time/TimeService";
import WifiIndicator from "./network/WifiIndicator";
import MediaIndicator from "./media/MediaIndicator";
import BluetoothViewModel from "../../../bluetooth/BluetoothViewModel";

const BLUETOOTH_ON_ICON = "󰂯";
const BLUETOOTH_OFF_ICON = "󰂲";

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

function NormalNotchBluetooth() {
  const bluetoothViewModel = new BluetoothViewModel();
  return (
    <box
      className="normal_notch_bluetooth_icon"
      child={
        <box
          className={bluetoothViewModel.getIsPowered().as((isPowered) => {
            return isPowered
              ? "normal_notch_bluetooth_indicator powered"
              : "normal_notch_bluetooth_indicator unpowered";
          })}
          child={
            <label
              label={bluetoothViewModel.getIsPowered().as((isPowered) => {
                return isPowered ? BLUETOOTH_ON_ICON : BLUETOOTH_OFF_ICON;
              })}
            ></label>
          }
        ></box>
      }
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
              children={[<NormalNotchBluetooth />, <WifiIndicator />]}
            />,

            <box vertical={true} children={[<MediaIndicator />]} />,
          ]}
        />
      }
    ></centerbox>
  );
}
