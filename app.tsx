import app from 'ags/gtk4/app';
import style from './styles/main.scss';
import { initializeSingletons } from './src/di/initializeSingletons';
import { createBinding, For } from 'ags';
import Bar from './widget/Bar';
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
