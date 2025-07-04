import { App } from "astal/gtk3";
import style from "./style/main.scss";
import Hyprnotch from "./src/view/Hyprnotch";
import Bar from "./src/view/bar/Bar";
import BarContainerBackground from "./src/view/bar/BarContainerBackground";

App.start({
  css: style,
  main() {
    App.get_monitors().map((monitor) => {
      // SystemDetails(monitor);
      BarContainerBackground(monitor);
      Bar(monitor);
      // Workspaces(monitor);
      // NotificationsWindow(monitor);
      Hyprnotch(monitor);
    });
  },
});
