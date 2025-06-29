import Logger from "../logger/Logger";
import { SystemTrayViewModel } from "./SystemTrayViewModel";
import Tray from "gi://AstalTray";
import { bind } from "astal";
import { timeout } from "astal/time";
import TrayItemNotch from "./TrayItemNotch";
import { Gtk } from "astal/gtk3";
import SystemTrayItemButton from "./SystemTrayItemButton";

const logger = new Logger("TrayItemNotch");
export type TrayItemNotchProps = {
  systemTrayViewModel: SystemTrayViewModel;
};

export type SystemTrayProps = { systemTrayViewModel: SystemTrayViewModel };

export function SystemTray({ systemTrayViewModel }: SystemTrayProps) {
  return (
    <box
      className="system_tray"
      vertical={true}
      halign={Gtk.Align.END}
      valign={Gtk.Align.START}
      children={[
        <box
          className={"system_tray_items_list"}
          children={systemTrayViewModel
            .getTrayItems()
            .as((items) =>
              items
                .filter((item) => item.get_title() !== null)
                .map((item, index) => (
                  <SystemTrayItemButton
                    systemTrayViewModel={systemTrayViewModel}
                    item={item}
                  />
                ))
            )}
        />,
        <TrayItemNotch systemTrayViewModel={systemTrayViewModel} />,
      ]}
    />
  );
}
