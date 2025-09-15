import app from 'ags/gtk4/app';
import style from './styles/main.scss';
import { initializeSingletons } from './lib/di/initializeSingletons';
import { createBinding, For } from 'ags';
import Bar from './modules/Bar';
import { Gtk } from 'ags/gtk4';
import Notifications from './modules/notifications/Notifications';
import Workspaces from './modules/hyprland/Workspaces';

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

      <Notifications />
    ];
  }
});
