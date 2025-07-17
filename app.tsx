import { App } from 'astal/gtk3';
import Hyprnotch from './src/view/Hyprnotch';
import Bar from './src/view/bar/Bar';
import BarContainerPadding from './src/view/bar/BarContainerBackground';
import style from './style/main.scss';
import Hyprland from 'gi://AstalHyprland';

const hyprland = Hyprland.get_default();

App.start({
  css: style,
  main() {
    App.get_monitors().map((monitor) => {
      BarContainerPadding(monitor);
      Bar(monitor);
      Hyprnotch({ gdkmonitor: monitor });
    });
  },
});
