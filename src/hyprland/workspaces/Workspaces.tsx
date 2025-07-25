import { App, Astal, Gdk, Gtk } from "astal/from 'astal/gtk4'";
import Logger from '../../logger/Logger';
import WorkspacesBar from '../hyprland/WorkspacesBar';

export function Workspaces(gdkmonitor: Gdk.Monitor) {
  const logger = new Logger('Bar');
  logger.debug('Workspaces window created');

  return (
    <window
      cssName="hyprnotch_bar"
      namespace="hyprnotch_bar"
      gdkgdkmonitor={gdkmonitor}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      hexpand={false}
      halign={Gtk.Align.START}
      valign={Gtk.Align.START}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      application={App}
      child={
        <box
          cssName={'hyprnotch_bar_container'}
          child={<WorkspacesBar gdkgdkmonitor={gdkmonitor} />}
        />
      }
    />
  );
}
