import { Astal } from "astal/gtk3";
import Logger from "../../logger/Logger";
import { SystemTrayViewModel } from "../../tray/SystemTrayViewModel";
import { IconSource } from "../../utils/IconUtils";
import Tray from "gi://AstalTray";
import system from "system";
import { bind } from "astal";
import TrayItemNotch from "./TrayItemNotch.1";

const logger = new Logger("TrayItemNotch");

export type TrayItemNotchProps = {
  systemTrayViewModel: SystemTrayViewModel;
};

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
                          className={bind(
                            systemTrayViewModel
                              .getFocusedTrayItem()
                              .as((focusedItem) => {
                                if (!focusedItem) {
                                  return "system_tray_item";
                                }
                                return focusedItem.get_title() ===
                                  item.get_title()
                                  ? "system_tray_item active"
                                  : "system_tray_item notch";
                              })
                          )}
                          child={
                            <IconSource
                              iconThemePath={item.get_icon_theme_path()}
                              iconName={item.get_icon_name()}
                              className="tray-item-notch-icon"
                            />
                          }
                          onClicked={() => {
                            const currentlyFocused = systemTrayViewModel
                              .getFocusedTrayItem()
                              .get();
                            if (
                              currentlyFocused &&
                              currentlyFocused.get_title() === item.get_title()
                            ) {
                              systemTrayViewModel.setFocusedTrayItem(null);
                            } else {
                              systemTrayViewModel.setFocusedTrayItem(item);
                            }
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
      ]}
    />
  );
}
