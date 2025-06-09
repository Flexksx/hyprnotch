import { Astal, App, Gdk, Gtk } from "astal/gtk3";
import Logger from "../../logger/Logger";
import WorkspacesBar from "./WorkspacesBar";
import { SystemTray } from "./SystemTray";

export function Workspaces(gdkmonitor: Gdk.Monitor) {
  const logger = new Logger("Bar");
  logger.debug("Workspaces window created");

  return (
    <window
      className="hyprnotch_bar"
      namespace="hyprnotch_bar"
      gdkmonitor={gdkmonitor}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      application={App}
      child={<WorkspacesBar gdkmonitor={gdkmonitor} />}
    />
  );
}

export function SystemTrayWindow(gdkmonitor: Gdk.Monitor) {
  const logger = new Logger("SystemTray");
  logger.debug("SystemTray window created");

  return (
    <window
      className="system_tray_window"
      namespace="system_tray_window"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
      application={App}
      child={<SystemTray />}
    />
  );
}
