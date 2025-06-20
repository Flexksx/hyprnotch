import { Astal, App, Gdk, Gtk } from "astal/gtk3";
import Logger from "../../logger/Logger";
import WorkspacesBar from "./WorkspacesBar";
import { SystemTray } from "./SystemTray";
import { SystemTrayViewModel } from "../../tray/SystemTrayViewModel";

export function SystemTrayWindow(gdkmonitor: Gdk.Monitor) {
  const logger = new Logger("SystemTray");
  logger.debug("SystemTray window created");

  return (
    <window
      className="system_tray_window"
      namespace="system_tray_window"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
      application={App}
      child={<SystemTray systemTrayViewModel={new SystemTrayViewModel()} />}
    />
  );
}
