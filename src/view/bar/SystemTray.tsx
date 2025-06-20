import { Astal } from "astal/gtk3";
import Logger from "../../logger/Logger";
import { SystemTrayViewModel } from "../../tray/SystemTrayViewModel";
import { IconSource } from "../../lib/icons/IconUtils";
import Tray from "gi://AstalTray";
import system from "system";
import { bind } from "astal";
import TrayItemNotch from "./TrayItemNotch";

const logger = new Logger("TrayItemNotch");

// helper to compute the classes for each tray item
function getTrayItemClass(
  item: any,
  index: number,
  items: any[],
  focusedItem: any | null
): string {
  let cls = "system_tray_item";
  if (focusedItem && focusedItem.get_title() === item.get_title()) {
    cls += " active";
  } else {
    cls += " notch";
  }
  if (index === 0) {
    cls += " first";
  } else if (index === items.length - 1) {
    cls += " last";
  }
  return cls;
}

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
                  children={systemTrayViewModel.getTrayItems().as((items) =>
                    items
                      .filter((item) => item.get_title() !== null)
                      .map((item, index) => (
                        <button
                          className={bind(
                            systemTrayViewModel
                              .getFocusedTrayItem()
                              .as((focused) =>
                                getTrayItemClass(item, index, items, focused)
                              )
                          )}
                          child={
                            <icon
                              tooltipMarkup={bind(item, "tooltipMarkup")}
                              gicon={bind(item, "gicon")}
                              className="tray-item-notch-icon"
                            />
                          }
                          onHover={() => {
                            systemTrayViewModel.refreshTrayItem(item);
                          }}
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
                      ))
                  )}
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
