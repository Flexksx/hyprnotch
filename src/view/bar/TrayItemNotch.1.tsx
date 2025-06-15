import { TrayItemNotchProps } from "./SystemTray";

function getTrayItemNotchClassName(
  focusedItem: any | null,
  trayItems: any[]
): string {
  const baseTrayNotchClass = "system_tray_bar_notch";
  if (!focusedItem) {
    return baseTrayNotchClass;
  }

  const focusedIndex = trayItems.findIndex(
    (item) => item.get_title() === focusedItem.get_title()
  );

  let notchClass = baseTrayNotchClass;
  if (focusedItem.get_title() === "HyprNotch") {
    notchClass += " hyprnotch-focused";
  } else {
    notchClass += " focused";
    if (focusedIndex === 0) {
      notchClass += " first";
    } else if (focusedIndex === trayItems.length - 1) {
      notchClass += " last";
    }
  }
  return notchClass;
}

export default function TrayItemNotch(props: TrayItemNotchProps) {
  const systemTrayViewModel = props.systemTrayViewModel;
  const trayItemBinding = systemTrayViewModel.getFocusedTrayItem();
  return (
    <box
      className={trayItemBinding.as((focusedItem) => {
        const trayItems = systemTrayViewModel.getTrayItems().get();
        return getTrayItemNotchClassName(focusedItem, trayItems);
      })}
      vertical={true}
      children={[
        <box
          child={trayItemBinding.as((focusedItem) => {
            if (!focusedItem) {
              return <box />;
            }
            return focusedItem?.get_is_menu() ? (
              <label label={"Is menu"} />
            ) : (
              <label label={"Not a menu"} />
            );
          })}
        />,
      ]}
    />
  );
}
