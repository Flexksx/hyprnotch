import { Gdk } from 'gi://Gdk?version=4.0';
import WorkspacesBar from '../src/hyprland/workspaces/WorkspacesBar';
import Workspaces from './hyprland/Workspaces';
import { Astal, Gtk } from 'ags/gtk4';
import { createPoll } from 'ags/time';
import app from 'ags/gtk4/app';
import SystemTray from './tray/SystemTray';

export default function Bar({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) {
  const time = createPoll('', 1000, 'date');
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      class="hyprnotch-bar"
      name="HyprnotchBar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox>
        <box $type="start">
          <Workspaces monitor={gdkmonitor} />
        </box>
        <box $type="end">
          <SystemTray />
        </box>
      </centerbox>
    </window>
  );
}
