import { bind } from "astal";
import nerdfonts from "../../lib/icons/nerdfonts";
import BluetoothViewModel from "./BluetoothViewModel";

const bluetoothViewModel = new BluetoothViewModel();

function BluetoothToggleButton() {
  return (
    <button
      className={bluetoothViewModel.getIsPowered().as((isPowered) => {
        let className = "icon_button";
        className += isPowered ? " " : " outlined";
        return className;
      })}
      onClick={() => {
        bluetoothViewModel.toggle();
      }}
      child={
        <label
          label={bluetoothViewModel.getIsPowered().as((isPowered) => {
            return isPowered
              ? nerdfonts.sound.bluetooth.idle
              : nerdfonts.sound.bluetooth.off;
          })}
        />
      }
    />
  );
}

function BluetoothDeviceBatteryLevel() {
  return (
    <box
      className="bluetooth_device_battery_level"
      children={bluetoothViewModel.getDevices().as((devices) => {
        return devices
          .filter((device) => device.get_connected())
          .map((device) => (
            <circularprogress
              rounded={true}
              startAt={0}
              endAt={1}
              value={bind(device, "batteryPercentage")}
              child={<icon icon={bind(device, "icon")} />}
            />
          ));
      })}
    />
  );
}

export default function BluetoothSettingsMenu() {
  return (
    <box
      className="bluetooth_settings_menu_container"
      children={[
        <box
          className="bluetooth_settings_menu"
          children={[
            <BluetoothToggleButton />,
            <BluetoothDeviceBatteryLevel />,
          ]}
        />,
      ]}
    />
  );
}
