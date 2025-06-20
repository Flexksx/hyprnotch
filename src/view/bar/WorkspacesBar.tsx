import Logger from "../../logger/Logger";
import { WorkspaceViewModel } from "../../hyprland/WorkspaceViewModel";
import Hyprland from "gi://AstalHyprland";
import { Gdk, Gtk } from "astal/gtk3";
import FocusedClientViewModel from "../../hyprland/FocusedClientViewModel";
import { IconSource } from "../../lib/icons/IconUtils";
import { bind } from "astal";

interface WorkspacesBarProps {
  gdkmonitor: Gdk.Monitor;
}

const BASE_WORKSPACE_BUTTON_WIDTH: number = 16;

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
          children={workspacesBinding.as((workspaces: Hyprland.Workspace[]) =>
            workspaces.map((workspace: Hyprland.Workspace) => (
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
                  workspace.get_clients().length === 0 ? (
                    <box
                      valign={Gtk.Align.CENTER}
                      halign={Gtk.Align.CENTER}
                      child={<label label={workspace.get_name()} />}
                    />
                  ) : (
                    <box
                      valign={Gtk.Align.CENTER}
                      halign={Gtk.Align.CENTER}
                      children={bind(workspace, "clients").as((clients) =>
                        clients.map((client) => {
                          return (
                            <box
                              className="workspace_client_icon"
                              child={
                                <IconSource iconName={client.get_class()} />
                              }
                            />
                          );
                        })
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
            ))
          )}
        />
      }
    />
  );
}
