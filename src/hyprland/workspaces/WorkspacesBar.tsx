import Logger from "../../logger/Logger";
import { WorkspaceViewModel } from "./WorkspaceViewModel";
import Hyprland from "gi://AstalHyprland";
import { Gdk, Gtk } from "astal/gtk3";
import { IconSource } from "../../lib/icons/IconUtils";
import { bind } from "astal";

const getClientIconName = (client: Hyprland.Client): string => {
  const className = client.get_class().toLowerCase();
  const jetbrainsPrefix = "jetbrains-";
  if (className.startsWith(jetbrainsPrefix)) {
    return className.replace(jetbrainsPrefix, "");
  }
  return className;
};

interface WorkspacesBarProps {
  gdkmonitor: Gdk.Monitor;
}

type WorkspaceButtonProps = {
  workspace: Hyprland.Workspace;
  workspaceViewModel: WorkspaceViewModel;
  logger: Logger;
};

function WorkspaceButton({
  workspace,
  workspaceViewModel,
  logger,
}: WorkspaceButtonProps) {
  return (
    <button
      className={workspaceViewModel
        .getFocusedWorkspace()
        .as((focusedWorkspace: Hyprland.Workspace) => {
          let workspaceClass = "workspace_button";
          if (focusedWorkspace.get_id() === workspace.get_id()) {
            workspaceClass += " focused";
          }
          return workspaceClass;
        })}
      child={
        workspace.get_clients().length === 0 ? (
          <label label={workspace.get_name()} />
        ) : (
          <box
            children={bind(workspace, "clients").as((clients) =>
              clients.map((client) => <icon icon={getClientIconName(client)} />)
            )}
          />
        )
      }
      onClick={() => {
        logger.debug(
          `Pressing button for workspace ${workspace.get_id()}, switching to it`
        );
        workspaceViewModel.switchToWorkspace(workspace.get_id());
      }}
    />
  );
}

export default function WorkspacesBar(props: WorkspacesBarProps) {
  const workspaceViewModel: WorkspaceViewModel = new WorkspaceViewModel();
  const logger = new Logger("WorkspacesBar");
  const gdkmonitor: Gdk.Monitor = props.gdkmonitor;

  logger.debug(
    `WorkspacesBar created on monitor ${gdkmonitor.get_manufacturer()}`
  );

  const workspacesBinding = gdkmonitor.get_model()
    ? workspaceViewModel.getPerMonitorWorkspaces(gdkmonitor)
    : workspaceViewModel.getWorkspaces();

  return (
    <box
      halign={Gtk.Align.START}
      valign={Gtk.Align.START}
      className="workspaces_bar_container"
      child={
        <box
          className={"workspaces_bar"}
          child={workspacesBinding.as((workspaces: Hyprland.Workspace[]) => (
            <box
              children={workspaces.map((workspace: Hyprland.Workspace) => (
                <WorkspaceButton
                  workspace={workspace}
                  workspaceViewModel={workspaceViewModel}
                  logger={logger}
                />
              ))}
            />
          ))}
        />
      }
    />
  );
}
