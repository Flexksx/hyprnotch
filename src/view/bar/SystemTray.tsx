import { Astal } from "astal/gtk3";
import Logger from "../../logger/Logger";
import { SystemTrayViewModel } from "../../tray/SystemTrayViewModel";
import { IconSource } from "../../utils/IconUtils";
import Tray from "gi://AstalTray";

const logger = new Logger("TrayItemNotch");

type TrayItemNotchProps = {
  systemTrayViewModel: SystemTrayViewModel;
};

function TrayItemNotch(props: TrayItemNotchProps) {
  const systemTrayViewModel = props.systemTrayViewModel;
  const baseTrayNotchClass = "system_tray_bar_notch";
  return (
    <box
      className={systemTrayViewModel.getFocusedTrayItem().as((focusedItem) => {
        if (!focusedItem) {
          logger.debug("No focused tray item, returning base notch class");
          return baseTrayNotchClass;
        }
        logger.debug(
          `Focused tray item: ${focusedItem.get_title()}, returning focused notch class`
        );
        return focusedItem.get_title() === "HyprNotch"
          ? baseTrayNotchClass + " hyprnotch-focused"
          : baseTrayNotchClass + " focused";
      })}
    />
  );
}

export function SystemTray() {
  const systemTrayViewModel = new SystemTrayViewModel();
  return (
    <box
      className="system_tray_bar_notch_container"
      vertical={true}
      children={[
        <box
          className={"system_tray_bar_container"}
          child={
            <box
              className={"system_tray_bar"}
              vertical={true}
              children={[
                <box
                  children={systemTrayViewModel.getTrayItems().as((items) => {
                    return items.map((item) => {
                      return (
                        <button
                          className={"system_tray_item"}
                          child={
                            <IconSource
                              iconThemePath={item.get_icon_theme_path()}
                              iconName={item.get_icon_name()}
                              fallbackIcon="application-x-executable-symbolic"
                              className="tray-item-notch-icon"
                            />
                          }
                          onHover={() => {
                            systemTrayViewModel.setFocusedTrayItem(item);
                          }}
                          onHoverLost={() => {
                            systemTrayViewModel.setFocusedTrayItem(null);
                          }}
                        />
                      );
                    });
                  })}
                />,
                <TrayItemNotch systemTrayViewModel={systemTrayViewModel} />,
              ]}
            />
          }
        />,
        <box className="system_tray_bar_notch" />,
      ]}
    />
  );
}
