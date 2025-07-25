import { Astal, Gdk, Gtk } from 'ags/gtk4';
import WorkspacesBar from '../hyprland/workspaces/WorkspacesBar';
import Logger from '../logger/Logger';
// import { NotificationsPopup } from '../notification/Notification';
import SystemDetailsBarModule from '../system_stats/battery/SystemDetails';
import { SystemTray } from '../tray/SystemTray';
import { SystemTrayViewModel } from '../tray/SystemTrayViewModel';
import app from 'ags/gtk4/app';

export type RightSideBarProps = {
  monitor: Gdk.Monitor;
};
function RightSideBar({ monitor }: RightSideBarProps) {
  return (
    <box
      cssName={'hyprnotch_bar_side'}
      orientation={Gtk.Orientation.VERTICAL}
      hexpand={true}
      halign={Gtk.Align.END}
      children={
        [
          // <SystemDetailsBarModule />,
          // <SystemTray />
          // <NotificationsPopup />
        ]
      }
    />
  );
}

type LeftSideBarProps = {
  monitor: Gdk.Monitor;
};

function LeftSideBar({ monitor }: LeftSideBarProps) {
  return <box children={[<WorkspacesBar monitor={monitor} />]} />;
}

export function SystemTrayWindow(gdkmonitor: Gdk.Monitor) {
  const logger = new Logger('SystemTray');
  logger.debug('SystemTray window created');

  const systemTrayViewModel = new SystemTrayViewModel();
  return (
    <window
      cssName="system_tray_window"
      gdkmonitor={gdkmonitor}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
      exclusivity={Astal.Exclusivity.IGNORE}
      children={[<SystemTray systemTrayViewModel={systemTrayViewModel} />]}
    />
  );
}
export type BarProps = {
  monitor: Gdk.Monitor;
};
export default function Bar({ monitor }: BarProps) {
  const logger = new Logger('Bar');
  logger.debug('Bar window created');
  logger.debug('Monitor:', monitor.get_model());
  return (
    <window
      cssName="hyprnotch_bar"
      namespace="hyprnotch"
      gdkmonitor={monitor}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      exclusivity={Astal.Exclusivity.IGNORE}
      application={app}
      children={[
        <centerbox cssName={'hyprnotch_bar_container'}>
          <LeftSideBar $type="start" gdkmonitor={monitor} />
          <box cssName={'hyprnotch_bar_center'} />,
          <RightSideBar gdkmonitor={monitor} />
        </centerbox>
      ]}
    />
  );
}
