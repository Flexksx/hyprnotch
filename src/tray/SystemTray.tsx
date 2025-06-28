import Logger from "../logger/Logger";
import { SystemTrayViewModel } from "./SystemTrayViewModel";
import Tray from "gi://AstalTray";
import { bind } from "astal";
import { timeout } from "astal/time";
import TrayItemNotch from "./TrayItemNotch";
import { Gtk } from "astal/gtk3";

const SYSTEM_TRAY_ITEM_TIMEOUT = 10000; // 30 seconds
const logger = new Logger("TrayItemNotch");

const onSystemTrayItemClicked = (
  systemTrayViewModel: SystemTrayViewModel,
  item: Tray.TrayItem
) => {
  const currentlyFocused = systemTrayViewModel.getFocusedTrayItem().get();
  if (currentlyFocused && currentlyFocused.get_title() === item.get_title()) {
    systemTrayViewModel.setFocusedTrayItem(null);
  } else {
    systemTrayViewModel.setFocusedTrayItem(item);
    timeout(SYSTEM_TRAY_ITEM_TIMEOUT, () =>
      systemTrayViewModel.setFocusedTrayItem(null)
    );
  }
};

function getTrayItemClass(
  item: any,
  index: number,
  items: any[],
  focusedItem: any | null
): string {
  const classes = ["system_tray_item"];

  // Active state
  if (focusedItem && focusedItem.get_title() === item.get_title()) {
    classes.push("active");
  } else {
    classes.push("notch");
  }

  // Position classes
  if (index === 0) classes.push("first");
  if (index === items.length - 1) classes.push("last");

  return classes.join(" ");
}

export type TrayItemNotchProps = {
  systemTrayViewModel: SystemTrayViewModel;
};
function getContainerClass(focusedItem: any | null): string {
  const classes = ["system_tray_bar_container"];

  if (focusedItem) {
    classes.push("notch-focused");
  }

  return classes.join(" ");
}

export type SystemTrayProps = { systemTrayViewModel: SystemTrayViewModel };

export function SystemTray({ systemTrayViewModel }: SystemTrayProps) {
  return (
    <box
      className="system_tray_bar_notch_container"
      vertical={true}
      halign={Gtk.Align.END}
      valign={Gtk.Align.START}
      children={[
        <box
          // MODIFICATION HERE
          className={bind(
            systemTrayViewModel
              .getFocusedTrayItem()
              .as((focused) => getContainerClass(focused))
          )}
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
                          cursor={"pointer"}
                          hexpand={true}
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
                          onClicked={() =>
                            onSystemTrayItemClicked(systemTrayViewModel, item)
                          }
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
