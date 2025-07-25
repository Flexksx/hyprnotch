import { Gdk, Gtk } from 'ags/gtk4';
import { createBinding, For } from 'ags';
import Logger from '../../logger/Logger';
import { HyprlandWorkspacesViewModel } from './HyprlandWorkspacesViewModel';
import Hyprland from 'gi://AstalHyprland';

const workspacesViewModel: HyprlandWorkspacesViewModel =
  HyprlandWorkspacesViewModel.getInstance();
const logger = new Logger('WorkspacesBar');

const clientIconSize = 24;

const getButtonWidth = (workspace: Hyprland.Workspace) => {
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

const getWorkspacesBarWidth = (monitor: Gdk.Monitor) => {
  return workspacesViewModel.getPerMonitorWorkspaces(monitor).as(workspaces => {
    const focusedWorkspace = workspacesViewModel.getFocusedWorkspace();
    const width = workspaces.reduce((acc, workspace) => {
      return (
        acc +
        (getButtonWidth(workspace).get() + 9) +
        (workspace.get_id() === focusedWorkspace.get().get_id() ? 20 : 0)
      );
    }, 0);
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

const WorkspaceButtonContent = (workspace: Hyprland.Workspace) => {
  return workspacesViewModel
    .getWorkspaceViewModelById(workspace.get_id())
    .getClients()
    .as((clients: Hyprland.Client[]) => (
      <box
        cssName="workspace_button_content"
        children={
          clients.length === 0 ? (
            <box />
          ) : (
            <box
              halign={Gtk.Align.CENTER}
              valign={Gtk.Align.CENTER}
              cssName="workspace_button_icons_container"
              children={clients.map(client => (
                <image
                  iconName={getClientIconName(client)}
                  cssName="workspace_button_icon"
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
      cssName={workspacesViewModel
        .getFocusedWorkspace()
        .as(
          (focusedWorkspace: Hyprland.Workspace) =>
            'workspace_button' +
            (focusedWorkspace.get_id() === workspace.get_id() ? ' focused' : '')
        )}
      children={
        <For each={createBinding(workspace, 'clients')}>
          {client => (
            <image
              iconName={getClientIconName(client)}
              cssName="workspace_button_icon"
            />
          )}
        </For>
      }
      onClicked={() => {
        logger.debug(
          `Pressing button for workspace ${workspace.get_id()}, switching to it`
        );
        workspacesViewModel.switchToWorkspace(workspace.get_id());
      }}
    />
  );
};
type WorkspacesBarProps = {
  monitor: Gdk.Monitor;
};
export default function WorkspacesBar({ monitor }: WorkspacesBarProps) {
  logger.debug(`WorkspacesBar created on monitor ${monitor}`);
  return (
    <box
      halign={Gtk.Align.START}
      valign={Gtk.Align.START}
      cssName="workspaces_bar_container"
      css={getWorkspacesBarWidth(monitor).as(
        (width: number) => `min-width: ${width}px;`
      )}
    >
      <For each={workspacesViewModel.getPerMonitorWorkspaces(monitor)}>
        {workspace => (
          <box
            cssName="workspace_button_container"
            children={[WorkspaceButton(workspace)]}
          />
        )}
      </For>
    </box>
  );
}
