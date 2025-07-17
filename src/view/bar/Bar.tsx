import { Astal, App, Gdk, Gtk } from "astal/gtk3";
import Logger from "../../logger/Logger";
import WorkspacesBar from "../../hyprland/workspaces/WorkspacesBar";
import { SystemTray } from "../../tray/SystemTray";
import { SystemTrayViewModel } from "../../tray/SystemTrayViewModel";
import SystemDetailsBarModule from "../../system_stats/battery/SystemDetails";
import { NotificationsPopup } from "../../notification/Notification";
import Hyprnotch from "../Hyprnotch";

type RightSideBarProps = {
  gdkmonitor: Gdk.Monitor;
  systemTrayViewModel: SystemTrayViewModel;
};

function RightSideBar({ gdkmonitor, systemTrayViewModel }: RightSideBarProps) {
  return (
    <box
      className={"hyprnotch_bar_side"}
      vertical={false}
      hexpand={true}
      halign={Gtk.Align.END}
      children={[
        <SystemDetailsBarModule monitor={gdkmonitor} />,
        <SystemTray systemTrayViewModel={systemTrayViewModel} />,
        <NotificationsPopup gdkmonitor={gdkmonitor} />,
      ]}
    />
  );
}

type LeftSideBarProps = {
  gdkmonitor: Gdk.Monitor;
};

function LeftSideBar({ gdkmonitor }: LeftSideBarProps) {
  return (
    <box vexpand={true} child={<WorkspacesBar gdkmonitor={gdkmonitor} />} />
  );
}

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
      namespace="hyprnotch"
      gdkmonitor={gdkmonitor}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      exclusivity={Astal.Exclusivity.IGNORE}
      application={App}
      child={
        <centerbox
          className={"hyprnotch_bar_container"}
          startWidget={<LeftSideBar gdkmonitor={gdkmonitor} />}
          centerWidget={<box />}
          endWidget={
            <RightSideBar
              gdkmonitor={gdkmonitor}
              systemTrayViewModel={systemTrayViewModel}
            />
          }
        />
      }
    />
  );
}
