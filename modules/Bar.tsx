import { Gdk } from 'gi://Gdk?version=4.0';
import Workspaces from './hyprland/Workspaces';
import { Astal, Gtk } from 'ags/gtk4';
import app from 'ags/gtk4/app';
import SystemTray from './tray/SystemTray';
import Time from './time/Time';
import Battery from './system/Battery';
import Cpu from './system/Cpu';
import SystemInfo from './system/SystemInfo';

export default function Bar({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      class="flexshell-bar"
      name="HyprnotchBar"
      vexpand={false}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox vexpand={false} valign={Gtk.Align.CENTER}>
        <box $type="start" vexpand={false} valign={Gtk.Align.CENTER}>
          <Workspaces monitor={gdkmonitor} />
        </box>
        <box $type="end" vexpand={false} valign={Gtk.Align.CENTER}>
          {/* <SystemTray /> */}
          <SystemInfo />
          <Time />
        </box>
      </centerbox>
    </window>
  );
}
