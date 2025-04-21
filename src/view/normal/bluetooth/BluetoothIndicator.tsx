import BluetoothViewModel from "../../../bluetooth/viewmodel/BluetoothViewModel";
export default function NormalNotchBluetooth() {
  const bluetoothViewModel = new BluetoothViewModel();

  return (
    <button
      className={bluetoothViewModel.getIsPowered().as((isPowered) => {
        return isPowered
          ? "normal_notch_bluetooth_icon_button powered"
          : "normal_notch_bluetooth_icon_button unpowered";
      })}
      label={bluetoothViewModel.getIsPowered().get() ? "󰂯" : "󰂲"}
    ></button>
  );
}
