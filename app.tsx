import { App } from 'astal/gtk3';
import style from './style/main.scss';
import Hyprland from 'gi://AstalHyprland';
import Hyprnotch from './src/notch/Hyprnotch';
import Bar from './src/bar/Bar';
import BarContainerBackground from './src/bar/BarContainerBackground';

App.start({
  css: style,
  main() {
    App.get_monitors().map(monitor => {
      BarContainerBackground(monitor);
      Bar(monitor);
      Hyprnotch({ gdkmonitor: monitor });
    });
  }
});
