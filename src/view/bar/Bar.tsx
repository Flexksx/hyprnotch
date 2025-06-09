import { Astal, App, Gdk } from "astal/gtk3";
import Logger from "../../logger/Logger";
import WorkspacesBar from "./WorkspacesBar";
import FocusedClient from "./FocusedClient";
import { SystemTray } from "./SystemTray";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const logger = new Logger("Bar");
  logger.debug("Bar created");
  return (
    <window
      className="hyprnotch_bar"
      namespace="hyprnotch_bar"
      gdkmonitor={gdkmonitor}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      application={App}
      child={
        <box
          className={"bar_container"}
          children={[
            <WorkspacesBar gdkmonitor={gdkmonitor} />,
            // <FocusedClient />,
            <SystemTray />,
          ]}
        ></box>
      }
    ></window>
  );
}
