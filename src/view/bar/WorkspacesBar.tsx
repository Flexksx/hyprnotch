import Logger from "../../logger/Logger";
import { WorkspaceViewModel } from "../../hyprland/WorkspaceViewModel";
import Hyprland from "gi://AstalHyprland";
import { Gdk } from "astal/gtk3";

interface WorkspacesBarProps {
  gdkmonitor: Gdk.Monitor;
}

function toRomanNumeral(num: number): string {
  const romanNumerals = [
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let result = "";
  for (const { value, symbol } of romanNumerals) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result || "I";
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
      className="workspaces_bar_container"
      child={
        <box
          className={"workspaces_bar"}
          children={workspacesBinding.as((workspaces: Hyprland.Workspace[]) => {
            logger.debug(
              "WorkspacesBar updated with new workspaces. Current workspaces: ",
              workspaces
                .sort((a: Hyprland.Workspace, b: Hyprland.Workspace) => {
                  return a.get_id() - b.get_id();
                })
                .map((workspace: Hyprland.Workspace) => workspace.get_name())
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
                  child={
                    <label
                      label={toRomanNumeral(
                        parseInt(workspace.get_name()) || workspace.get_id()
                      )}
                    />
                  }
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
        />
      }
    />
  );
}
