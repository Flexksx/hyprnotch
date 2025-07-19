import Logger from '../../logger/Logger';
import { HyprlandWorkspacesViewModel } from './HyprlandWorkspacesViewModel';
import Hyprland from 'gi://AstalHyprland';
import { Gdk, Gtk } from 'astal/gtk3';
import { bind, Binding } from 'astal';

const workspacesViewModel: HyprlandWorkspacesViewModel =
  HyprlandWorkspacesViewModel.getInstance();
const logger = new Logger('WorkspacesBar');

const clientIconSize = 24;

const getButtonWidth = (workspace: Hyprland.Workspace): Binding<number> => {
  return workspacesViewModel
    .getWorkspaceViewModelById(workspace.get_id())
    .getClients()
    .as(clients => {
      const clientCount = clients.length;
      const baseWidth =
        clientCount === 0 ? clientIconSize : clientCount * clientIconSize + 8;
      return baseWidth;
    });
};

const getWorkspacesBarWidth = (gdkmonitor: Gdk.Monitor): Binding<number> => {
  return workspacesViewModel
    .getPerMonitorWorkspaces(gdkmonitor)
    .as(workspaces => {
      const focusedWorkspace = workspacesViewModel.getFocusedWorkspace();
      const width = workspaces.reduce((acc, workspace) => {
        return (
          acc +
          (getButtonWidth(workspace).get() + 9) +
          (workspace.get_id() === focusedWorkspace.get().get_id() ? 20 : 0)
        );
      }, 0);
      logger.debug(
        `Calculated workspaces bar width for monitor ${gdkmonitor.get_manufacturer()}: ${width}px`
      );
      return width;
    });
};

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
            <box />
          ) : (
            <box
              halign={Gtk.Align.CENTER}
              valign={Gtk.Align.CENTER}
              className="workspace_button_icons_container"
              children={clients.map(client => (
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
      widthRequest={getButtonWidth(workspace)}
      className={workspacesViewModel
        .getFocusedWorkspace()
        .as(
          (focusedWorkspace: Hyprland.Workspace) =>
            'workspace_button' +
            (focusedWorkspace.get_id() === workspace.get_id() ? ' focused' : '')
        )}
      child={WorkspaceButtonContent(workspace)}
      onClick={() => {
        logger.debug(
          `Pressing button for workspace ${workspace.get_id()}, switching to it`
        );
        workspacesViewModel.switchToWorkspace(workspace.get_id());
      }}
    />
  );
};

export default function WorkspacesBar(props: WorkspacesBarProps) {
  const gdkmonitor: Gdk.Monitor = props.gdkmonitor;

  logger.debug(
    `WorkspacesBar created on monitor ${gdkmonitor.get_manufacturer()}`
  );

  return (
    <box
      halign={Gtk.Align.START}
      valign={Gtk.Align.START}
      className="workspaces_bar_container"
      css={getWorkspacesBarWidth(gdkmonitor).as(
        (width: number) => `min-width: ${width}px;`
      )}
      child={workspacesViewModel
        .getPerMonitorWorkspaces(gdkmonitor)
        .as((workspaces: Hyprland.Workspace[]) => (
          <box children={workspaces.map(WorkspaceButton)} />
        ))}
    />
  );
}
