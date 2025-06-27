import { App, Astal, Gdk } from "astal/gtk3";
import Logger from "../../logger/Logger";

export default function BarContainerBackground(gdkmonitor: Gdk.Monitor) {
  const logger = new Logger("BarContainerBackground");
  logger.debug("BarContainerBackground window created");

  return (
    <window
      className="hyprnotch_bar_container_background"
      namespace="hyprnotch_bar_container_background"
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      application={App}
      child={<box className="hyprnotch_bar_container_background" />}
    />
  );
}
