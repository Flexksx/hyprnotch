import app from 'ags/gtk4/app';
import style from './style/main.scss';
import Bar from './widget/Bar';
import BarContainerBackground from './src/bar/BarContainerBackground';

app.start({
  css: style,
  main() {
    app.get_monitors().map(monitor => {
      Bar(monitor);
      BarContainerBackground({ monitor });
    });
  }
});
