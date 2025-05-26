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
    />
  );
}
