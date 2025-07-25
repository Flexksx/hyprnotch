import app from 'ags/gtk4/app';
import { Astal, Gtk, Gdk } from 'ags/gtk4';
import { execAsync } from 'ags/process';
import { createPoll } from 'ags/time';
import WorkspacesBar from '../src/hyprland/workspaces/WorkspacesBar';

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const time = createPoll('', 1000, 'date');
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      cssName="hyprnotch_bar"
      name="HyprnotchBar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox>
        <WorkspacesBar monitor={gdkmonitor} /> <label label="Welcome to AGS!" />
        <box $type="center" />
        <menubutton $type="end" hexpand halign={Gtk.Align.CENTER}>
          <label label={time} />
          <popover>
            <Gtk.Calendar />
          </popover>
        </menubutton>
      </centerbox>
    </window>
  );
}
