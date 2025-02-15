import { App } from "astal/gtk3";
import style from "./style/main.scss";
import Hyprnotch from "./view/Hyprnotch";

App.start({
  css: style,
  main() {
    App.get_monitors().map(Hyprnotch);
  },
});
