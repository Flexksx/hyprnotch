import { App, Astal, Gdk } from "astal/gtk3";
import Logger from "../logger/Logger";
import WorkspacesBar from "./bar/WorkspacesBar";

export function Workspaces(gdkmonitor: Gdk.Monitor) {
  const logger = new Logger("Bar");
  logger.debug("Workspaces window created");

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
      exclusivity={Astal.Exclusivity.IGNORE}
      application={App}
      child={
        <box
          className={"hyprnotch_bar_container"}
          child={<WorkspacesBar gdkmonitor={gdkmonitor} />}
        />
      }
    />
  );
}
