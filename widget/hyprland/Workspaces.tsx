import { createBinding, For, With } from 'ags';
import { Gdk, Gtk } from 'ags/gtk4';
import Hyprland from 'gi://AstalHyprland';
import HyprlandWorkspacesViewModel from '../../lib/hyprland/HyprlandWorkspacesViewModel';
import { getInstance } from '../../lib/di';

const workspacesViewModel = getInstance(HyprlandWorkspacesViewModel);

const buttonDefaultWidth = 10;
const focusedButtonWidth = 25;
const buttonHorizontalMargin = 4;

const WorkspaceButton = ({ workspace }: { workspace: Hyprland.Workspace }) => {
  const focusedWorkspace = workspacesViewModel.getFocusedWorkspace();
  let baseClassName = 'workspace-button';
  return (
    <button
      class={focusedWorkspace.as((focused: Hyprland.Workspace) =>
        focused && focused.get_id() === workspace.get_id()
          ? `${baseClassName} focused`
          : baseClassName
      )}
      label={workspace.get_name()}
      onClicked={() => {
        workspacesViewModel.switchToWorkspace(workspace.get_id());
      }}
    />
  );
};

export default function Workspaces({ monitor }: { monitor: Gdk.Monitor }) {
  const workspaces = workspacesViewModel.getPerMonitorWorkspaces(monitor);
  return (
    <box class="workspace-button-list">
      <With value={workspaces}>
        {(workspaces: Hyprland.Workspace[]) => (
          <box>
            {workspaces.map((workspace: Hyprland.Workspace) => (
              <WorkspaceButton workspace={workspace} />
            ))}
          </box>
        )}
      </With>
    </box>
  );
}
