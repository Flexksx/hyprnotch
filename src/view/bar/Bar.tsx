import { Astal, App, Gdk, Gtk } from "astal/gtk3";
import Logger from "../../logger/Logger";
import WorkspacesBar from "./WorkspacesBar";
import { SystemTray } from "./SystemTray";
import { SystemTrayViewModel } from "../../tray/SystemTrayViewModel";

export function SystemTrayWindow(gdkmonitor: Gdk.Monitor) {
  const logger = new Logger("SystemTray");
  logger.debug("SystemTray window created");

  const systemTrayViewModel = new SystemTrayViewModel();
  return (
    <window
      className="system_tray_window"
      gdkmonitor={gdkmonitor}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      child={<SystemTray systemTrayViewModel={systemTrayViewModel} />}
    />
  );
}
