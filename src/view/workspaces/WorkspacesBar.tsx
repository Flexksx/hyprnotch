import Logger from "../../logger/Logger";
import { WorkspaceViewModel } from "../../hyprland/workspaces/viewmodel/WorkspaceViewModel";
import Hyprland from "gi://AstalHyprland";

export default function WorkspacesBar() {
  const workspaceViewModel: WorkspaceViewModel = new WorkspaceViewModel();
  const logger = new Logger("WorkspacesBar");
  return (
    <box
      className={"workspaces_bar"}
      children={workspaceViewModel
        .getWorkspaces()
        .as((workspaces: Hyprland.Workspace[]) => {
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
