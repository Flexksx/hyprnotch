import app from 'ags/gtk4/app';
import style from './stylev2/main.scss';
import { initializeSingletons } from './src/di/initializeSingletons';
import FlexShell from './widget/FlexShell';
import { createBinding, For } from 'ags';
import Bar from './widget/Bar';
import BarContainerBackground from './src/bar/BarContainerBackground';
import { Gtk } from 'ags/gtk4';

initializeSingletons();

app.start({
  css: style,
  instanceName: 'flexshell',
  main() {
    const monitors = createBinding(app, 'monitors');

    return (
      <For each={monitors} cleanup={win => (win as Gtk.Window).destroy()}>
        {monitor => {
          return <Bar gdkmonitor={monitor} />;
        }}
      </For>
    );
  }
});
