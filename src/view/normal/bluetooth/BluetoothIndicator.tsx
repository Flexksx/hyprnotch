import BluetoothViewModel from "../../../bluetooth/viewmodel/BluetoothViewModel";
export default function NormalNotchBluetooth() {
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
                return isPowered ? "󰂯" : "󰂲";
              })}
            ></label>
          }
        ></box>
      }
    ></box>
  );
}
