import { App } from "astal/gtk3";
import style from "./style/main.scss";
import Hyprnotch from "./src/view/Hyprnotch";
import WorkspacesBar from "./src/view/bar/WorkspacesBar";
import { Workspaces } from "./src/view/Workspaces";
import { SystemTrayWindow } from "./src/view/bar/Bar";

App.start({
  css: style,
  main() {
    App.get_monitors().map((monitor) => {
      Workspaces(monitor);
      Hyprnotch(monitor);
      SystemTrayWindow(monitor);
    });
  },
});
