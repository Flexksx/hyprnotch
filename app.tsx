import app from 'ags/gtk4/app';
import style from './styles/main.scss';
import { initializeSingletons } from './src/di/initializeSingletons';
import { Accessor, createBinding, For } from 'ags';
import Bar from './widget/Bar';
import { Gdk, Gtk } from 'ags/gtk4';
import BarContainerBackground from './src/bar/BarContainerBackground';
import Notch from './widget/notch/Notch';

initializeSingletons();

app.start({
  css: style,
  instanceName: 'flexshell',
  main() {
    const monitors = createBinding(app, 'monitors');
    return [
      <For each={monitors} cleanup={win => (win as Gtk.Window).destroy()}>
        {monitor => <Bar gdkmonitor={monitor} />}
      </For>,
      {
        /* <For each={monitors} cleanup={win => (win as Gtk.Window).destroy()}>
        {monitor => <Notch gdkmonitor={monitor} />}
      </For> */
      }
    ];
  }
});
