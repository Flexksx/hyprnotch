import { Astal, App, Gdk, Gtk } from "astal/gtk3";
import Logger from "../../logger/Logger";
import WorkspacesBar from "./WorkspacesBar";
import { SystemTray } from "./SystemTray";
import { SystemTrayViewModel } from "../../tray/SystemTrayViewModel";

type SystemTrayWindowProps = { gdkmonitor: Gdk.Monitor };

export function SystemTrayWindow(gdkmonitor: Gdk.Monitor) {
  const logger = new Logger("SystemTray");
  logger.debug("SystemTray window created");

  const systemTrayViewModel = new SystemTrayViewModel();
  return (
    <window
      className="system_tray_window"
      gdkmonitor={gdkmonitor}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
      exclusivity={Astal.Exclusivity.IGNORE}
      child={<SystemTray systemTrayViewModel={systemTrayViewModel} />}
    />
  );
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const logger = new Logger("Bar");
  const systemTrayViewModel = new SystemTrayViewModel();
  logger.debug("Bar window created");

  return (
    <window
      className="hyprnotch_bar"
      namespace="hyprnotch_bar"
      gdkmonitor={gdkmonitor}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      application={App}
      child={
        <centerbox
          startWidget={<WorkspacesBar gdkmonitor={gdkmonitor} />}
          endWidget={<SystemTray systemTrayViewModel={systemTrayViewModel} />}
        />
      }
    />
  );
}
