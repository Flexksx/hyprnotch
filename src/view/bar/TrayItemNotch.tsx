import Logger from "../../logger/Logger";
import { SystemTrayViewModel } from "../../tray/SystemTrayViewModel";
import { Astal } from "astal/gtk4";

const logger = new Logger("TrayItemNotch");
export type TrayItemNotchProps = {
  systemTrayViewModel: SystemTrayViewModel;
};

const trayItemNotchClassNameBinding = (
  systemTrayViewModel: SystemTrayViewModel
) => {
  return systemTrayViewModel.getFocusedTrayItem().as((focusedItem) => {
    if (!focusedItem) {
      logger.debug("No focused tray item, returning base notch class");
      return "system_tray_bar_notch";
    }
    logger.debug(
      `Focused tray item: ${focusedItem.get_title()}, returning focused notch class`
    );
    return focusedItem.get_title() === "HyprNotch"
      ? "system_tray_bar_notch hyprnotch-focused"
      : "system_tray_bar_notch focused";
  });
};

export function TrayItemNotch(props: TrayItemNotchProps) {
  const systemTrayViewModel = props.systemTrayViewModel;
  const baseTrayNotchClass = "system_tray_bar_notch";

  return (
    <box
      cssName={trayItemNotchClassNameBinding(systemTrayViewModel)}
      child={systemTrayViewModel.getFocusedTrayItem().as((focusedItem) => {
        return <label label={focusedItem?.get_tooltip_markup()} />;
      })}
    />
  );
}
