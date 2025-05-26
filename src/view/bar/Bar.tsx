import { Astal, App, Gdk } from "astal/gtk3";
import Logger from "../../logger/Logger";
import WorkspacesBar from "../workspaces/WorkspacesBar";
import FocusedClient from "../focused_client/FocusedClient";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const logger = new Logger("Bar");
  logger.debug("Bar created");
  return (
    <window
      className="bar"
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
          children={[
            <WorkspacesBar gdkmonitor={gdkmonitor} />,
            <FocusedClient />,
          ]}
        ></box>
      }
    ></window>
  );
}
