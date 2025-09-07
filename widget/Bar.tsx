import { Gdk } from 'gi://Gdk?version=4.0';
import WorkspacesBar from '../src/hyprland/workspaces/WorkspacesBar';
import Workspaces from './hyprland/Workspaces';
import { Astal, Gtk } from 'ags/gtk4';
import { createPoll } from 'ags/time';
import app from 'ags/gtk4/app';
import SystemTray from './tray/SystemTray';
import Time from './time/Time';
import MediaPlayerModule from './player/MediaPlayer';
import MediaPlayer from './player/MediaPlayer';

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
          <SystemTray />
          <Time />
        </box>
      </centerbox>
    </window>
  );
}
