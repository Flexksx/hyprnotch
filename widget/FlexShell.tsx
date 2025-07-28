import { Gdk, Gtk } from 'ags/gtk4';
import BarContainerBackground from '../src/bar/BarContainerBackground';
import Bar from './Bar';
import { createBinding, For } from 'ags';
import app from 'ags/gtk4/app';

export default function FlexShell({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) {
  BarContainerBackground({ gdkmonitor });
  Bar({ gdkmonitor });
}
