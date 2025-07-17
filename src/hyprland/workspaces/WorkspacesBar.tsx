import Logger from '../../logger/Logger';
import { HyprlandWorkspacesViewModel } from './HyprlandWorkspacesViewModel';
import Hyprland from 'gi://AstalHyprland';
import { Gdk, Gtk } from 'astal/gtk3';
import { bind } from 'astal';

const workspacesViewModel: HyprlandWorkspacesViewModel =
  new HyprlandWorkspacesViewModel();
const logger = new Logger('WorkspacesBar');

const getClientIconName = (client: Hyprland.Client): string => {
  const className = client.get_class().toLowerCase();
  const jetbrainsPrefix = 'jetbrains-';
  if (className.startsWith(jetbrainsPrefix)) {
    return className.replace(jetbrainsPrefix, '');
  }
  return className;
};

type WorkspacesBarProps = {
  gdkmonitor: Gdk.Monitor;
};

const WorkspaceButtonContent = (workspace: Hyprland.Workspace) => {
  return workspacesViewModel
    .getWorkspaceViewModelById(workspace.get_id())
    .getClients()
    .as((clients: Hyprland.Client[]) => (
      <box
        className="workspace_button_content"
        child={
          clients.length === 0 ? (
            <label
              halign={Gtk.Align.CENTER}
              valign={Gtk.Align.CENTER}
              label={workspace.get_name()}
            />
          ) : (
            <box
              className="workspace_button_icons_container"
              children={clients.map((client) => (
                <icon
                  icon={getClientIconName(client)}
                  className="workspace_button_icon"
                />
              ))}
            />
          )
        }
      />
    ));
};

const WorkspaceButton = (workspace: Hyprland.Workspace) => {
  return (
    <button
      className={workspacesViewModel
        .getFocusedWorkspace()
        .as(
          (focusedWorkspace: Hyprland.Workspace) =>
            'workspace_button' +
            (focusedWorkspace.get_id() === workspace.get_id()
              ? ' focused'
              : ''),
        )}
      child={WorkspaceButtonContent(workspace)}
      onClick={() => {
        logger.debug(
          `Pressing button for workspace ${workspace.get_id()}, switching to it`,
        );
        workspacesViewModel.switchToWorkspace(workspace.get_id());
      }}
    />
  );
};

export default function WorkspacesBar(props: WorkspacesBarProps) {
  const gdkmonitor: Gdk.Monitor = props.gdkmonitor;

  logger.debug(
    `WorkspacesBar created on monitor ${gdkmonitor.get_manufacturer()}`,
  );

  const workspacesBinding =
    workspacesViewModel.getPerMonitorWorkspaces(gdkmonitor);

  return (
    <box
      halign={Gtk.Align.START}
      valign={Gtk.Align.START}
      className="workspaces_bar_container"
      child={
        <box
          className={'workspaces_bar'}
          child={workspacesBinding.as((workspaces: Hyprland.Workspace[]) => (
            <box children={workspaces.map(WorkspaceButton)} />
          ))}
        />
      }
    />
  );
}
