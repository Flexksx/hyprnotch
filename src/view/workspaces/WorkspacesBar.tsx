import Logger from "../../logger/Logger";
import { WorkspaceViewModel } from "../../hyprland/WorkspaceViewModel";
import Hyprland from "gi://AstalHyprland";
import { Gdk } from "astal/gtk3";

interface WorkspacesBarProps {
  gdkmonitor: Gdk.Monitor;
}

export default function WorkspacesBar(props: WorkspacesBarProps) {
  const workspaceViewModel: WorkspaceViewModel = new WorkspaceViewModel();
  const logger = new Logger("WorkspacesBar");
  const gdkmonitor: Gdk.Monitor = props.gdkmonitor;
  logger.debug(
    `WorkspacesBar created on monitor ${gdkmonitor.get_manufacturer()}`
  );
  const workspacesBinding = gdkmonitor.get_model()
    ? workspaceViewModel.getPerMonitorWorkspaces(gdkmonitor.get_model() || "")
    : workspaceViewModel.getWorkspaces();
  return (
    <box
      className={"workspaces_bar"}
      children={workspacesBinding.as((workspaces: Hyprland.Workspace[]) => {
        logger.debug(
          "WorkspacesBar updated with new workspaces. Current workspaces: ",
          workspaces
            .map((workspace: Hyprland.Workspace) => {
              return workspace.get_name();
            })
            .toString()
        );
        return workspaces.map((workspace: Hyprland.Workspace) => {
          return (
            <button
              className={workspaceViewModel
                .getFocusedWorkspace()
                .as((focusedWorkspace: Hyprland.Workspace) => {
                  return (
                    "workspace_button " +
                    (focusedWorkspace.get_id() === workspace.get_id()
                      ? "focused"
                      : "")
                  );
                })}
              child={<label>{workspace.get_name()}</label>}
              onClick={() => {
                logger.debug(
                  `Pressing button for workspace ${workspace.get_id()}, switching to it`
                );
                workspaceViewModel.switchToWorkspace(workspace.get_id());
              }}
            ></button>
          );
        });
      })}
    ></box>
  );
}
