import { createBinding, With } from 'ags';
import { Gdk, Gtk } from 'ags/gtk4';
import Hyprland from 'gi://AstalHyprland';
import HyprlandWorkspacesViewModel from '../../lib/hyprland/HyprlandWorkspacesViewModel';
import { getInstance } from '../../lib/di';

import app from 'ags/gtk4/app';
import { sortMonitorsHorizontally } from '../../lib/hyprland/utils/monitors';

const workspacesViewModel = getInstance(HyprlandWorkspacesViewModel);

const japaneseNumerals: Map<string, string> = new Map([
  ['1', '一'],
  ['2', '二'],
  ['3', '三'],
  ['4', '四'],
  ['5', '五'],
  ['6', '六'],
  ['7', '七'],
  ['8', '八'],
  ['9', '九'],
  ['10', '十']
]);

const WorkspaceButton = ({ workspace }: { workspace: Hyprland.Workspace }) => {
  const focusedWorkspace = workspacesViewModel.getFocusedWorkspace();
  const baseClassName = 'workspace-button';
  return (
    <button
      class={focusedWorkspace.as((focused: Hyprland.Workspace) =>
        focused && focused.get_id() === workspace.get_id()
          ? `${baseClassName} focused`
          : baseClassName
      )}
      label={
        japaneseNumerals.get(workspace.get_id().toString()) ||
        workspace.get_id().toString()
      }
      onClicked={() => {
        workspacesViewModel.switchToWorkspace(workspace.get_id());
      }}
    />
  );
};

export default function Workspaces({ monitor }: { monitor: Gdk.Monitor }) {
  const workspaces = workspacesViewModel.getWorkspacesOnMonitor(monitor);
  return (
    <box class="workspace-button-list-container">
      <With value={workspaces}>
        {workspaces => (
          <box
            class={
              'workspace-button-list' +
              (workspaces.length === 1 ? ' single' : '')
            }
            halign={Gtk.Align.CENTER}
            valign={Gtk.Align.CENTER}
            spacing={4}
          >
            {workspaces.map((workspace: Hyprland.Workspace) => (
              <WorkspaceButton workspace={workspace} />
            ))}
          </box>
        )}
      </With>
    </box>
  );
}
