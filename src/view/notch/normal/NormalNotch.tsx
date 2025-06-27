import { bind } from "astal/binding";
import TimeService from "../../../time/TimeService";
import { WifiIndicator } from "../../../network/WifiIndicator";
import Notifications from "./Notification";
import MediaViewModel from "../../../media/MediaViewModel";
import Logger from "../../../logger/Logger";
import BluetoothViewModel from "../../../bluetooth/BluetoothViewModel";
const BLUETOOTH_ON_ICON = "󰂯";
const BLUETOOTH_OFF_ICON = "󰂲";
export function BluetoothButton() {
  const bluetoothViewModel = new BluetoothViewModel();
  return (
    <button
      onButtonPressEvent={() => {
        bluetoothViewModel.toggle();
      }}
      className={bluetoothViewModel.getIsPowered().as((isPowered: boolean) => {
        return isPowered
          ? "normal_notch_bluetooth_indicator powered"
          : "normal_notch_bluetooth_indicator unpowered";
      })}
      child={
        <label
          label={bluetoothViewModel.getIsPowered().as((isPowered: boolean) => {
            return isPowered ? BLUETOOTH_ON_ICON : BLUETOOTH_OFF_ICON;
          })}
        ></label>
      }
    />
  );
}

function MediaIndicator() {
  const mediaViewModel = new MediaViewModel();

  return (
    <box
      className="normal_notch_media_icon"
      child={
        <box
          className={"normal_notch_media_indicator"}
          child={
            <label
              label={mediaViewModel.getPlayers().as((players) => {
                if (players.length === 0) {
                  return "No Media";
                }
                return players[0].get_identity();
              })}
            ></label>
          }
        ></box>
      }
    ></box>
  );
}

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
              // children={[<BluetoothButton />, <WifiIndicator />]}
            />,

            <box vertical={true} children={[<MediaIndicator />]} />,
          ]}
        />
      }
    ></centerbox>
  );
}
