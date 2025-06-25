import { App } from "astal/gtk3";
import style from "./style/main.scss";
import Hyprnotch from "./src/view/Hyprnotch";
import WorkspacesBar from "./src/view/bar/WorkspacesBar";
import { Workspaces } from "./src/view/Workspaces";
import SystemTrayWindow from "./src/view/bar/Bar";
import SystemDetails from "./src/view/bar/SystemDetails";
import SoundSettingsNotch from "./src/view/notch/sound_settings/SoundSettingsNotch";

App.start({
  css: style,
  main() {
    App.get_monitors().map((monitor) => {
      // Workspaces(monitor);
      // SystemDetails(monitor);
      SystemTrayWindow(monitor);
      Hyprnotch(monitor);
    });
  },
});
