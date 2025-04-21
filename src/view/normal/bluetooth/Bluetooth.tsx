import BluetoothViewModel from "../../../bluetooth/viewmodel/BluetoothViewModel";
export default function NormalNotchBluetooth() {
  const bluetoothViewModel = new BluetoothViewModel();

  return (
    <button
      className={
        "normal_notch_bluetooth_icon_button" +
        " " +
        (bluetoothViewModel.getIsOn() ? "powered" : "unpowered")
      }
      onClick={() => bluetoothViewModel.toggle()}
      label={bluetoothViewModel.getIsOn().get() ? "󰂯" : "󰂲"}
    ></button>
  );
}
